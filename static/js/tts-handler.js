class TTSHandler {
    constructor() {
        this.config = null;
        this.audio = null;
        this.isPlaying = false;
        this.configPromise = null;
        this.cache = new Map();
    }

    getConfig() {
        if (this.config) return Promise.resolve(this.config);
        if (this.configPromise) return this.configPromise;

        this.configPromise = fetch('/api/ai-models/get-user-tts-config/')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load TTS configuration');
                return response.json();
            })
            .then(data => {
                this.config = data;
                return data;
            })
            .catch(error => {
                this.configPromise = null;
                throw error;
            });

        return this.configPromise;
    }

    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio = null;
        }
        this.isPlaying = false;
    }

    _getCacheKey(text, config) {
        const provider = config.provider ? config.provider.toLowerCase() : '';
        const voice = config.voice_name || '';
        const model = config.model || '';
        const lang = config.language_code || '';
        return `${provider}:${voice}:${model}:${lang}:${text.trim()}`;
    }

    async speak(text, callbacks = {}) {
        const { onStart, onEnd, onError } = callbacks;

        try {
            this.stop();

            const config = await this.getConfig();
            const provider = config.provider ? config.provider.toLowerCase() : '';
            const cacheKey = this._getCacheKey(text, config);

            if (this.cache.has(cacheKey)) {
                if (onStart) onStart();
                this.isPlaying = true;
                this._playFromCache(this.cache.get(cacheKey), onStart, onEnd, onError);
                return;
            }

            if (onStart) onStart();
            this.isPlaying = true;

            if (provider === 'google') {
                await this._speakGoogle(text, config, cacheKey, onEnd, onError);
            } else if (provider === 'elevenlabs') {
                await this._speakElevenLabs(text, config, cacheKey, onEnd, onError);
            } else {
                throw new Error('Unsupported TTS provider. Please configure your settings.');
            }

        } catch (error) {
            this.isPlaying = false;
            if (onError) onError(error.message || 'TTS Error');
            if (onEnd) onEnd();
        }
    }

    _playFromCache(cachedData, onStart, onEnd, onError) {
        let audioUrl;

        if (cachedData.type === 'blob') {
            audioUrl = URL.createObjectURL(cachedData.data);
        } else {
            audioUrl = `data:audio/mp3;base64,${cachedData.data}`;
        }

        this.audio = new Audio(audioUrl);

        this.audio.onended = () => {
            this.isPlaying = false;
            if (cachedData.type === 'blob') URL.revokeObjectURL(audioUrl);
            if (onEnd) onEnd();
        };

        this.audio.onerror = () => {
            this.isPlaying = false;
            if (cachedData.type === 'blob') URL.revokeObjectURL(audioUrl);
            if (onError) onError('Audio playback error');
            if (onEnd) onEnd();
        };

        this.audio.play().catch(() => {
            if (onError) onError('Audio playback blocked');
            if (onEnd) onEnd();
        });
    }

    async _speakGoogle(text, config, cacheKey, onEnd, onError) {
        const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${config.api_key}`;

        const payload = {
            input: { text: text },
            voice: {
                languageCode: config.language_code || 'en-US',
                name: config.voice_name || 'en-US-Journey-F'
            },
            audioConfig: { audioEncoding: 'MP3' }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMessage = errorData.error?.message || 'Google TTS request failed';

            if (errorMessage.includes('API key not valid')) {
                errorMessage = 'Invalid Google API Key. Please check your settings.';
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();
        if (!data.audioContent) {
            throw new Error('No audio content received');
        }

        this.cache.set(cacheKey, { type: 'base64', data: data.audioContent });

        this._playBase64(data.audioContent, onEnd, onError);
    }

    async _speakElevenLabs(text, config, cacheKey, onEnd, onError) {
        const voiceId = config.voice_name || '21m00Tcm4TlvDq8ikWAM';
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;

        const payload = {
            text: text,
            model_id: config.model || 'eleven_monolingual_v1',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'xi-api-key': config.api_key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMessage = errorData.detail?.message || 'ElevenLabs TTS request failed';

            if (response.status === 429) {
                errorMessage = 'ElevenLabs quota exceeded. Please check your account.';
            } else if (response.status === 401) {
                errorMessage = 'Invalid ElevenLabs API Key. Please check your settings.';
            }

            throw new Error(errorMessage);
        }

        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) chunks.push(value);
        }

        if (chunks.length === 0) {
            throw new Error('No audio data received');
        }

        const blob = new Blob(chunks, { type: 'audio/mpeg' });

        this.cache.set(cacheKey, { type: 'blob', data: blob });

        const audioUrl = URL.createObjectURL(blob);

        this.audio = new Audio(audioUrl);

        this.audio.onended = () => {
            this.isPlaying = false;
            URL.revokeObjectURL(audioUrl);
            if (onEnd) onEnd();
        };

        this.audio.onerror = () => {
            this.isPlaying = false;
            URL.revokeObjectURL(audioUrl);
            if (onError) onError('Audio playback error');
            if (onEnd) onEnd();
        };

        await this.audio.play();
    }

    _playBase64(base64String, onEnd, onError) {
        const audioUrl = `data:audio/mp3;base64,${base64String}`;
        this.audio = new Audio(audioUrl);

        this.audio.onended = () => {
            this.isPlaying = false;
            if (onEnd) onEnd();
        };

        this.audio.onerror = () => {
            this.isPlaying = false;
            if (onError) onError('Audio playback failed');
            if (onEnd) onEnd();
        };

        this.audio.play().catch(() => {
            if (onError) onError('Audio playback blocked by browser');
            if (onEnd) onEnd();
        });
    }
}

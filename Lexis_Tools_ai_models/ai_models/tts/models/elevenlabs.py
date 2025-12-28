import os
import time
import logging
from typing import Optional, Generator, Union
from elevenlabs import ElevenLabs

from ..base import BaseTTS, TTSInitializationError, TTSGenerationError

logger = logging.getLogger(__name__)


class ElevenLabsTTS(BaseTTS):

    VALID_FORMATS = {
        "mp3_44100_128",
        "mp3_44100_64",
        "pcm_16000",
        "wav",
    }

    def __init__(
        self,
        api_key: Optional[str] = None,
        base_url: str = "https://api.elevenlabs.io",
        max_retries: int = 3,
        retry_delay: float = 0.8,
    ):
        self.api_key = api_key or os.getenv("ELEVENLABS_TTS_KEY")
        if not self.api_key:
            raise TTSInitializationError("Missing ElevenLabs API key.")

        try:
            self.client = ElevenLabs(api_key=self.api_key, base_url=base_url)
        except Exception as e:
            raise TTSInitializationError(f"ElevenLabs init failed: {e}")

        self.max_retries = max_retries
        self.retry_delay = retry_delay

    def text_to_speech(
        self,
        text: str,
        voice_id: str = "JBFqnCBsd6RMkjVDRZzb",
        model_id: str = "eleven_multilingual_v2",
        output_format: str = "mp3_44100_128",
        stream: bool = False
    ) -> Union[bytes, Generator[bytes, None, None]]:

        if not text.strip():
            raise ValueError("Text cannot be empty.")

        if output_format not in self.VALID_FORMATS:
            raise ValueError(f"Invalid format: {output_format}")

        return (
            self._stream_tts(text, voice_id, model_id, output_format)
            if stream else
            self._generate_tts(text, voice_id, model_id, output_format)
        )

    def _generate_tts(self, text, voice, model, fmt):
        for attempt in range(self.max_retries):
            try:
                audio_generator = self.client.text_to_speech.convert(
                    voice_id=voice,
                    model_id=model,
                    text=text,
                    output_format=fmt,
                )
                return b''.join(audio_generator)
            except Exception as e:
                logger.error(f"ElevenLabs error (attempt {attempt+1}): {e}")
                if attempt == self.max_retries - 1:
                    raise TTSGenerationError(f"ElevenLabs failed: {e}")
                time.sleep(self.retry_delay)

    def _stream_tts(self, text, voice, model, fmt):
        for attempt in range(self.max_retries):
            try:
                stream = self.client.text_to_speech.stream(
                    voice_id=voice,
                    model_id=model,
                    text=text,
                    output_format=fmt,
                )
                for chunk in stream:
                    yield chunk
                return

            except Exception as e:
                logger.error(f"ElevenLabs stream error (attempt {attempt+1}): {e}")
                if attempt == self.max_retries - 1:
                    raise TTSGenerationError(f"ElevenLabs stream failed: {e}")
                time.sleep(self.retry_delay)

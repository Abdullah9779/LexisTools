from .models.elevenlabs import ElevenLabsTTS
from .models.google import GoogleTTS
from .base import TTSInitializationError, TTSGenerationError


from typing import Optional, Generator, Union

def get_tts_object(
    provider: str = "ELEVENLABS",
    api_key: Optional[str] = None,
):
    """
    Returns a configured TTS client instance based on the provider.
    """

    if not api_key:
        raise ValueError("API key is required for all providers.")

    provider = provider.upper().strip()

    if provider == "GOOGLE":
        return GoogleTTS(
            api_key=api_key,
        )

    elif provider == "ELEVENLABS":
        return ElevenLabsTTS(
            api_key=api_key,
        )

    raise ValueError(f"Unsupported provider: '{provider}'. Supported providers: GOOGLE, ELEVENLABS.")



class TTSEngine:
    def __init__(
        self,
        provider: str = "ELEVENLABS",
        api_key: Optional[str] = None,
    ):
        self.provider = provider.upper().strip()
        self.tts_client = get_tts_object(self.provider, api_key)
        
    def text_to_speech(
        self,
        text: str,
        model: str,
        voice: str,
        output_format: str = "mp3_44100_128",
        stream: bool = True,
    ) -> Union[bytes, Generator[bytes, None, None]]:
        """
        Generates text-to-speech audio from the given text.
        """
        if not text:
            raise ValueError("Text input is required for TTS.")
        
        if self.provider == "GOOGLE":
            return self._google_tts(
                text=text,
                model=model,
                voice=voice,
            )
        
        elif self.provider == "ELEVENLABS":
            return self._elevenlabs_tts(
                text=text,
                model=model,
                voice=voice,
                output_format=output_format,
                stream=stream
            )
            
        else:
            return "Invalid provider."
    
    def _google_tts(
        self,
        text: str,
        model: str,
        voice: str,
    )-> bytes:
        
        try:
            return self.tts_client.text_to_speech(
                text=text,
                model=model,
                voice_name=voice,
            )
        except TTSInitializationError as e:
            return e
        
        except ValueError as e:
            return e
        
        except TTSGenerationError as e:
            if "API_KEY_INVALID" in str(e) or "API key not valid. Please pass a valid API key" in str(e):
                return "Invalid API key."
            return e
        
        except Exception as e:
            return "Fail to generate text to speech audio."
    
    def _elevenlabs_tts(
        self,
        text: str,
        model: str,
        voice: str,
        output_format: str,
        stream: bool = False
    ) -> Union[bytes, Generator[bytes, None, None]]:
        try:
            return self.tts_client.text_to_speech(
                text=text,
                voice_id=voice,
                model_id=model,
                output_format=output_format,
                stream=stream
            )
        except TTSInitializationError as e:
            return e
        
        except ValueError as e:
            return e
        
        except TTSGenerationError as e:
            if "invalid_api_key" in str(e) or "Invalid API key" in str(e):
                return "Invalid API key."
            return e
        
        except Exception as e:
            return "Fail to generate text to speech audio."
        

# 68a231ea036424c279047b964ebf90cf0346e0aeb0a4e1a8a558a523a7518c19


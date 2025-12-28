import os
import time
import logging
from typing import Optional

from google import genai
from google.genai import types

from ..base import BaseTTS, TTSInitializationError, TTSGenerationError


logger = logging.getLogger(__name__)


class GoogleTTS(BaseTTS):
    def __init__(
        self,
        api_key: Optional[str] = None,
        max_retries: int = 3,
        retry_delay: float = 0.8
    ):
        self.api_key = api_key or os.getenv("GOOGLE_TTS_KEY")
        if not self.api_key:
            raise TTSInitializationError("Missing Google TTS API key.")

        self.max_retries = max_retries
        self.retry_delay = retry_delay

        try:
            self.client = genai.Client(api_key=self.api_key)
        except Exception as e:
            raise TTSInitializationError(f"Google TTS init failed: {e}")

    def text_to_speech(
        self,
        text: str,
        model: str = "gemini-2.5-flash-preview-tts",
        voice_name: str = "Kore"
    ) -> bytes:

        if not text or not text.strip():
            raise ValueError("Text cannot be empty.")

        for attempt in range(self.max_retries):
            try:
                response = self.client.models.generate_content(
                    model=model,
                    contents=text,
                    config=types.GenerateContentConfig(
                        response_modalities=["AUDIO"],
                        speech_config=types.SpeechConfig(
                            voice_config=types.VoiceConfig(
                                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                    voice_name=voice_name
                                )
                            )
                        ),
                    ),
                )

                return response.candidates[0].content.parts[0].inline_data.data

            except Exception as e:
                logger.error(f"Google TTS error (attempt {attempt+1}): {e}")
                if attempt == self.max_retries - 1:
                    raise TTSGenerationError(f"Google TTS failed after retries: {e}")
                time.sleep(self.retry_delay)

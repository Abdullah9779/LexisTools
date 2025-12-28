from abc import ABC, abstractmethod


class TTSInitializationError(Exception):
    pass


class TTSGenerationError(Exception):
    pass

class BaseTTS(ABC):
    @abstractmethod
    def text_to_speech(self, text: str, **kwargs) -> bytes:
        pass

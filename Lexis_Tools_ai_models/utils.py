from concurrent.futures import ThreadPoolExecutor, TimeoutError

from .ai_models.tts import TTSEngine
from .ai_models.llm import get_llm_object

def is_llm_api_key_valid(
    provider: str,
    model: str,
    api_key: str,
    timeout: int = 10
) -> bool:
    """
    Validates an LLM API key by sending a small test prompt.
    Returns True if the key works, False otherwise.
    """

    if not provider or not model or not api_key:
        return False

    def invoke_llm():
        llm = get_llm_object(provider, model, api_key)
        return llm.invoke("Hello")

    with ThreadPoolExecutor(max_workers=1) as executor:
        future = executor.submit(invoke_llm)
        try:
            future.result(timeout=timeout)
            return True
        except TimeoutError:
            return False
        except Exception:
            return False


def is_tts_api_key_valid(
    provider: str,
    model: str,
    voice_name: str,    
    api_key: str,
    timeout: int = 10
)-> bool:
    """
    Validates a TTS API key by sending a small test request.
    Returns True if the key works, False otherwise.


    Args:
        provider (str): Provider name
        model (str):    Model name
        voice_name (str): Voice name
        api_key (str): API key
        timeout (int, optional): Timeout in seconds. Defaults to 10.

    Returns:
        bool: True if the key is valid, False otherwise.
    """
    if not provider or not model or not api_key or not voice_name:
        return False
    
    def invoke_tts():
        tts = TTSEngine(api_key=api_key, provider=provider)
        resp = tts.text_to_speech("Hello", model, voice_name, stream=False)
        if resp == "Invalid API key.":
            raise Exception("Invalid API key.")
        return resp
    
    with ThreadPoolExecutor(max_workers=1) as executor:
        future = executor.submit(invoke_tts)
        try:
            future.result(timeout=timeout)
            return True
        
        except TimeoutError:
            return False
        
        except Exception:
            return False
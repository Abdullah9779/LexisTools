from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

from typing import Optional

from .base import LLMProviderError


def get_llm_object(
    provider: str = "GOOGLE",
    model: str = "gemini-2.5-flash",
    api_key: Optional[str] = None,
    streaming: bool = True,
):
    """
    Returns a configured LLM client instance based on the provider.
    """

    if not api_key:
        raise ValueError("API key is required for all providers.")

    provider = provider.upper().strip()

    if provider == "GOOGLE":
        return ChatGoogleGenerativeAI(
            model=model,
            api_key=api_key,
            streaming=streaming,
        )

    elif provider == "GROQ":
        return ChatGroq(
            model=model,
            api_key=api_key,
            streaming=streaming,
        )

    elif provider == "OPENAI":
        return ChatOpenAI(
            model=model,
            api_key=api_key,
            streaming=streaming,
        )

    raise LLMProviderError(
        f"Unsupported provider: '{provider}'. Supported providers: GOOGLE, GROQ, OPENAI."
    )

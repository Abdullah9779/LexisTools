from typing import Optional
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from .. import get_llm_object


class TranslationResult(BaseModel):
    translated_text: str


class LLMTranslation:
    """
    Production-ready LLM translation utility.
    Translates long, instruction-heavy text, including user instructions inside the text.
    Returns only the translated text using structured output.
    """

    def __init__(
        self,
        provider: str = "gemini",
        model: str = "gemini-2.5-flash",
        api_key: Optional[str] = None,
    ):
        if not api_key or not api_key.strip():
            raise ValueError("API key is required.")

        # Initialize LLM
        self.llm = get_llm_object(
            provider=provider,
            model=model,
            api_key=api_key,
            streaming=False
        )

        # Pydantic parser
        self.parser = PydanticOutputParser(pydantic_object=TranslationResult)

        # System prompt: strict, translates everything including instructions
        SYSTEM_PROMPT = """
You are a high-accuracy translation engine.
Translate the user's text into {target_language}.
Output ONLY a JSON object with one key: {{ "translated_text" }}.
The value must contain the fully translated text in the target language.
Do not omit, skip, or summarize any part.
Preserve meaning, tone, formatting, spacing, numbers, URLs, emojis, and brand names exactly.
No explanations, reasoning, markdown, or labels.
Example output:
{{"translated_text": "ہیلو! میرا نام عبد اللہ ہے۔ میں ایک پائتھون ڈویلپر ہوں۔"}}
"""

        # User prompt: just the text to translate
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", SYSTEM_PROMPT),
            ("user", "{text}")
        ]).partial(format_instructions=self.parser.get_format_instructions())

        # Full chain
        self.chain = self.prompt | self.llm | self.parser

    def translate_text(self, text: str, target_language: str) -> str:
        if not text.strip():
            raise ValueError("Text cannot be empty.")
        if not target_language.strip():
            raise ValueError("Target language cannot be empty.")

        payload = {
            "text": text.strip(),
            "target_language": target_language.strip()
        }

        result: TranslationResult = self.chain.invoke(payload)
        return result.translated_text

from typing import Optional
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from .. import get_llm_object


class FormatResult(BaseModel):
    formatted_text: str

class TextSummarizerResponse(BaseModel):
    summarized_text: str


SYSTEM_PROMPT = """
You are a powerful text formatting engine.

Your task is to transform the given text strictly according to user-provided instructions.

Rules:
- Only modify the text to satisfy instructions.
- Preserve meaning unless explicitly instructed to change it.
- Do not add commentary, reasoning, or unrelated content.
- Keep formatting, spacing, punctuation, and emojis exactly if not instructed to change.
- Output clean, professional, and well-structured text.
- Output ONLY a JSON object with key "formatted_text". Example:
{{"formatted_text": "Hello! My name is Abdullah. I am a Python developer."}}
"""


text_formatter_prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("user", "{text}\n\nInstructions: {format_instructions}")
])


class TextFormatter:
    """
    Reliable text formatting utility using an LLM backend.
    Ensures only the formatted text is returned in structured JSON.
    Streaming is disabled for safety and deterministic output.
    """

    def __init__(
        self,
        provider: str = "gemini",
        model: str = "gemini-2.5-flash",
        api_key: Optional[str] = None,
    ):
        if not api_key or not api_key.strip():
            raise ValueError("API key is required.")

        # Initialize LLM (streaming disabled)
        self.llm = get_llm_object(
            provider=provider,
            model=model,
            api_key=api_key,
            streaming=False
        )

        # Pydantic parser ensures only 'formatted_text' is returned
        self.parser = PydanticOutputParser(pydantic_object=FormatResult)

        # Attach parser to prompt
        self.chain = text_formatter_prompt | self.llm | self.parser

    def format_text(
        self,
        text: str,
        format_instructions: str
    ) -> str:
        if not text.strip():
            raise ValueError("Input text cannot be empty.")
        if not format_instructions.strip():
            raise ValueError("Format instructions must be provided.")

        payload = {
            "text": text.strip(),
            "format_instructions": format_instructions.strip()
        }

        # Non-streaming: full parsed output
        result: FormatResult = self.chain.invoke(payload)
        return result.formatted_text


class TextSummarizer:
    """
    Reliable text summarization utility using an LLM backend.
    Returns only structured JSON with the summarized text.
    Streaming is disabled for safety and deterministic output.
    """

    def __init__(
        self,
        provider: str = "gemini",
        model: str = "gemini-2.5-flash",
        api_key: Optional[str] = None,
    ):
        if not api_key or not api_key.strip():
            raise ValueError("API key is required.")

        self.llm = get_llm_object(
            provider=provider,
            model=model,
            api_key=api_key,
            streaming=False
        )

        SYSTEM_PROMPT = """
You are a powerful text summarization engine.
Summarize the input text strictly.
Output Summary Length is "{summary_length}"
Output ONLY a JSON object with key "summarized_text".
Do not add commentary, reasoning, or extra text.
Example:
{{"summarized_text": "This is a short summary."}}
"""

        text_summarizer_prompt = ChatPromptTemplate.from_messages([
            ("system", SYSTEM_PROMPT),
            ("user", "{text}")
        ])

        self.parser = PydanticOutputParser(pydantic_object=TextSummarizerResponse)

        self.chain = text_summarizer_prompt | self.llm | self.parser

    def summarize_text(self, text: str, summary_length: str) -> str:
        if not text.strip() or not summary_length.strip():
            raise ValueError("Input text cannot be empty.")

        payload = {"text": text.strip(), "summary_length": summary_length.strip()}

        result: TextSummarizerResponse = self.chain.invoke(payload)
        return result.summarized_text





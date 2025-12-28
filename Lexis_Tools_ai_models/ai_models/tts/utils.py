import base64
import io
import wave


def pcm_to_wav_base64(
    pcm_bytes,
    channels: int = 1,
    rate: int = 24000,
    sample_width: int = 2
):
    buffer = io.BytesIO()
    with wave.open(buffer, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm_bytes)

    return base64.b64encode(buffer.getvalue()).decode("utf-8")

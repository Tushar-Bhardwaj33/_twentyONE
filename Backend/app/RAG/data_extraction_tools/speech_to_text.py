from groq import Groq
from deepgram import DeepgramClient, PrerecordedOptions, FileSource
import os
from dotenv import load_dotenv
import os

load_dotenv()

__all__ = [
    "Transcribe"
]

class Transcribe:
    def __init__(self, file_path: str = None, file_bytes: bytes = None):
        if not file_path and not file_bytes:
            raise ValueError("Either file_path or file_bytes must be provided.")
        
        self.file_path = file_path
        self.file_bytes = file_bytes or self._read_file(file_path)
        self.response = None

    def _read_file(self, path):
        with open(path, "rb") as f:
            return f.read()

    @classmethod
    def get_available_methods(cls):
        return [
            cls.transcription_by_Groq,
            cls.transcription_by_Deepgram,
        ]

    def transcription_by_Groq(self, model: str = "whisper-large-v3"):
        """
        Transcribe using Groq's Whisper API.
        returns a json with all data.
        reference: https://console.groq.com/docs/speech-to-text
        """

        client = Groq(os.getenv("GROQ_API_KEY"))

        self.transcript = client.audio.transcriptions.create(
            file=self.file_bytes,
            model=model,
            response_format="verbose_json",
        )
        return self.transcript

    def transcription_by_Deepgram(self, model: str = "whisper", language="en", punctuate=True, diarize=True, smart_format=True):
        """
        Transcribe using Deepgram's API.
        returns a json with all data.
        reference: https://developers.deepgram.com/docs/pre-recorded-audio#transcribe-a-local-file
        """
        api_key = os.getenv("DEEPGRAM_API_KEY")
        if not api_key:
            raise ValueError("Deepgram API key is required")

        deepgram = DeepgramClient(api_key)
        
        payload: FileSource = {
            "buffer": self.file_bytes,
        }

        options = PrerecordedOptions(
            model=model,
            language=language,
            smart_format=smart_format,
            punctuate=punctuate,
            diarize=diarize,
        )

        response = deepgram.listen.rest.v("1").transcribe_file(payload, options)
        self.transcript = response.to_json(indent=4)
        return self.transcript

    def transcription_by_nvidia_nim(self, api_key: str = None, model: str = "whisper-large-v3"):
        pass
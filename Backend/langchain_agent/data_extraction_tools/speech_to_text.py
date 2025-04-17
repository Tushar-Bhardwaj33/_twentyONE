from groq import Groq
from deepgram import DeepgramClient, PrerecordedOptions, FileSource
import assemblyai as aai
import os

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
            cls.transcription_by_AssemblyAI,
        ]

    def transcription_by_Groq(self, api_key: str = None, model: str = "whisper-large-v3"):
        """
        Transcribe using Groq's Whisper API.
        returns a json with all data.
        reference: https://console.groq.com/docs/speech-to-text
        """
        if not api_key:
            raise ValueError("Groq API key is required")

        client = Groq(api_key=api_key)

        self.transcript = client.audio.transcriptions.create(
            file=self.file_bytes,
            model=model,
            response_format="verbose_json",
        )
        return self.transcript

    def transcription_by_Deepgram(self, api_key: str = None, model: str = "whisper", language="en", punctuate=True, diarize=True, smart_format=True):
        """
        Transcribe using Deepgram's API.
        returns a json with all data.
        reference: https://developers.deepgram.com/docs/pre-recorded-audio#transcribe-a-local-file
        """
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

    def transcription_by_AssemblyAI(self, config = None, api_key: str = None, async_mode: bool = False, polling_interval: int = 3.0):
        """
        Transcribe using AssemblyAI's API.
        if async_mode is True, it will return a future object with the status of the transcription. then call .result() to get the transcript class object.
        if polling_interval is set, it will poll the status of the transcription every polling_interval seconds.
        if async_mode is False, it will return a transcript object with the text of the transcription.
        methods available: [text,words,utterances,words,word_search]
        reference: https://www.assemblyai.com/docs/sdk-references/python
        """
        aai.settings.api_key = api_key
        if not api_key:
            raise ValueError("AssemblyAI API key is required")
        if config is None:
            config = aai.TranscriptionConfig(
                    speaker_labels=True,# Optional: if you want speaker info
                    punctuate=True,     # Clean punctuation
                    format_text=True,
            )
        if async_mode:
            aai.settings.polling_interval = polling_interval
            self.transcript = aai.Transcriber().transcribe_async(self.file_bytes, config)
        else:
            self.transcript = aai.Transcriber().transcribe(self.file_bytes, config)
        return self.transcript
    
    def transcription_by_nvidia_nim(self, api_key: str = None, model: str = "whisper-large-v3"):
        pass
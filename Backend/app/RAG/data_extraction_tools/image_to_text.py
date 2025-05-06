import base64
import requests
from groq import Groq
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

__all__ = ["ImageToText"]

class ImageToText:
    @classmethod
    def get_available_methods(cls):
        return [cls.get_response, cls.get_method, cls.get_response_by_Groq, cls.get_response_by_nvidia_nim]
    
    def get_response_by_nvidia_nim(self, prompt: str = None, image_b64: str = None, image_file: str = None):
        if image_b64 is None:
            with open("your_image.jpg", "rb") as image_file:
                image_b64 = base64.b64encode(image_file.read()).decode("utf-8")
        invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
        assert len(image_b64) < 180_000, \
        "To upload larger images, use the assets API (see docs)"

        # Retrieve NVIDIA API key from environment variables
        nvidia_api_key = os.getenv("NVIDIA_NIM_API_KEY")
        if not nvidia_api_key:
            raise ValueError("Missing NVIDIA_NIM_API_KEY in environment variables.")

        headers = {
            "Authorization": f"Bearer {nvidia_api_key}",
            "Accept": "application/json"
        }

        if prompt is None:
            prompt = f'Summarize this image in 5 short sentences. <img src="data:image/jpeg;base64,{image_b64}" />'

        payload = {
            "model": 'microsoft/phi-3.5-vision-instruct',
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 512,  # Reduce max tokens
            "temperature": 0.20,
            "top_p": 0.70,
        }

        response = requests.post(invoke_url, headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error: {response.status_code} - {response.text}")
        
    def get_response_by_Groq(self, prompt: str = None, image_b64: str = None, image_file: str = None):
        # Retrieve GROQ API key from environment variables
        groq_api_key = os.getenv("GROQ_API_KEY")
        if not groq_api_key:
            raise ValueError("Missing GROQ_API_KEY in environment variables.")

        client = Groq(groq_api_key)
        if prompt is None:
            prompt = f'Summarize this image in 5 short sentences. <img src="data:image/jpeg;base64,{image_b64}" />'
        completion = client.chat.completions.create(
            model="meta-llama/llama-4-maverick-17b-128e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True,
            stop=None,
        )

        for chunk in completion:
            print(chunk.choices[0].delta.content or "", end="")

    def get_response(self, prompt: str = None, image_b64: str = None, image_file: str = None):
        if image_b64 is None:
            with open("your_image.jpg", "rb") as image_file:
                image_b64 = base64.b64encode(image_file.read()).decode("utf-8")
        if prompt is None:
            prompt = f'Summarize this image in 5 short sentences. <img src="data:image/jpeg;base64,{image_b64}" />'
        model = init_chat_model(
            "meta/llama-3.2-90b-vision-instruct",
            model_provider="nvidia",
            temperature=1
        )
        image_url = {
            "url": f"data:image/jpeg;base64,{image_b64}"
        }
        # Prompt with image
        msg = HumanMessage(
            content=[
                {"type": "text", "text": "What’s in this image? Describe in detail"},
                {"type": "image_url", "image_url": image_url}
            ]
        )
        response = model.invoke([msg])
        return response
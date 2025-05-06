import getpass
import os
from langchain.chat_models import init_chat_model


if not os.environ.get("GROQ_API_KEY"):
  os.environ["GROQ_API_KEY"] = getpass.getpass("Enter API key for Groq: ")

class models:
    """
    This class is used to initialize the chat model for the Langchain agent.
    It uses the Groq API key to authenticate the user and load the model.
    """
    def __init__(self, model_name: str, model_provider: str):
        self.model_name = model_name
        self.model_provider = model_provider

    def init_chat_model(self):
        """
        Initializes the chat model using the provided model name and provider.
        """
        if self.model_provider == "groq":
            return init_chat_model(self.model_name, model_provider=self.model_provider)
        else:
            raise ValueError(f"Unsupported model provider: {self.model_provider}")
    
    def get_model(self):
        """
        Returns the initialized chat model.
        """
        return self.model_name, self.model_provider
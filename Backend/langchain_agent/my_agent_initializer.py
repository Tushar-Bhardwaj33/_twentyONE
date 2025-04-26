from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
import os
from langchain.chat_models import init_chat_model
from custom_agent_tools import *
from langchain.chat_models import init_chat_model

# Set API keys
os.environ["TAVILY_API_KEY"] = "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"
os.environ["NVIDIA_API_KEY"] = "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"

# Initialize components
memory = MemorySaver()
search = TavilySearchResults(max_results=2)

# Initialize chat model
os.environ["COHERE_API_KEY"] = ("agYBSY9J91Kgz5iyDdQgyEChPVbuDcIk9sRT3djT")
model = init_chat_model("command-r-plus", model_provider="cohere")

# Initialize fallback model
fallback_model = init_chat_model("meta/llama-3.1-405b-instruct", model_provider="nvidia")

# Define tools
tools = [search, translator]

TwentyONE = create_react_agent(
        model=model,
        tools=tools,
        checkpointer=memory
    )
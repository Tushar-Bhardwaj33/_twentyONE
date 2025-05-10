from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain.chat_models import init_chat_model
from Backend.app.agent.custom_agent_tools import *
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Initialize components
memory = MemorySaver()
search = TavilySearchResults(max_results=2)

# Initialize chat model
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
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain.chat_models import init_chat_model
from .custom_agent_tools import *
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

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

def create_rag_agent(retriever):
    """Create a RAG agent that uses the given retriever."""

    contextualize_q_system_prompt = \"\"\"Given a chat history and the latest user question \
    which might reference context in the chat history, formulate a standalone question \
    which can be understood without the chat history. Do NOT answer the question, \
    just reformulate it if needed and otherwise return it as is.\"\"\"
    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    history_aware_retriever = create_history_aware_retriever(
        model, retriever, contextualize_q_prompt
    )

    qa_system_prompt = \"\"\"You are an assistant for question-answering tasks. \
    Use the following pieces of retrieved context to answer the question. \
    If you don't know the answer, just say that you don't know. \
    Use three sentences maximum and keep the answer concise.\

    {context}\"\"\"
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", qa_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )

    question_answer_chain = create_stuff_documents_chain(model, qa_prompt)

    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    return rag_chain
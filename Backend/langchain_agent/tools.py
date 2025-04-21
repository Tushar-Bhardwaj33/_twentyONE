from langchain_core.tools import StructuredTool, tool
from langchain_agent.data_extraction_tools.web_tools import WEB_TavilyClient
from typing import Annotated, List

def web_search(query:str):
    client=WEB_TavilyClient()
    search_results = client.search(query)
    return search_results


def web_extract(url:str):
    client=WEB_TavilyClient()
    extraction_results = client.extract(url)
    return extraction_results

StructuredTool.from_function(
    func=web_search,
    name="web_search",
    description="Search the web for a given query.",
    args_schema=Annotated[str, "The search query."],
)
StructuredTool.from_function(
    func=web_extract,
    name="web_extract",
    description="Extract data from a given URL.",
    args_schema=Annotated[str, "The URL to extract data from."],
)

web_search.invoke("What is the capital of France?")
# To install: pip install tavily-python
from tavily import TavilyClient
from typing import List, Optional, Dict, Any
import logging
from tavily.exceptions import TavilyError
from dotenv import load_dotenv
import os

load_dotenv()

logging.basicConfig(level=logging.INFO)

# reference: "https://docs.tavily.com/sdk/python/reference"

class WEB_TavilyClient:
    """
    Tavily API client for web search and URL extraction.
    """
    def __init__(
        self,
        search_depth: str = "basic",
        topic: str = "general",
        days: Optional[int] = None,
        time_range: Optional[int] = None,
        max_results: int = 5,
        chunks_per_source: Optional[int] = None,
        include_images: bool = False,
        include_image_descriptions: bool = False,
        include_answer: bool = False,
        include_raw_content: bool = False,
        include_domains: Optional[List[str]] = None,
        exclude_domains: Optional[List[str]] = None,
        extract_depth: str = "basic",
        timeout: int = 60,
    ):
        self.search_depth = search_depth
        self.topic = topic
        self.days = days
        self.time_range = time_range
        self.max_results = max_results
        self.chunks_per_source = chunks_per_source
        self.include_images = include_images
        self.include_image_descriptions = include_image_descriptions
        self.include_answer = include_answer
        self.include_raw_content = include_raw_content
        self.include_domains = include_domains
        self.exclude_domains = exclude_domains
        self.extract_depth = extract_depth
        self.timeout = timeout
        self.client = TavilyClient(os.getenv("TAVILY_API_KEY"))

    @property
    def search_config(self) -> Dict[str, Any]:
        return {
            "search_depth": self.search_depth,
            "topic": self.topic,
            "days": self.days,
            "time_range": self.time_range,
            "max_results": self.max_results,
            "chunks_per_source": self.chunks_per_source,
            "include_images": self.include_images,
            "include_image_descriptions": self.include_image_descriptions,
            "include_answer": self.include_answer,
            "include_raw_content": self.include_raw_content,
            "include_domains": self.include_domains,
            "exclude_domains": self.exclude_domains,
            "timeout": self.timeout,
        }

    @property
    def extraction_config(self) -> Dict[str, Any]:
        return {
            "include_images": self.include_images,
            "extract_depth": self.extract_depth,
            "timeout": self.timeout,
        }

    @classmethod
    def get_available_methods(cls):
        return [cls.search, cls.extract, cls.get_client, cls.search_config, cls.extraction_config]

    def get_client(self):
        return self.client
    
    def search(self, query: str):
        """
        Search the web using Tavily API with the given configuration.
        """
        if not query.strip():
            raise ValueError("Query cannot be empty.")
        logging.info(f"Searching for query: {query}")
        try:
            response = self.client.search(
                query=query,
                **{k: v for k, v in self.search_config.items() if v is not None}
            )
            return response
        except TavilyError as e:
            logging.error(f"Error during search: {e}")
            raise

    def extract(self, urls: List[str]):
        """
        Extract data from URLs using Tavily API with the given configuration.
        """
        if not urls:
            raise ValueError("URLs cannot be empty.")
        
        logging.info(f"Extracting data from URLs: {urls}")
        try:
            response = self.client.extract(
                urls=urls,
                **{k: v for k, v in self.extraction_config.items() if v is not None}
            )
            return response
        except TavilyError as e:
            logging.error(f"Error during extraction: {e}")
            raise
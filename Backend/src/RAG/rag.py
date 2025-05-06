import os
from data_extraction_tools import GET, PDFChunker
from summarizer import SummarizerAndImageDescriber
from Backend.src.RAG.loader import MultiModalRAGLoader

class RAG:
    def __init__(self, collection_name, groq_api_key=None, nvidia_api_key=None):
        """Initialize the RAG instance with collection name and optional API keys."""
        self.collection_name = collection_name
        self.groq_api_key = groq_api_key or os.getenv("GROQ_API_KEY")
        self.nvidia_api_key = nvidia_api_key or os.getenv("NVIDIA_API_KEY")

        # Initialize tools
        self.get_tool = GET()
        self.chunker_tool = PDFChunker()
        self.summarizer_tool = SummarizerAndImageDescriber(
            groq_api_key=self.groq_api_key,
            nvidia_api_key=self.nvidia_api_key
        )
        self.loader = MultiModalRAGLoader(collection_name=self.collection_name)

    def process_pdf(self, file_path):
        """Process a PDF file: extract chunks, images, texts, tables, summarize, and return the retriever."""
        try:
            # Step 1: Chunk the PDF
            chunks = self.chunker_tool.chunk_pdf(file_path)
            if not chunks:
                return f"No chunks extracted from the PDF: {file_path}"

            # Step 2: Extract images, texts, and tables
            try:
                images = self.get_tool.get_images(chunks)
                texts = self.get_tool.get_texts(chunks)
                tables = self.get_tool.get_tables(chunks)
            except Exception as e:
                return f"Error extracting data from chunks: {str(e)}"

            # Step 3: Summarize the extracted content
            try:
                text_summaries = self.summarizer_tool.summarize_texts(texts)
                table_summaries = self.summarizer_tool.summarize_tables(tables)
                image_summaries = self.summarizer_tool.describe_images(images)
            except Exception as e:
                return f"Error summarizing content: {str(e)}"

            # Step 4: Add data to the loader
            self.loader.add_data(
                texts=texts,
                text_summaries=text_summaries,
                tables=tables,
                table_summaries=table_summaries,
                images=images,
                image_summaries=image_summaries
            )

            # Step 5: Return the retriever
            retriever = self.loader.get_retriever()
            if not retriever:
                return "Failed to create retriever."

            return retriever
        
        except Exception as e:
            return f"Unexpected error: {str(e)}"
        
    def process_transcript(self, transcript: str):
        """Process a transcript: load on word, sentence and level and return retriever."""
        import json
        transcript_data = json.loads(transcript)
        sentences=transcript_data['results']['channels'][0]['alternatives'][0]['paragraphs']['paragraphs'][0]['sentences']
        pass
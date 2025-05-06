from langchain_core.vectorstores import InMemoryVectorStore
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings
from langchain.schema import Document
import uuid

class TranscriptAISearch:
    def __init__(self, transcript_data, model="nvidia/nv-embedqa-mistral-7b-v2"):
        """Initialize with transcript data and process it."""
        self.transcript_data = transcript_data
        self.model = model
        self.embeddings = NVIDIAEmbeddings(model=model)
        self.vector_store = InMemoryVectorStore(embedding_function=self.embeddings)

        self._process_and_store_transcript(transcript_data)
    
        """Process the transcript data and store it in the vector store."""
        self.sentences = transcript_data['results']['channels'][0]['alternatives'][0]['paragraphs']['paragraphs'][0]['sentences']
        
        self.documents = [
            Document(
                page_content=line['text'],
                metadata={'start': line['start'], 'end': line['end'], 'doc_id': str(uuid.uuid4())}
            )
            for line in self.sentences
        ]
        
        # Add documents to the vector store
        self.vector_store.add_documents(documents=self.documents)

        self.words = transcript_data['results']['channels'][0]['alternatives'][0]['words']
        word = [i['word'] for i in self.words]
        id = [i['start'] for i in self.words]
        search_word = {}
        for i in range(len(word)):
            search_word[word[i]] = search_word.get(word[i], []) + [id[i]]
        self.search_word = search_word

    def search(self, query):
        """Perform a similarity search on the vector store of sentences and return the results."""
        results = self.vector_store.similarity_search_with_score(query)
        search_results = []
        for doc, score in results:
            search_results.append({
                'text': doc.page_content,
                'metadata': doc.metadata,
                'score': score
            })
        return search_results
    
    def simple_search(self, word):
        """Perform a simple search on the transcript data and return the word occurrences."""
        return self.search_word.get(word, [])
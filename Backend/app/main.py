import shutil
import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .agent.my_agent_initializer import create_rag_agent
from .RAG.data_extraction_tools.speech_to_text import Transcribe
from .RAG.injest import INGEST
from .RAG.loader import MultiModalRAGLoader
from .RAG.summarizer import SummarizerAndImageDescriber
from langchain_core.messages import HumanMessage

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

transcripts = {}

class ChatRequest(BaseModel):
    message: str
    session_id: str

class SummaryRequest(BaseModel):
    session_id: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        collection_name = f"meeting_{request.session_id}"
        loader = MultiModalRAGLoader(collection_name=collection_name)
        retriever = loader.get_retriever()

        rag_chain = create_rag_agent(retriever)

        response = rag_chain.invoke({"input": request.message, "chat_history": []})

        return {"response": response["answer"]}
    except Exception as e:
        return {"error": str(e)}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        session_id = str(uuid.uuid4())
        collection_name = f"meeting_{session_id}"

        file_bytes = await file.read()
        transcriber = Transcribe(file_bytes=file_bytes)
        transcript = transcriber.transcription_by_AssemblyAI()

        transcripts[session_id] = transcript.text

        ingestor = INGEST(collection_name=collection_name)
        retriever = ingestor.process_transcript(transcript.text)

        return {"transcript": transcript.text, "session_id": session_id}
    except Exception as e:
        return {"error": str(e)}

@app.post("/summary")
async def get_summary(request: SummaryRequest):
    try:
        transcript_text = transcripts.get(request.session_id)
        if not transcript_text:
            return {"error": "Transcript not found for the given session ID."}

        summarizer = SummarizerAndImageDescriber()
        summary = summarizer.summarize_texts([transcript_text])

        return {"summary": summary[0]}
    except Exception as e:
        return {"error": str(e)}

@app.post("/notes")
async def get_notes(request: SummaryRequest):
    try:
        transcript_text = transcripts.get(request.session_id)
        if not transcript_text:
            return {"error": "Transcript not found for the given session ID."}

        summarizer = SummarizerAndImageDescriber()
        notes_prompt = """
        You are an assistant that generates structured meeting notes from a transcript.
        The notes should include a title, a list of participants (if mentioned), a summary of the discussion,
        and a list of action items with assignees (if mentioned).

        Respond only with the notes in a structured format (e.g., Markdown).

        Transcript: {element}
        """
        notes = summarizer.summarize_texts([transcript_text], prompt_text=notes_prompt)

        return {"notes": notes[0]}
    except Exception as e:
        return {"error": str(e)}

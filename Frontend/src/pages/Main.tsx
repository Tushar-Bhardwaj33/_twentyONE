import React, { useState, FormEvent, ChangeEvent, useRef } from "react";
import ReactPlayer from "react-player";
import DownloadAndCopyPdf from "../components/PDF";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { FileUpload } from "../components/FileUpload";
import { v4 as uuidv4 } from 'uuid';

interface Message {
    sender: 'user' | 'assistant';
    text: string;
}

interface Word {
    text: string;
    start: number;
    end: number;
}

interface Transcript {
    text: string;
    words: Word[];
}

export default function MainPage() {
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Ask'>('Summary');
    const sidebarList = ["New Meeting", "Previous Meeting", "Summary", "Ask TwentyOne", "Help"];
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [sessionId, setSessionId] = useState<string>(uuidv4());
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const playerRef = useRef<ReactPlayer>(null);
    const transcriptContainerRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setTranscript({ text: data.transcript, words: data.words });
            setSessionId(data.session_id);
            setVideoUrl(URL.createObjectURL(file));
        } catch (error) {
            console.error("There was a problem with the file upload:", error);
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = { sender: 'user', text: inputValue };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const currentInputValue = inputValue;
        setInputValue('');

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: currentInputValue, session_id: sessionId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const assistantMessage: Message = { sender: 'assistant', text: data.response };
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            const errorMessage: Message = { sender: 'assistant', text: "Sorry, I'm having trouble connecting to the server." };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    const handleWordClick = (time: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(time / 1000, 'seconds');
        }
    };

    const filteredWords = transcript?.words.filter(word =>
        word.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white">
            <div className="flex">
                <div className="w-[15%] bg-customBg h-screen text-lg text-white flex flex-col justify-center gap-6 p-6">
                    {sidebarList.map((item, index) => (
                        <div key={index} className="cursor-pointer hover:underline decoration-white">{item}</div>
                    ))}
                </div>
                <div className="w-[85%] overflow-y-auto h-screen">
                    <div className="flex w-full">
                        <div className="w-[70%] h-[600px] p-5">
                            {videoUrl ? (
                                <ReactPlayer
                                    ref={playerRef}
                                    url={videoUrl}
                                    controls
                                    playing
                                    loop
                                    muted
                                    className="rounded-2xl overflow-hidden"
                                    width="100%"
                                    height="100%"
                                    onProgress={(progress) => setCurrentTime(progress.playedSeconds * 1000)}
                                />
                            ) : (
                                <FileUpload onFileUpload={handleFileUpload} />
                            )}
                        </div>
                        <div className="w-[30%] bg-customBg h-[562px] rounded-2xl my-5 mr-2">
                            <div className="flex justify-between p-4 text-white">
                                <div className="text-2xl">Transcript</div>
                                {transcript && <DownloadAndCopyPdf text={transcript.text} />}
                            </div>

                            <div className="mx-4 my-1">
                                <input
                                    className="bg-white w-full py-1 px-3 rounded-lg outline-none"
                                    type="text"
                                    placeholder="Search transcript..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="text-white h-[430px] overflow-y-auto p-4 my-2" ref={transcriptContainerRef}>
                                {filteredWords?.map((word, index) => {
                                    const isPlaying = currentTime >= word.start && currentTime <= word.end;
                                    const wordRef = React.createRef<HTMLSpanElement>();

                                    if (isPlaying) {
                                        wordRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }

                                    return (
                                        <span
                                            key={index}
                                            ref={wordRef}
                                            onClick={() => handleWordClick(word.start)}
                                            className={`cursor-pointer hover:bg-gray-600 p-1 rounded-md ${isPlaying ? 'bg-gray-500' : ''}`}
                                        >
                                            {word.text}{' '}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-4 mx-8 text-xl">
                            <div className={`cursor-pointer text-black ${selectedTab === 'Summary' ? "border-b-2 border-customBg" : ""}`} onClick={() => setSelectedTab('Summary')}>Summary</div>
                            <div className={`cursor-pointer ${selectedTab === 'Ask' ? "border-b-2 border-customBg" : ""}`} onClick={() => setSelectedTab('Ask')}>Ask</div>
                        </div>
                        {selectedTab === 'Summary' ? (
                            <div className="bg-customBg h-[600px] my-5 mx-6 rounded-2xl">
                                <div className="overflow-auto">
                                    <div className="p-4 bg-customBg flex justify-end gap-4 rounded-2xl">
                                        {transcript && <DownloadAndCopyPdf text={transcript.text} />}
                                    </div>
                                    <div className="text-white m-6">{transcript?.text}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-customBg h-[600px] my-5 mx-6 rounded-2xl">
                                <div className="h-[85%] w-full overflow-auto">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} m-6`}>
                                            <div className={`chat ${msg.sender === 'user' ? 'chat-sender' : ''}`}>
                                                <div className={`${msg.sender === 'user' ? 'bg-white text-customBg' : 'bg-customBg text-white'} p-3 m-2 max-w-[800px] rounded-2xl`}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full h-[15%] py-6 px-12">
                                    <PlaceholdersAndVanishInput
                                        placeholders={placeholders}
                                        onChange={handleChange}
                                        onSubmit={onSubmit}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
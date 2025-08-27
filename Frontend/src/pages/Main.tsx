import { useState, FormEvent, ChangeEvent } from "react";
import ReactPlayer from "react-player";
import DownloadAndCopyPdf from "../components/PDF";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { FileUpload } from "../components/FileUpload";
import { v4 as uuidv4 } from 'uuid';


const transcript: string = `# Project Documentation

## ✨ Features

- Easy to write using Markdown
- Converts to styled PDF
- No text overlap
- Proper spacing, bullets, code blocks, and headings

## 🔧 Installation

1. Install dependencies using npm or yarn
2. Write your content in **Markdown**
3. Press "Download PDF"

## 💻 Code Example

\`\`\`ts
const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};
\`\`\`

## 📌 Notes

> This is a blockquote. Use it for important notes or quotes.

Thanks for using our Markdown to PDF converter!`

interface Message {
    sender: 'user' | 'assistant';
    text: string;
}

export default function MainPage() {
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Ask'>('Summary');
    const sidebarList = ["New Meeting", "Previous Meeting", "Summary", "Ask TwentyOne", "Help"];
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [sessionId] = useState<string>(uuidv4());


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

    return (
        <div className="bg-white">
            <div className="flex">
                <div className="w-[15%] bg-customBg h-screen text-lg text-white flex flex-col justify-center gap-6
                p-6 ">
                    {sidebarList.map((item, index) => (
                        <div key={index} className="cursor-pointer hover:underline decoration-white">{item}</div>
                    ))}
                </div>
                <div className=" w-[85%] overflow-y-auto h-screen ">
                    <div className="flex w-full">
                        <div className="w-[70%] h-[600px] p-5">
                            {/* <ReactPlayer
                                url="https://www.youtube.com/watch?v=uLrReyH5cu0"
                                controls
                                playing
                                loop
                                muted
                                className="rounded-2xl overflow-hidden"
                                width="100%"
                                height="100%"
                            /> */}
                            <FileUpload/>
                        </div>
                        <div className="w-[30%] bg-customBg h-[562px] rounded-2xl my-5 mr-2">
                            <div className="flex justify-between p-4 text-white">
                                <div className="text-2xl">Transcript</div>
                                <DownloadAndCopyPdf text={transcript} />
                            </div>

                            <div className="mx-4 my-1">
                                <input className="bg-white w-full py-1 px-3 rounded-lg outline-none" type="text" />
                            </div>
                            <div className="text-white h-[430px] overflow-y-auto p-4 my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae illum dignissimos cupiditate, soluta eaque. Accusamus laboriosam perspiciatis quibusdam aperiam ipsa est consequuntur dolore, voluptatum qui sed exercitationem. Sapiente, repellendus.
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum ducimus saepe praesentium ab numquam distinctio inventore aliquam enim autem repellendus, quod perferendis quam. Dolores asperiores eos distinctio ratione, sint non!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae illum dignissimos cupiditate, soluta eaque. Accusamus laboriosam perspiciatis quibusdam aperiam ipsa est consequuntur dolore, voluptatum qui sed exercitationem. Sapiente, repellendus.
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum ducimus saepe praesentium ab numquam distinctio inventore aliquam enim autem repellendus, quod perferendis quam. Dolores asperiores eos distinctio ratione, sint non!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quae illum dignissimos cupiditate, soluta eaque. Accusamus laboriosam perspiciatis quibusdam aperiam ipsa est consequuntur dolore, voluptatum qui sed exercitationem. Sapiente, repellendus.
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum ducimus saepe praesentium ab numquam distinctio inventore aliquam enim autem repellendus, quod perferendis quam. Dolores asperiores eos distinctio ratione, sint non!

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-4 mx-8 text-xl">
                            <div className={`cursor-pointer text-black ${selectedTab == 'Summary' ? "border-b-2 border-customBg" : ""}`} onClick={() => setSelectedTab('Summary')}>Summary</div>
                            <div className={`cursor-pointer ${selectedTab == 'Ask' ? "border-b-2 border-customBg" : ""}`} onClick={() => setSelectedTab('Ask')}>Ask</div>
                        </div>
                        {selectedTab == 'Summary' ?
                            <div className="bg-customBg h-[600px] my-5 mx-6 rounded-2xl">
                                <div className=" overflow-auto">
                                    <div className="p-4 bg-customBg flex justify-end gap-4 rounded-2xl">
                                        <DownloadAndCopyPdf text={transcript} />
                                    </div>
                                    <div className="text-white m-6">{transcript}</div>
                                </div>
                            </div> :
                            <div className="bg-customBg h-[600px] my-5 mx-6 rounded-2xl ">
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
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
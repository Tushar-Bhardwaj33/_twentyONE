import { useState } from "react";
import ReactPlayer from "react-player";
import DownloadAndCopyPdf from "../components/PDF";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { FileUpload } from "../components/FileUpload";

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

export default function MainPage() {
    const [selectedTab, setSelectedTab] = useState<'Summary' | 'Ask'>('Summary');
    const sidebarList = ["New Meeting", "Previous Meeting", "Summary", "Ask TwentyOne", "Help"];
    const [sender, setSender] = useState<'user' | 'assistant'>('user');
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
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
                                    {sender === 'user' ? (
                                        <div className="flex justify-end m-6">
                                            <div className="chat chat-sender">
                                                <div className="bg-white text-customBg p-3 m-2 max-w-[800px] rounded-2xl">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate esse eveniet necessitatibus excepturi ducimus nesciunt repellendus quis quae, velit iste, dolorem explicabo deleniti tenetur illum? Sequi odio recusandae excepturi facilis.
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start m-6">
                                            <div className="bg-customBg text-white p-3 max-w-[800px] rounded-2xl">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio culpa, aperiam autem recusandae facilis molestias cumque nostrum. Est, minus. Incidunt itaque, odit numquam consectetur assumenda dolor sequi eum modi excepturi.
                                            </div>
                                        </div>
                                    )}

                                </div>
                                <div className="w-full h-[15%] py-6 px-12">
                                    {/* <input className="w-full rounded-full p-6 h-12 text-lg outline-none " type="text" /> */}
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
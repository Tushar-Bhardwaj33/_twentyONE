import { useState } from "react";
export default function Arch() {
    var arr = [true,false,false];
    const [showCard,setShowCard] = useState(arr);
    return (
        <div className="">
            <div className="flex my-28 mx-60">
                <div className="w-[40%]">
                    <div className="">
                        <div className="border-2 border-red-500 rounded-3xl m-2.5 w-80 h-auto cursor-pointer" onClick={()=>setShowCard([true,false,false])}>
                            <div className={`m-4 text-xl mb-40 ${showCard[0] ? "h-auto" : "hidden" }`}>
                                Supercharge your reports with real-time, comprehensive data from across the web, ensuring accuracy and relevance.
                            </div>
                            <button className="bg-red-500 rounded-full px-6 py-4 text-white text-lg m-6" >
                                Research Assistant
                            </button>
                        </div>
                        <div className="border-2 border-green-600 rounded-3xl m-2.5 w-80 h-auto cursor-pointer" onClick={()=>setShowCard([false,true,false])}>
                        <div className={`m-4 text-xl mb-40 ${showCard[1] ? "h-auto" : "hidden" }`}>
                                Supercharge your reports with real-time, comprehensive data from across the web, ensuring accuracy and relevance.
                            </div>
                            <button className="bg-green-600 rounded-full px-6 py-4 text-white text-lg m-6" >
                                Research Assistant
                            </button>
                        </div>
                        <div className="border-2 border-blue-600 rounded-3xl m-2.5 w-80 h-auto cursor-pointer" onClick={()=>setShowCard([false,false,true])}>
                        <div className={`m-4 text-xl mb-40 ${showCard[2] ? "h-auto" : "hidden" }`}>
                                Supercharge your reports with real-time, comprehensive data from across the web, ensuring accuracy and relevance.
                            </div>
                            <button className="bg-blue-600 rounded-full px-6 py-4 text-white text-lg m-6" >
                                Research Assistant
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[75%]">
                    <img className="w-full h-[100%] p-2" src="https://tavily.com/_next/static/media/app-red-lg.25f93dc4.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
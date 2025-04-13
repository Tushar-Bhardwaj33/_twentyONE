import { VideoCard } from "../components/VideoCard"
import Lottie from 'lottie-react';
import animationData from '../assets/Background_Animation.json';

export function Landing() {
    return (
        <div>
            {/* <div className="absolute inset-0 -z-10 opacity-80 w-screen h-screen">
                <Lottie animationData={animationData} loop autoplay className="w-full h-full" />
            </div> */}
            <div className="text-grey-500 mx-10 h-screen">
                {/* Appbar */}
                <div className="flex mx-2 my-8 py-4  px-8 bg-white justify-between rounded-full item-center shadow-md ">
                    <div className="text-3xl">TwentyOne</div>
                    <div className="flex text-lg gap-8 cursor-pointer hover: text-underline">
                        <div>Signin</div>
                        <div>Signup</div>
                    </div>
                </div>
                <div className="flex h-[70%] items-center">
                    <div className="w-[60%] ml-10">
                        <div className="text-6xl ">
                            AI-Powered Meeting Notes
                        </div>
                        <div className="text-2xl my-4 ">
                            Upload your meeting recordings and get accurate, speaker-labeled transcripts with smart summaries — in seconds.
                        </div>
                        <button className="bg-black rounded-full px-3 py-2 text-white text-lg">
                            Get Started →
                        </button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            {/* Features */}
            <div>
                <div>
                    <div className="text-red-600 text-2xl flex justify-center">Features</div>
                    <div className="text-6xl m-10 flex justify-center ">Introducing our Search API</div>
                    <div className="text-xl flex justify-center">
                        <div >
                            <div className="w-full flex justify-center">Boost your AI with a search engine tailored for LLMs.</div>
                            <div>
                                Delivering fast and accurate results, reducing hallucinations for better decision-making.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <VideoCard />
            </div>
            <div>
                <VideoCard />
            </div>
            {/* Arch */}
            <div className="">
                <div className="flex my-28 mx-36">
                    <div className="w-[40%] mx-4">
                        <div className="">
                            <div className="border-2 border-red-400 rounded-xl m-2.5 ">
                                <div className="m-4 ">
                                    Empower your chatbots to deliver precise, up-to-date responses by accessing a wide range of information through Tavily’s robust search capabilities.
                                </div>
                                <button className="bg-black rounded-full px-3 py-2 text-white text-lg m-4">
                                    Get Started →
                                </button>
                            </div>
                            <div className="border-2 border-red-400 rounded-xl m-2 ">
                                <div className="m-4 ">
                                    Empower your chatbots to deliver precise, up-to-date responses by accessing a wide range of information through Tavily’s robust search capabilities.
                                </div>
                                <button className="bg-black rounded-full px-3 py-2 text-white text-lg m-4">
                                    Get Started →
                                </button>
                            </div>
                            <div className="border-2 border-red-400 rounded-xl m-2 ">
                                <div className="m-4 ">
                                    Empower your chatbots to deliver precise, up-to-date responses by accessing a wide range of information through Tavily’s robust search capabilities.
                                </div>
                                <button className="bg-black rounded-full px-3 py-2 text-white text-lg m-4">
                                    Get Started →
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-[60%]">
                        <img src="https://tavily.com/_next/static/media/app-red-lg.25f93dc4.svg" alt="" />
                    </div>
                </div>
            </div>
            {/* FAQ */}
            <div className="flex m-20">
                <div className="w-[30%] m-10">
                    <div className="text-6xl">
                        Everything you need to know
                    </div>
                    <div className="text-lg my-4">
                        If you have any questions, please do not hesitate to reach to our support team.
                    </div>
                    <button className="bg-black rounded-full px-3 py-2 text-white text-lg my-4">
                        Contact us
                    </button>
                </div>
                <div className="w-[70%] ">
                    <div className="m-4 bg-sky-100 rounded-xl shadow-md">
                        <div className="text-xl px-6 py-4">
                            What is Tavily Search API?
                        </div>
                        <div className="text-gray-700 text-md px-6 py-4">
                            Tavily Search API is a specialized search engine designed for Large Language Models (LLMs) and AI agents. It provides real-time, accurate, and unbiased information, enabling AI applications to retrieve and process data efficiently. Tavily is built with AI developers in mind, simplifying the process of integrating dynamic web information into AI-driven solutions.
                        </div>
                    </div>
                    <div className="m-4 bg-sky-100 rounded-xl shadow-md">
                        <div className="text-xl px-6 py-4">
                            What is Tavily Search API?
                        </div>
                        <div className="text-gray-700 text-md px-6 py-4">
                            Tavily Search API is a specialized search engine designed for Large Language Models (LLMs) and AI agents. It provides real-time, accurate, and unbiased information, enabling AI applications to retrieve and process data efficiently. Tavily is built with AI developers in mind, simplifying the process of integrating dynamic web information into AI-driven solutions.
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
            {/* Footer */}
            <div className="bg-gray-200 h-32">
                <div className="flex justify-center text-lg p-8">
                    © 2025 TwentyOne Inc. All rights reserved.
                </div>
            </div>
        </div>

    )
}
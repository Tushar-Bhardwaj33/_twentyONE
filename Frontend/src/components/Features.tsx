'use-client'

import VideoCard from "./VideoCard"
import { LampContainer } from "./ui/lamp";
import { motion } from "framer-motion";

export default function Features() {
    return (
        <div>
            <div>
                <div>
                    <LampContainer>
                        <motion.h1
                            initial={{ opacity: 0.5, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.8,
                                ease: "easeInOut",
                            }}
                            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                        >
                            <div className="text-6xl m-10 flex justify-center text-white">Introducing our Search API</div>
                            <div className="text-xl flex justify-center text-white">
                                <div >
                                    <div className="w-full flex justify-center">Boost your AI with a search engine tailored for LLMs.</div>
                                    <div>
                                        Delivering fast and accurate results, reducing hallucinations for better decision-making.
                                    </div>
                                </div>
                            </div>
                        </motion.h1>
                    </LampContainer>
                    {/* <div className="text-red-600 text-2xl flex justify-center">Features</div>
                    <div className="text-6xl m-10 flex justify-center ">Introducing our Search API</div>
                    <div className="text-xl flex justify-center">
                        <div >
                            <div className="w-full flex justify-center">Boost your AI with a search engine tailored for LLMs.</div>
                            <div>
                                Delivering fast and accurate results, reducing hallucinations for better decision-making.
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <VideoCard />
            <VideoCard />
        </div>
    )
}
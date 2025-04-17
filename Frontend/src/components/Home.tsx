import { useNavigate } from "react-router-dom";
import Appbar from "./Appbar"
import { useInView } from "./useInView";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

import { TextHoverEffect } from "./ui/text-hover-effect";
export default function Home() {
    const { ref, isInView } = useInView(0.2);
    const navigate = useNavigate()

    return (
        <div className="h-screen text-white bg-customBg">
            <div className="h-[50%] mt-[400px] absolute bg-customBg">
                <TextHoverEffect text="TwentyOne" />
            </div>
            <div className="flex justify-center p-10">
                <Appbar />
            </div>
            <div className="px-10  z-10 flex h-[50%] items-center ">
                <div ref={ref} className={`w-[60%] ml-10 cursor-default ${isInView ? "motion-preset-focus" : ""}`}>
                    <div className="text-5xl flex gap-4 ">
                        AI-Powered Meeting Notes
                    </div>
                    <div className="text-lg my-4 ">
                        Upload your meeting recordings and get accurate, speaker-labeled transcripts with smart summaries — in seconds.
                    </div>
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="dark:bg-customBg px-6 py-3 bg-white text-lg text-black dark:text-white flex items-center space-x-2"
                        onClick={() => navigate("/main")}>
                        Get Started →
                    </HoverBorderGradient>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}
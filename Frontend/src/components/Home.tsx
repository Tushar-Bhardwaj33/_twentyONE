import Appbar from "./Appbar"
export default function Home() {
    return (
        <div className="text-grey-500 mx-10 h-screen">
            <Appbar />
            <div className="flex h-[70%] items-center">
                <div className="w-[60%] ml-10">
                    <div className="text-6xl ">
                        AI-Powered Meeting Notes
                    </div>
                    <div className="text-2xl my-4 ">
                        Upload your meeting recordings and get accurate, speaker-labeled transcripts with smart summaries — in seconds.
                    </div>
                    <button className="bg-black rounded-full px-6 py-3 text-white text-lg">
                        Get Started →
                    </button>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}
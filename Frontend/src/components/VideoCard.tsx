import VideoPlayer from "./VideoPlayer"
export default function VideoCard() {
    return (
        <div className="flex m-10 text-customBg">
            <div className="w-[40%] m-20">
                <div className="text-4xl m-10">
                    Ask TwentyOne!
                </div>
                <div className="text-2xl  text-cyan-800 m-10">
                    Interact with your recordings through a powerful AI assistant for instant answers and insights. It’s ChatGPT for your meetings!
                </div>
               
            </div>
            <div className="w-[70%]">
            <VideoPlayer />

            </div>
        </div>
    )
}
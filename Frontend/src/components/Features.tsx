import VideoCard from "./VideoCard"

export default function Features(){
    return(
        <div>
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
            <VideoCard />
            <VideoCard />
        </div>
    )
}
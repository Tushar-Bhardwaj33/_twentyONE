import QueAns from "./QueAns"
export default function Faq() {
    return (
        <div className="flex m-20 h-auto text-customText">
            <div className="w-[30%] m-10">
                <div className="text-6xl">
                    Everything you need to know
                </div>
                <div className="text-lg my-4">
                    If you have any questions, please do not hesitate to reach to our support team.
                </div>
                <button className="bg-customBg rounded-full px-3 py-2 text-white text-lg my-4">
                    Contact us
                </button>
            </div>
            <div className="w-[70%] ">
                <QueAns />
                <QueAns />
                <QueAns />
            </div>
        </div>
    )
}
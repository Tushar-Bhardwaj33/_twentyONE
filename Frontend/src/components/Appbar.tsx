export default function Appbar() {
    return (
        <div className="flex mx-2 my-8 py-4  px-8 bg-white justify-between rounded-full item-center shadow-md ">
            <div className="text-3xl">TwentyOne</div>
            <div className="flex text-lg gap-8 cursor-pointer hover: text-underline">
                <div>Signin</div>
                <div>Signup</div>
            </div>
        </div>
    )
}
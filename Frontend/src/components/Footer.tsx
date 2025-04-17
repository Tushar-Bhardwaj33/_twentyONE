import { InstagramIcon } from "./InstaIcon"
import { LinkedinIcon } from "./linkedin"
import { TwitterIcon } from "./Twitter"
import { GithubIcon } from "./Github"

export default function Footer() {
    return (
        <div className="bg-customBg h-32 flex justify-between">
            <div className="flex justify-center text-white text-lg p-8">
                © 2025 TwentyOne Inc. All rights reserved.
            </div>
            <div className="text-white m-10 flex gap-4">
                <InstagramIcon className=""/>
                <LinkedinIcon className=""/>
                <TwitterIcon className=""/>
                <GithubIcon className=""/>
            </div>
        </div>
    )
}
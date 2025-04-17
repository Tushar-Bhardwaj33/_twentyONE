import Home from "../components/Home"
import Features from "../components/Features"
import Arch from "../components/Arch"
import Faq from "../components/Faq"
import Footer from "../components/Footer"
import { Testimonials } from "../components/Testimonials"

export function Landing() {
    return (
        <div>
            <Home/>
            <Testimonials/>
            <Features/>
            <Arch />
            <Faq />
            <Footer />
        </div>

    )
}
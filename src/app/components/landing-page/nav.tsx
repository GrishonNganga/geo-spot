import Image from "next/image";
import Logo from "./logo";

export default function Nav() {
    return (
        <div className="container pt-5 flex justify-between">
            <div>
                <Logo />
            </div>

        </div>
    )
}


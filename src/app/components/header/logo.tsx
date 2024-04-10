import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div className="flex items-center">
                <Image src={"/icon.svg"} width={50} height={50} alt="Arboretum logo" />
                <div className="bg-gradient-to-br bg-clip-text font-medium tracking-tight text-transparent md:text-xl from-slate-300 to-slate-500 text-lg">
                    Arboretum
                </div>
            </div>
        </Link>
    )
}
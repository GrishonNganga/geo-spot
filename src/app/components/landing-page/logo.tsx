import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div className="flex gap-x-2 items-center font-bold tracking-wider lg:text-xl">
                <Image src="/geo-spot.png" width={50} height={50} alt="Geo spot logo" />
                <div>
                    Geo Spot
                </div>
            </div>
        </Link>
    )
}
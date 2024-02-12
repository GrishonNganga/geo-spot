import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex gap-x-2 items-center font-bold tracking-wider text-xl">
            <Image src="/geo-spot.png" width={50} height={50} alt="Geo spot logo" />
            <div>
                Geo Spot
            </div>
        </div>
    )
}
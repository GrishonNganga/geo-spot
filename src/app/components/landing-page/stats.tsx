import Image from "next/image";

export default function StatsSection() {
    return (
        <div className="flex flex-col gap-x-3 justify-center items-center">
            <div className="flex gap-x-3 items-center">
                <h1 className="text-2xl lg:text-6xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight text-center tracking-wide subpixel-antialiased">
                    0
                </h1>
                <div className="text-base font-normal">
                    / trees to date
                </div>
            </div>
            <Image src={"forest.svg"} width={500} height={500} className="" alt="Forest icon" />
        </div>
    )
}
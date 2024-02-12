import Image from "next/image";

export default function Page() {
    return (
        <section className="w-full pt-20 lg:pt-0 lg:h-screen">
            <div className="container w-full lg:h-full flex flex-col items-center lg:justify-center gap-y-10 lg:gap-y-20">
                <div className="space-y-3">
                    <h2 className="text-2xl lg:text-5xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                        Explore the World through Photos
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Explore the world through the eyes of others. Discover hidden gems, beautiful
                        landscapes, and interesting places.
                    </p>
                </div>
                <Image className="lg:h-1/2 object-cover rounded-md" src={"/paris-travel.png"} width={1000} height={1000} alt="Photos on a map" />
            </div>
        </section>
    )
}

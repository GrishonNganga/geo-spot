import { Button } from "@/components/ui/button";
import Image from "next/image";
import Nav from "./nav";
import Link from "next/link";
import { getSession } from "@/lib/actions";
import Logo from "./logo";

export default async function Hero() {
    const session = await getSession()
    return (
        <>
            <Nav>
                <Logo />
            </Nav>
            <section className="w-full pt-32 lg:pt-0 h-screen">
                <div className="container w-full lg:h-full flex flex-col items-center lg:justify-center gap-y-10 lg:gap-y-20">
                    <div className="space-y-3">
                        <h1 className="text-2xl lg:text-6x  l font-bold tracking-tighter md:text-4xl/tight lg:text-5xl/tight">
                            Visualize your photos on a map
                        </h1>
                        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Geo Spot lets you explore your memories by mapping your photos. Share your adventures with friends and
                            family.
                        </p>
                        <div className="flex lg:justify-center pt-5 lg:pt-10">
                            {
                                session &&
                                <Link href={"/dashboard"}>
                                    <Button>
                                        View Dashboard
                                    </Button>
                                </Link>
                                ||
                                <Button>
                                    <Link href={"/signup"}>
                                        Get Started
                                    </Link>
                                </Button>
                            }
                        </div>
                    </div>
                    <Image className="lg:h-1/2 object-cover rounded-md" src={"/paris-travel.png"} width={1000} height={1000} alt="Photos on a map" />
                </div>
            </section>
        </>
    )
}
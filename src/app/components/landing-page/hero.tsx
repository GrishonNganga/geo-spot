import Header from "./header";
import CTASection from "./cta";
import StatsSection from "./stats";

export default async function Hero() {
    return (
        <>
            <Header />
            <div className="w-full pt-32 lg:pt-0 lg:h-screen flex flex-col items-center lg:justify-center gap-y-10 lg:gap-y-10">
                <div className="container space-y-3 flex flex-col gap-y-10">
                    <CTASection />
                    <StatsSection />
                </div>
            </div>
        </>
    )
}
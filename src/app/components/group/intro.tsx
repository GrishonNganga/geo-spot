import { CardDescription, CardTitle } from "@/components/ui/card"

export default function Intro({ description }: { description?: string }) {
    return (
        <div className="grow">
            <CardTitle className="text-xl">
                Group Info
            </CardTitle>
            <div className="w-full h-full py-3">
                {
                    description &&
                    <CardDescription className="">

                        {description}
                    </CardDescription> ||
                    <CardDescription className="w-full h-full flex justify-center items-center text-lg">
                        No info about the group yet...
                    </CardDescription>
                }
            </div>
        </div>
    )
}
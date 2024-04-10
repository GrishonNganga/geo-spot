import { Badge } from "@/components/ui/badge"
import { CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { Crown } from "lucide-react"
import Image from "next/image"

export default function MostTreesTop() {
    return (
        <div className="w-full relative flex flex-col bg-accent rounded-t-md gap-y-3 pb-5">
            <div className="absolute w-full -top-10 flex justify-center">
                <div className="w-20 h-20 aspect-sqaure rounded-full relative">
                    <Image src={"/photos-on-map.png"} width={100} height={100} className="border w-full h-full object-cover rounded-full aspect-square" alt="Number 1 on leaderboard" />
                    <div className="absolute top-0 -left-5 -rotate-45">
                        <Crown className="text-yellow-400" size={40} />
                    </div>
                </div>
            </div>
            <CardTitle className="mt-12 text-center text-xl xl:text-2xl">
                Grishon Nganga
            </CardTitle>
            <div className="text-sm text-muted-foreground text-center line-clamp-2">
                A very nice description here from the leader on the board
            </div>
            <div className="text-center">
                <div>
                    <Badge>10,000 trees</Badge>
                </div>
                <div className="text-sm mt-1 text-muted-foreground">
                    {format(new Date(), "LLLL	d, yyyy")}
                </div>
            </div>
        </div>
    )
}
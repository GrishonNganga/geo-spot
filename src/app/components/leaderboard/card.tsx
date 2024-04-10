import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns"

export default function LeaderboardCard() {
    return (
        <div className="w-full flex items-center gap-x-3 bg-accent/30 p-2 my-1 rounded-md">
            <div className="w-16 h-16 aspect-square bg-red-50 rounded-full">
                <Image src={"/photos-on-map.png"} width={100} height={100} className="w-full h-full object-cover rounded-full aspect-square" alt="Number 1 on leaderboard" />
            </div>
            <div className="w-full flex justify-between">
                <div className="w-full flex flex-col">
                    <div className="font-semibold">
                        Grishon Nganga
                    </div>
                    <div className="line-clamp-2 text-sm text-muted-foreground">
                        A very nice description here from the leader on the board
                    </div>
                </div>
                <div className="shrink-0 flex flex-col gap-y-3 justify-center">
                    <div className="text-center">
                        <div>
                            <Badge className="bg-primary/80">10 trees</Badge>
                        </div>
                        <div className="text-xs mt-1 text-muted-foreground">
                            {format(new Date(), "LLLL	d, yyyy")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
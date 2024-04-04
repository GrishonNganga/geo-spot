import { Card } from "@/components/ui/card";
import { getPublicGroupStats } from "@/lib/actions";
import { photoSpaceStore } from "@/store";
import { Calendar, TreePine, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function GeneralStats({ members, trees, completion, deadline }: { trees: number, members: number, completion: number, deadline?: Date }) {
    const [daysRemaining, setDaysRemaining] = useState(0)
    const photoSpace = photoSpaceStore(state => state.photoSpace)

    useEffect(() => {
        if (photoSpace) {
            getPublicSpaceStats()
        }
    }, [photoSpace])

    useEffect(() => {

        if (deadline) {
            const timeDifference = new Date(deadline).getTime() - new Date().getTime()
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
            setDaysRemaining(daysDifference)
        }
    }, [deadline])


    const getPublicSpaceStats = async () => {
        const groupStats = await getPublicGroupStats(photoSpace!._id!)
    }
    return (
        <Card className=" flex flex-wrap lg:flex-nowrap h-full p-5 gap-3">
            <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <Users className="text-green-500" size={32} />
                <div className="text-xl font-semibold">
                    {/* Gotta include the group admin */}
                    {members + 1}
                </div>
                <div className="text-xs text-muted-foreground">
                    Members
                </div>
            </Card>
            <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <TreePine className="text-green-500" size={32} />
                <div className="text-xl font-semibold">
                    {trees}
                </div>
                <div className="text-xs text-muted-foreground">
                    Planted
                </div>
            </Card>
            <Card className="w-20 p-2 bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <CircularProgressbar value={completion} text={`${completion}%`} styles={buildStyles({ pathColor: "#22c55e", textColor: "#22c55e" })} />
                <div className="text-xs text-muted-foreground">
                    Complete
                </div>
            </Card>
            {
                deadline &&
                <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                    <Calendar className="text-green-500" size={32} />
                    <div className="text-xl font-semibold text-foreground">
                        {daysRemaining}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Remaining
                    </div>
                </Card>
            }
        </Card>
    )
}
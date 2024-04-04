import { Card } from "@/components/ui/card";
import { IUpload } from "@/lib/types";
import { Calendar, TreePine, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function GeneralStats({ uploads, members, target, deadline }: { uploads?: IUpload[], members: number, target?: number, deadline?: Date }) {
    const [treesCount, setTreesCount] = useState(0)
    const [completion, setCompletion] = useState(0)
    const [daysRemaining, setDaysRemaining] = useState(0)

    useEffect(() => {
        const calculateTreesCount = () => {
            return uploads?.reduce((acc, curr) => (acc + curr.trees! || 0), 0) || 0
        }
        const calculateCompletion = (treesCount: number) => {
            return Math.ceil((treesCount / target!) * 100)
        }


        if (deadline) {
            const timeDifference = new Date(deadline).getTime() - new Date().getTime()
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
            setDaysRemaining(daysDifference)
        }
        const trees = calculateTreesCount()
        setCompletion(calculateCompletion(trees))
        setTreesCount(trees)
    }, [uploads, target, deadline])


    return (
        <Card className=" flex flex-wrap lg:flex-nowrap h-full p-5 gap-3">
            <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <Users className="text-green-500" size={32} />
                <div className="text-xl font-semibold">
                    {members}
                </div>
                <div className="text-xs text-muted-foreground">
                    Members
                </div>
            </Card>
            <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <TreePine className="text-green-500" size={32} />
                <div className="text-xl font-semibold">
                    {treesCount}
                </div>
                <div className="text-xs text-muted-foreground">
                    Planted
                </div>
            </Card>
            {
                target &&
                <Card className="w-20 p-2 bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                    <CircularProgressbar value={completion} text={`${completion}%`} styles={buildStyles({ pathColor: "#22c55e", textColor: "#22c55e" })} />
                    <div className="text-xs text-muted-foreground">
                        Complete
                    </div>
                </Card>
            }
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
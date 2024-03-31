import { Card } from "@/components/ui/card";
import { Calendar, TreePine, Users } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function GeneralStats({ trees, members, completion, daysRemaining }: { trees: number, members: number, completion: number, daysRemaining: number }) {
    return (
        <Card className=" flex flex-wrap lg:flex-nowrap h-full p-5 gap-3">
            <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <Users className="text-green-500" size={32} />
                <div className="text-xl font-semibold">
                    {trees}
                </div>
                <div className="text-xs text-muted-foreground">
                    Members
                </div>
            </Card>
            <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <TreePine className="text-green-500" size={32} />
                <div className="text-xl font-semibold">
                    {members}
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
            <Card className="w-20 p-2 h-full bg-green-50 dark:bg-background flex flex-col items-center justify-center rounded-md">
                <Calendar className="text-green-500" size={32} />
                <div className="text-xl font-semibold text-foreground">
                    {daysRemaining}
                </div>
                <div className="text-xs text-muted-foreground">
                    Remaining
                </div>
            </Card>
        </Card>
    )
}
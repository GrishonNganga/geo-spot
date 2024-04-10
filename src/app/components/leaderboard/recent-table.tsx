import LeaderboardCard from "./card"

export default function RecentTable() {
    return (
        <div className="w-full lg:w-1/2 flex flex-col mt-5 rounded-md">
            {
                Array(5).fill(0).map(l => {
                    return (
                        <LeaderboardCard />
                    )
                })
            }
        </div>
    )
}
'use client'

import { useState } from "react";
import RecentTable from "./recent-table";
import MostTreesTable from "./most-trees-table";
import Tabs from "./tabs";
import Title from "./title";

export default function Page() {
    const [leaderboardList, setLeaserboardList] = useState("recent")

    return (
        <section className="container w-full flex flex-col items-center gap-y-5 pb-20">
            <Title />
            <Tabs selectedTab={leaderboardList} setSelectedTab={setLeaserboardList} />
            {
                leaderboardList === "most-trees" &&
                <MostTreesTable />
            }
            {
                leaderboardList === "recent" &&
                <RecentTable />
            }

        </section>
    )
}

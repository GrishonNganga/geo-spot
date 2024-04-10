import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LeaderboardTabsProps = {
    selectedTab: string,
    setSelectedTab: (selectedTab: string) => void
}
export default function LeaderboardTabs({ selectedTab, setSelectedTab }: LeaderboardTabsProps) {
    return (
        <div>
            <Tabs defaultValue={selectedTab} className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recent" onClick={() => { setSelectedTab("recent") }}>Recent</TabsTrigger>
                    <TabsTrigger value="most-trees" onClick={() => { setSelectedTab("most-trees") }}>Most trees</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}
import { getData } from "@/lib/actions";
import WorkspacesTable from "../components/dashboard/workspaces-table";

export default async function Page() {
    const data = await getData()
    return (
        <div className="lg:container">
            <WorkspacesTable data={data}/>
        </div>
    )
}
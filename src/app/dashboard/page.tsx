import { getLoggedInUser } from "@/lib/actions";
import PhotoSpacesTable from "../components/dashboard/photospaces-table";


export default async function Page() {
    return (
        <div className="lg:container">
            <PhotoSpacesTable />
        </div>
    )
}
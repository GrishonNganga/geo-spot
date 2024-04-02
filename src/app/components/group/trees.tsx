import { IUpload } from "@/lib/types";
import TreesTable from "./trees-table";

export default function Trees({ uploads }: { uploads?: IUpload[] }) {
    return (
        <TreesTable uploads={uploads} />
    )
}
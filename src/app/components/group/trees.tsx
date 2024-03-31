import TreesTable from "./trees-table";

export default function Members({ invitations }: { invitations?: String[] }) {
    return (
        <TreesTable invitations={invitations} />
    )
}
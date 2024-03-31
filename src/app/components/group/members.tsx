import MembersTable from "./members-table";

export default function Members({ invitations }: { invitations?: String[] }) {
    return (
        <MembersTable invitations={invitations} />
    )
}
import { getSession } from "@/lib/actions"

export default async function Page() {
    const session = await getSession()
    
    return (
        <div>

        </div>
    )
}
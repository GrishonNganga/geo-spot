import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { Authenticated, UnAuthenticated } from "../components/signup"
export default async function Page() {
    const session = await getUserSession()
    if (session) {
        return (
            <Authenticated session={session} />
        )
    } else {
        return (
            <UnAuthenticated />
        )
    }
}

const getUserSession = async () => {
    const session = await getServerSession(authOptions)
    return session
}
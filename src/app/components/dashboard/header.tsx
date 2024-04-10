import Nav from "@/app/components/header/nav"
import UserDropDown from "@/app/components/header/user-dropdown"
import Logo from "@/app/components/header/logo"
import { getSession } from "@/lib/actions"
import { redirect } from "next/navigation"

export default async function Header() {
    const session = await getSession()
    if (!session) {
        return redirect('/signup')
    }
    return (
        <Nav>
            <Logo />
            <UserDropDown session={session} />
        </Nav>
    )
}
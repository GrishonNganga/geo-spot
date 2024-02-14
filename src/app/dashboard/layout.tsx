import Nav from "@/app/components/landing-page/nav"
import UserDropDown from "@/app/components/dashboard/user-dropdown"
import { getSession } from "@/lib/actions"
import { redirect } from "next/navigation"
import Logo from "../components/landing-page/logo"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getSession()
    if (!session) {
        return redirect('/signup')
    }
    return (
        <div className="container">
            <Nav>
                <Logo />
                <UserDropDown session={session} />
            </Nav>
            {children}
        </div>
    )
}
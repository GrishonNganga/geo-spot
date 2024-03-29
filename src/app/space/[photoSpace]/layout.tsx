import {  getSession } from "@/lib/actions"

import Nav from "@/app/components/landing-page/nav"
import UserDropDown from "@/app/components/dashboard/user-dropdown"
import NavMenu from "@/app/components/photoSpace/nav-menu"

interface Props {
    children: JSX.Element,
    params: { photoSpace: string }
}

export default async function Layout({ params, children }: Props) {
    const session = await getSession()
    return (
        <div className="w-full h-dvh relative">
            {children}
            <div className="absolute w-full top-0 px-3 z-100">
                <Nav>
                    <NavMenu />
                    <UserDropDown session={session} />
                </Nav>
            </div>
        </div>
    )
}

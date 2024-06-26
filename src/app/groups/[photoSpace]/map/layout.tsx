import { getSession } from "@/lib/actions"

import Nav from "@/app/components/header/nav"
import UserDropDown from "@/app/components/header/user-dropdown"
import NavMenu from "@/app/components/map/nav-menu"

type Props = {
    children: JSX.Element,
    params: { photoSpace: string }
}

export default async function Layout({ params, children }: Props) {
    const session = await getSession()
    return (
        <div className="w-full h-dvh relative">
            {children}
        </div>
    )
}

import { findPhotoSpace } from "@/lib/database/photospace"
import Page from "./page"
import { getLoggedInUser, getSession } from "@/lib/actions"
import { redirect } from "next/navigation"
import Nav from "@/app/components/landing-page/nav"
import UserDropDown from "@/app/components/dashboard/user-dropdown"
import { MenuIcon } from "lucide-react"
import NavMenu from "@/app/components/landing-page/nav-menu"

export default async function Layout({ params, children }: { children: React.ReactNode, params: { photoSpace: string } }) {
    const photoSpaceId = params?.photoSpace
    const session = await getSession()
    const loggedInUser = await getLoggedInUser()
    const photoSpace = JSON.parse(JSON.stringify(await getPhotoSpaceBySpaceId(photoSpaceId)))
    if (!photoSpace) {
        return redirect('/404')
    }
    const isOwner = (userId: String) => {
        if (photoSpace.ownerId._id.toString() !== userId) {
            return false
        }
        return true
    }
    const hasAccess = (userId: String) => {
        return false
    }

    if (!isOwner(loggedInUser._id.toString()) || hasAccess(loggedInUser._id.toString())) {
        // TODO: Work on hasAccess() check once that feature is done.
        return redirect('/403')
    }

    return (
        <div className="w-full h-dvh relative">
            <Page photoSpace={photoSpace} />
            <div className="absolute w-full top-0 px-3 z-100">
                <Nav>
                    <NavMenu photoSpace={photoSpace} />
                    <UserDropDown session={session} />
                </Nav>
            </div>
        </div>
    )
}

const getPhotoSpaceBySpaceId = async (id: String) => {
    return await findPhotoSpace({ spaceId: id })
}


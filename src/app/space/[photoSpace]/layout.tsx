import { findPhotoSpace } from "@/lib/database/photospace"
import Page from "./page"
import { getLoggedInUser, getSession } from "@/lib/actions"
import { redirect } from "next/navigation"
import Nav from "@/app/components/landing-page/nav"
import UserDropDown from "@/app/components/dashboard/user-dropdown"
import NavMenu from "@/app/components/photoSpace/nav-menu"

export default async function Layout({ params }: { params: { photoSpace: string } }) {
    const photoSpaceId = params?.photoSpace
    const session = await getSession()
    const loggedInUser = await getLoggedInUser()
    if (!loggedInUser) {
        return redirect('/')
    }
    const photoSpace = JSON.parse(JSON.stringify(await getPhotoSpaceBySpaceId(photoSpaceId)))
    console.log("photo space", photoSpace)
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
        if (!photoSpace.access) {
            return true
        }
        return photoSpace.invitations.includes(loggedInUser.email)
    }

    if (!hasAccess(loggedInUser._id.toString()) && !isOwner(loggedInUser._id.toString())) {
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



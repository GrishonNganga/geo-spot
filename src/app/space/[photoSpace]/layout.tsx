import { getSession } from "@/lib/actions"

import Nav from "@/app/components/landing-page/nav"
import UserDropDown from "@/app/components/dashboard/user-dropdown"
import NavMenu from "@/app/components/photoSpace/nav-menu"
import { Metadata } from "next"
import { cache } from "react"
import { findPhotoSpace } from "@/lib/database/photospace"
import { IPhotoSpace } from "@/lib/types"

interface Props {
    children: JSX.Element,
    params: { photoSpace: string }
}


export async function generateMetadata({ params }: {
    params: { photoSpace: string }
}): Promise<Metadata> {
    const photoSpaceId = params?.photoSpace
    const photoSpace: IPhotoSpace = await getPhotoSpaceBySpaceId(photoSpaceId)
    console.log("PS")
    return {
        title: photoSpace.name,
        icons: "/icon.svg",
        description: photoSpace.description
    }
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


const getPhotoSpaceBySpaceId = cache(async (id: String) => {
    return JSON.parse(JSON.stringify(await findPhotoSpace({ spaceId: id })))
})

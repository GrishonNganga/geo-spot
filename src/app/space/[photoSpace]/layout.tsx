import Nav from "@/app/components/landing-page/nav"
import UserDropDown from "@/app/components/dashboard/user-dropdown"
import { getSession } from "@/lib/actions"
import { redirect } from "next/navigation"
import Logo from "@/app/components/landing-page/logo"
import { IPhotoSpace } from "@/lib/types"
import { findPhotoSpace } from "@/lib/database/photospace"
import { cache } from "react"
import { Metadata } from "next"

type Props = {
    children: JSX.Element,
    params: { photoSpace: string }
}

export async function generateMetadata({ params }: {
    params: { photoSpace: string }
}): Promise<Metadata> {
    const photoSpaceId = params?.photoSpace
    const photoSpace: IPhotoSpace = await getPhotoSpaceBySpaceId(photoSpaceId)
    return {
        title: photoSpace.name,
        icons: "/icon.svg",
        description: photoSpace.description
    }
}

export default async function Layout({ params, children }: Props) {
    const session = await getSession()

    return (
        <div>
            <div className="container">
                <Nav>
                    <Logo />
                    <UserDropDown session={session} />
                </Nav>
            </div>
            {children}
        </div>
    )
}

const getPhotoSpaceBySpaceId = cache(async (id: String) => {
    return JSON.parse(JSON.stringify(await findPhotoSpace({ spaceId: id })))
})

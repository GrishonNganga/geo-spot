import UserDropDown from "@/app/components/header/user-dropdown"
import Logo from "@/app/components/header/logo"
import Nav from "@/app/components/header/nav"
import { getSession } from "@/lib/actions"
import { findPhotoSpace } from "@/lib/database/photospace"
import { IPhotoSpace } from "@/lib/types"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { cache } from "react"

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
        title: photoSpace?.name,
        icons: "/icon.svg",
        description: photoSpace?.description
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

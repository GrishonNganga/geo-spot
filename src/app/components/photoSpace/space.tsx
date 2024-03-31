import { findPhotoSpace } from "@/lib/database/photospace"
import { getLoggedInUser } from "@/lib/actions"
import { redirect } from "next/navigation"

import { IPhotoSpace } from "@/lib/types";
import SpaceContainer from "./space-container";
import { cache } from "react";
import { Metadata } from "next";

export default async function MapHolder({ params }: {
    params: { photoSpace: string }
}) {
    const photoSpaceId = params?.photoSpace
    const loggedInUser = await getLoggedInUser()
    const photoSpace: IPhotoSpace = await getPhotoSpaceBySpaceId(photoSpaceId)
    if (!photoSpace) {
        return redirect('/404')
    }
    const isOwner = (userId: String) => {
        if (photoSpace!.ownerId!._id!.toString() !== userId) {
            return false
        }
        return true
    }
    const hasAccess = (userId?: String) => {
        if (!photoSpace.access) {
            return true
        }
        return photoSpace?.invitations?.includes(loggedInUser.email)
    }

    if (!hasAccess(loggedInUser?._id?.toString()) && !isOwner(loggedInUser?._id?.toString())) {
        return redirect('/403')
    }

    return (
        <SpaceContainer photoSpace={photoSpace} />
    )
}

export async function generateMetadata({ params }: {
    params: { photoSpace: string }
}): Promise<Metadata> {
    const photoSpaceId = params?.photoSpace
    const photoSpace: IPhotoSpace = await getPhotoSpaceBySpaceId(photoSpaceId)
    console.log("PS")
    return {
        title: photoSpace.name,
        description: photoSpace.description
    }
}

const getPhotoSpaceBySpaceId = cache(async (id: String) => {
    return JSON.parse(JSON.stringify(await findPhotoSpace({ spaceId: id })))
})

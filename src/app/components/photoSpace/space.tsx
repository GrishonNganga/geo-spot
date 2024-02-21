import { findPhotoSpace } from "@/lib/database/photospace"
import { getLoggedInUser, getSession } from "@/lib/actions"
import { redirect } from "next/navigation"

import { IPhotoSpace } from "@/lib/types";
import SpaceContainer from "./space-container";

export default async function MapHolder({ params }: {
    params: { photoSpace: string }
}) {
    const photoSpaceId = params?.photoSpace
    const loggedInUser = await getLoggedInUser()
    const photoSpace: IPhotoSpace = JSON.parse(JSON.stringify(await getPhotoSpaceBySpaceId(photoSpaceId)))
    if (!photoSpace) {
        return redirect('/404')
    }
    const isOwner = (userId: String) => {
        if (photoSpace?.ownerId?._id.toString() !== userId) {
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
        // TODO: Work on hasAccess() check once that feature is done.
        return redirect('/403')
    }

    return (
        <SpaceContainer photoSpace={photoSpace} />
    )
}


const getPhotoSpaceBySpaceId = async (id: String) => {
    return await findPhotoSpace({ spaceId: id })
}

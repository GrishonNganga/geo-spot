import { getLoggedInUser } from "@/lib/actions";
import { findPhotoSpace } from "@/lib/database/photospace";
import { IPhotoSpace } from "@/lib/types";
import { redirect } from "next/navigation";
import { cache } from "react";
import SpaceContainer from "./space-container";

export default async function Space({ params }: { params: { photoSpace: string } }) {
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

const getPhotoSpaceBySpaceId = cache(async (id: String) => {
    return JSON.parse(JSON.stringify(await findPhotoSpace({ spaceId: id })))
})
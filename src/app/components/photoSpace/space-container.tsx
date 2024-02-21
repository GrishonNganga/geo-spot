'use client'
import { IPhotoSpace } from "@/lib/types";
import Map from "@/app/components/photoSpace/map";
import { photoSpaceStore } from "@/store";
import { useEffect } from "react";

export default function SpaceContainer({ photoSpace }: { photoSpace: IPhotoSpace }) {
    const setPhotoSpace = photoSpaceStore(state => state.setPhotoSpace)
    useEffect(() => {
        setPhotoSpace(photoSpace)
    }, [photoSpace, setPhotoSpace])

    return (
        <Map uploads={photoSpace.uploads} />

    )
}
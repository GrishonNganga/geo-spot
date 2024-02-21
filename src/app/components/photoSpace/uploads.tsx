import { IUpload, IUser } from "@/lib/types";
import UploadCard from "./upload-card";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Uploads({ uploads, owner, user, addPhotos }: { uploads: IUpload[], owner: IUser, user: IUser, addPhotos: (status: boolean) => void }) {

    const aggregateUploads = () => {
        const groupedUploads = uploads.reduce((acc, curr) => {
            const userId = curr.userId._id;
            if (acc[userId]) {
                acc[userId].photos.push(...(curr.photos ? curr.photos : []));
            } else {
                acc[userId] = { _id: curr._id, userId: curr.userId, photos: [...(curr.photos ? curr.photos : [])] };
            }
            return acc;
        }, {});
        return Object.keys(groupedUploads).map(id => {
            const userId = groupedUploads[id].userId
            const photos = groupedUploads[id].photos
            const _id = groupedUploads[id]._id
            return { userId, photos, _id }
        })
    }
    const aggregatedUploads = useMemo(() => aggregateUploads(), [uploads])
    const handleAddPhotos = useCallback(() => addPhotos(true), [addPhotos]);

    return (
        <>
            {
                !aggregatedUploads.find(upload => upload.userId._id === user._id) &&
                <>
                    <UploadCard name={`${user.name} (me)`} photos={[]} showAddPhotosButton={false} addPhotos={handleAddPhotos} />
                    <Separator />
                </>

            }
            {
                aggregatedUploads.map((upload: IUpload, idx: number) => {
                    return (
                        <div key={idx}>
                            <UploadCard uploadId={upload._id} name={`${upload?.userId?.name} ${upload.userId._id === user._id ? "(me)" : ""}`} photos={upload.photos?.map(p => p.url) || []} showAddPhotosButton={user._id === upload.userId._id} addPhotos={handleAddPhotos} />
                            <Separator />
                        </div>
                    )
                })
            }
        </>
    )
}
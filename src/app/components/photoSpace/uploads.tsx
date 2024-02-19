import { IUpload, IUser } from "@/lib/types";
import UploadCard from "./upload-card";
import { Separator } from "@/components/ui/separator";

export default function Uploads({ uploads, owner, user, addPhotos }: { uploads: IUpload[], owner: IUser, user: IUser, addPhotos: (status: boolean) => void }) {

    return (
        <>
            {
                !uploads.find(upload => upload.userId._id === user._id) &&
                <>
                    <UploadCard name={`${user.name} (me)`} photos={[]} showAddPhotosButton={false} addPhotos={() => { addPhotos(true) }} />
                    <Separator />
                </>

            }
            {
                uploads.map((upload: IUpload) => {
                    return (
                        <>
                            <UploadCard name={`${upload?.userId?.name} ${upload.userId._id === user._id && "(me)"}`} photos={upload.photos?.map(p => p.url) || []} showAddPhotosButton={user._id === owner._id} addPhotos={() => { addPhotos(true) }} />
                            <Separator />
                        </>
                    )
                })
            }
        </>
    )
}
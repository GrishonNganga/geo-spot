import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { IPhotoSpace, IUpload, IUser } from "@/lib/types"
import { photoStore } from "@/store"
import { ObjectId } from "mongoose"
import Image from "next/image"

export default function UploadCard({ uploadId, name, photos, showAddPhotosButton, addPhotos }: { uploadId?: ObjectId, name: String, photos: String[], showAddPhotosButton: boolean, addPhotos: () => void }) {
    const setOpen = photoStore(state => state.setOpen)
    const open = photoStore(state => state.open)
    return (
        <div className="w-full shadow rounded-md border p-3">
            <CardTitle className="text-base border-b pb-2">{name}</CardTitle>
            <div className="flex gap-3 flex-wrap mt-3 items-center">
                {
                    photos.map((photo, idx) => {
                        return (
                            <div key={idx} onClick={() => { console.log("Clicked", idx); setOpen(`${uploadId},${idx}`) }}>
                                <Image src={photo as string} width={100} height={100} className="rounded w-16 h-16 object-cover" alt="photo" />
                            </div>
                        )
                    })
                }
                {showAddPhotosButton &&
                    <Button variant={"outline"} onClick={addPhotos}>
                        Add photos
                    </Button>
                }
                {photos.length == 0 &&
                    <div className="w-full flex flex-col items-center gap-y-5">
                        <div className="">No photos added</div>
                        <div>
                            <Button variant={"outline"} onClick={addPhotos}>
                                Add photos
                            </Button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}
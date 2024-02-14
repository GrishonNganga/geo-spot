import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function UploadCard({ name, photos }: { name: String, photos?: String[] }) {
    return (
        <div className="w-full shadow rounded-md border p-3">
            <CardTitle className="text-base border-b pb-2">{name}</CardTitle>
            <div className="flex gap-3 flex-wrap mt-3">
                {
                    photos && photos.length > 0 && photos.map((photo, idx) => {
                        return (
                            <div key={idx}>
                                <Image src="/photos-on-map.png" width={100} height={100} className="rounded w-16 h-16 object-cover" alt="photo" />
                            </div>
                        )
                    })
                    ||
                    <div className="w-full flex flex-col items-center gap-y-5">
                        <div className="">No photos added</div>
                        <div>
                            <Button variant={"outline"}>
                                Add photos
                            </Button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}
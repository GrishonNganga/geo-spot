import { findPhotoSpace, getPhotoSpace } from "@/lib/database/photospace"
import NewEvent from "./new-event"

export default async function NewEventContainer({ params }: { params: { photoSpace: string } }) {
    const ps = await pullPhotoSpace(params.photoSpace)
    return (
        <>
            <NewEvent group={ps} />
        </>
    )
}



const pullPhotoSpace = async (spaceId: String) => {
    const group = await findPhotoSpace({ spaceId: spaceId })
    return JSON.parse(JSON.stringify(group))

}
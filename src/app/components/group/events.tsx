import getGroupEventsAction from "@/lib/actions"
import { photoSpaceStore } from "@/store"
import { useEffect } from "react"

export default function Events() {
    const photoSpace = photoSpaceStore(state => state.photoSpace)
    useEffect(() => {
        const getGroupEvents = async () => {
            const events = await getGroupEventsAction(photoSpace?._id!)
            console.log("EV", events)
        }
        if (photoSpace) {
            getGroupEvents()
        }
    }, [photoSpace])
    return (
        <div>

        </div>
    )
}
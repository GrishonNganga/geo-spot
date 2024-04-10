import { useEffect, useState } from "react"
import { getData, getLoggedInUser } from "@/lib/actions"
import { IPhotoSpace } from "@/lib/types"

export const useFetchGroups = () => {
    const [groups, setGroups] = useState<IPhotoSpace[]>([])
    const [loading, setLoading] = useState(false)

    const pullData = async () => {
        setLoading(true)
        const user = await getLoggedInUser()
        const d = await getData(user._id)
        setLoading(false)
        setGroups(d)
    }

    useEffect(() => {
        pullData()
    }, []);

    return { groups, loading }
}
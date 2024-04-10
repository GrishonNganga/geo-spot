import { IPhotoSpace } from "@/lib/types"
import { useState } from "react"

export const usePhotoSpace = () => {
    const [photoSpaceDetails, setPhotoSpaceDetails] = useState<IPhotoSpace>({
        name: "",
        description: "",
        target: undefined,
        deadline: undefined,
        access: true,
    })
    const [loading, setLoading] = useState(false)
    return { photoSpaceDetails, setPhotoSpaceDetails, loading, setLoading }
}
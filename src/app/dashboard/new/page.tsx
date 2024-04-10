'use client'

import { createPhotoSpaceAction } from "@/lib/actions"
import { validateCreatePhotoSpace } from "@/lib/validations"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import PhotoSpaceForm from "@/app/components/new-group/photoSpaceForm"
import { usePhotoSpace } from "@/app/components/new-group/hooks/usePhotoSpace"

export default function Page() {
    const router = useRouter()
    const { photoSpaceDetails, setPhotoSpaceDetails, loading, setLoading } = usePhotoSpace()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        const { status, message } = await validateCreatePhotoSpace(photoSpaceDetails)

        if (!status) {
            setLoading(false)
            toast.error("Error creating group", {
                description: message,
            })
            return
        }
        const response = await createPhotoSpaceAction(photoSpaceDetails)
        setLoading(false)
        if (!response.status) {
            toast.error("Error creating Photospace", {
                description: response.message,
            })
        }
        if (response.status) {
            toast.success("Tree planting group created successfully", {
                description: response.message,
            })
            setTimeout(() => {
                router.push(`/groups/${response.data.spaceId}`)
            }, 500)
        }
    }

    return (
        <PhotoSpaceForm
            photoSpaceDetails={photoSpaceDetails}
            setPhotoSpaceDetails={setPhotoSpaceDetails}
            handleSubmit={handleSubmit}
            loading={loading}
        />
    )
}
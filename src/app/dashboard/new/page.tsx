'use client'

import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import Link from "next/link"
import { createPhotoSpaceAction } from "@/lib/actions"
import { validateCreatePhotoSpace } from "@/lib/validations"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Page() {
    const [photoSpaceDetails, setPhotoSpaceDetails] = useState({
        name: "",
        access: false,
    })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("p", photoSpaceDetails)
        const { status, message } = await validateCreatePhotoSpace(photoSpaceDetails)

        if (!status) {
            toast.error("Error signing up", {
                description: message,
            })
            return
        }
        const response = await createPhotoSpaceAction(photoSpaceDetails)
        if (!response.status) {
            toast.error("Error creating Photospace", {
                description: response.message,
            })
        }
        if (response.status) {
            toast.success("Photo Space created successfully", {
                description: response.message,
            })
            setTimeout(() => {
                router.push(`/space/${response.data.spaceId}`)
            }, 2500)
        }
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl">New Photospace</CardTitle>
                <CardDescription>Explore your memories with you friends.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="flex flex-col gap-y-4">
                    <div>
                        <Label htmlFor="name">Workspace name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name of workspace"
                            autoComplete="off"
                            onChange={(e) => { setPhotoSpaceDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                        />

                    </div>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="access">Private</Label>
                        <Switch
                            id="access"
                            checked={photoSpaceDetails.access}
                            onCheckedChange={(e) => { setPhotoSpaceDetails(prevState => ({ ...prevState, access: !prevState.access })) }}
                        />
                    </div>
                </CardContent>
                <div className="flex justify-end p-3 gap-x-3">
                    <div>
                        <Button>
                            Create
                        </Button>
                    </div>
                    <div>
                        <Button asChild variant={"secondary"}>
                            <Link href={"/dashboard"}>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
    )
}
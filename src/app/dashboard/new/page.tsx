'use client'

import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileIcon, XIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import Link from "next/link"
import { createPhotoSpaceAction } from "@/lib/actions"
import { validateCreatePhotoSpace } from "@/lib/validations"
import { toast } from "sonner"
import { redirect, useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid';

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
                {/* <CardContent className="flex flex-col gap-4">
                <div className="border border-dashed rounded-lg border-gray-200/40 border-gray-800 dark:border-gray-200">
                    <div className="h-[300px] grid w-full items-center text-center gap-0">
                        <div className="flex flex-col justify-between gap-y-5">
                            <div>
                                <FileIcon className="mx-auto w-12 h-12 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Drag and drop your files here or &nbsp;
                                    <Button size="sm" variant="outline">
                                        Browse
                                    </Button>
                                </p>
                                <p className="text-sm text-gray-500 mt-2">JPEG, PNG, GIF. Max file size 10MB.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <ul className="flex flex-col gap-4">
                        <li className="flex items-center space-x-2">
                            <FileIcon className="w-20 h-20 text-gray-500 dark:text-gray-400" />
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">photo1.jpg</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">4.5MB | Expires in 3 days</p>
                            </div>
                            <Button className="ml-auto" size="icon">
                                <XIcon className="w-4 h-4" />
                                <span className="sr-only">Remove</span>
                            </Button>
                        </li>
                        <li className="flex items-center space-x-2">
                            <FileIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">photo2.jpg</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">2.1MB | Expires in 3 days</p>
                            </div>
                            <Button className="ml-auto" size="icon">
                                <XIcon className="w-4 h-4" />
                                <span className="sr-only">Remove</span>
                            </Button>
                        </li>
                    </ul>
                </div>
            </CardContent> */}
                <div className="flex justify-end p-3 gap-x-3">
                    <div>
                        <Button onClick={handleSubmit}>
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
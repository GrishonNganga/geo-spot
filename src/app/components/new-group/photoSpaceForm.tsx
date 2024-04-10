'use client'

import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import { format } from "date-fns"
import { IPhotoSpace } from "@/lib/types"

export default function PhotoSpaceForm({ photoSpaceDetails, setPhotoSpaceDetails, handleSubmit, loading }: { photoSpaceDetails: IPhotoSpace, setPhotoSpaceDetails: (ps: IPhotoSpace) => void, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, loading: boolean }) {

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl">New Group</CardTitle>
                <CardDescription>A space for you and your friends to plant trees together.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="What is the name of your tree planting group"
                            autoComplete="off"
                            onChange={(e) => { setPhotoSpaceDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value })) }}
                        />

                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="name"
                            name="description"
                            placeholder="Tell us a bit about your group"
                            autoComplete="off"
                            onChange={(e) => { setPhotoSpaceDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                        />

                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Target <span className="text-xs">(optional)</span></Label>
                        <Input
                            id="target"
                            type="number"
                            min="0"
                            step="1"
                            name="target"
                            placeholder="How many trees to be planted"
                            autoComplete="off"
                            onChange={(e) => { setPhotoSpaceDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Deadline <span className="text-xs">(optional)</span></Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !photoSpaceDetails.deadline && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {photoSpaceDetails.deadline ? format(photoSpaceDetails.deadline, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={photoSpaceDetails.deadline}
                                    onSelect={(e) => { setPhotoSpaceDetails(prevState => ({ ...prevState, "deadline": e })) }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="access">Privacy</Label>
                        <CardDescription>Anyone can join this group</CardDescription>
                        <Switch
                            id="access"
                            checked={photoSpaceDetails.access}
                            onCheckedChange={(e) => { setPhotoSpaceDetails(prevState => ({ ...prevState, access: !prevState.access })) }}
                        />
                    </div>
                </CardContent>
                <div className="flex justify-end p-3 gap-x-3">
                    <div>
                        <Button disabled={loading}>
                            Create
                        </Button>
                    </div>
                    <div>
                        <Link href={"/dashboard"}>
                            <Button asChild variant={"secondary"}>
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
        </Card>
    )
}
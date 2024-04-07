import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getGroupEventsAction } from "@/lib/actions"
import { IEvent } from "@/lib/types"
import { eventStore, photoSpaceStore } from "@/store"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const queryOptions = {
    upcoming: {
        $gte: new Date()
    },
    past: {
        $lt: new Date()
    }
}

export default function Events() {
    const [events, setEvents] = useState([])
    const [someAttendees, setSomeAttendees] = useState([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState<string>("upcoming")

    const photoSpace = photoSpaceStore(state => state.photoSpace)
    const setEvent = eventStore(state => state.setEvent)


    useEffect(() => {
        const getGroupEvents = async () => {
            setLoading(true)
            const response = await getGroupEventsAction(photoSpace?._id!, { key: 'date', value: queryOptions[query as keyof typeof queryOptions] })
            setLoading(false)
            setEvents(response.events)
        }
        if (photoSpace) {
            getGroupEvents()
        }
    }, [photoSpace, query])

    if (loading) {
        return (
            <Skeleton />
        )
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <CardTitle>
                    Events
                </CardTitle>
                <Tabs defaultValue={`${query}`} className="">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upcoming" onClick={() => { setQuery("upcoming") }}>Upcoming</TabsTrigger>
                        <TabsTrigger value="past" onClick={() => { setQuery("past") }}>Past</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {
                events.length > 0 &&
                events.map((event: IEvent) => {
                    return (
                        <Link href={`/space/${photoSpace?.spaceId}/events/${event._id}`} onClick={() => { setEvent(event) }} className="w-full flex gap-x-2 border border-transparent hover:border-primary rounded-md p-3 relative bg-accent/20 ease-in-out duration-500 cursor-pointer">
                            <div className="flex flex-col grow h-full">
                                <div className="flex gap-x-3">
                                    <div className="hidden lg:flex justify-end h-full">
                                        <div className="uppercase bg-green-50 dark:bg-background dark:border px-2 text-xs h-full">
                                            <div>
                                                {new Date(event.date)?.toLocaleString('en-us', { weekday: 'short' })}
                                            </div>
                                            <div className="text-xl font-semibold text-foreground">
                                                {new Date(event.date).getDate()}
                                            </div>
                                            <div>
                                                {new Date(event.date)?.toLocaleString('en-us', { month: 'short' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-3 h-full">
                                        <div className="text-xl">
                                            {event.name}
                                        </div>
                                        <div className="flex flex-col gap-y-2  text-muted-foreground">
                                            <div className="flex gap-x-2 items-center">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={event.photo as string} />
                                                    <AvatarFallback>GN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    By {event.owner?.name}
                                                </div>
                                            </div>
                                            <div className="flex gap-x-2 items-center text-xs">
                                                <MapPin size={16} />
                                                <div>
                                                    {event.location?.location}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-4">
                                            <div className="text-green-500">
                                                {event.price ? <span>KES {event.price}</span> : <span>Free</span>}
                                            </div>
                                            <div className="flex items-center">
                                                {
                                                    [1, 2, 3, 4, 5].map((l, idx) => {
                                                        return (
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Avatar className={`w-6 h-6 z-30 shadow-md border ${idx !== 0 && "-ml-2.5"}`}>
                                                                            <AvatarImage src={event.photo as string} className="object-cover" />
                                                                            <AvatarFallback className={`cursor-pointer text-xs`}>
                                                                                GN
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <div className="">
                                                                            Grishon Nganga
                                                                        </div>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )
                                                    })
                                                }
                                                <div className={`h-6 z-30 shadow-md -ml-2.5 bg-background rounded-full flex items-center px-1 border`}>
                                                    <div className={`cursor-pointer text-xs`}>
                                                        +197
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="w-[30%] lg:w-[20%] flex flex-col">
                                <div className=" aspect-square">
                                    <div>
                                        <Image src={event.photo as string} width={200} height={200} alt={`${event.name} poster`} className="aspect-square object-cover rounded-md" />
                                    </div>
                                </div>
                                <div className="flex lg:hidden justify-end mt-3">
                                    <div className="uppercase bg-green-50 dark:bg-background dark:border px-2 text-xs">
                                        <div>
                                            {new Date(event.date)?.toLocaleString('en-us', { weekday: 'short' })}
                                        </div>
                                        <div className="text-xl font-semibold text-foreground">
                                            {new Date(event.date).getDay()}
                                        </div>
                                        <div>
                                            {new Date(event.date)?.toLocaleString('en-us', { month: 'short' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

const Skeleton = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <div className="w-32 h-8 bg-accent/40 animate-pulse rounded">

                </div>
                <div className="w-32 h-8 bg-accent/40 animate-pulse rounded-md">

                </div>
            </div>
            {
                new Array(5).fill(0).map(l => {
                    return (
                        <div className="w-full flex gap-x-2 border border-transparent rounded-md p-3 relative bg-accent/20 ease-in-out duration-500 cursor-pointer">
                            <div className="flex flex-col grow h-full">
                                <div className="flex gap-x-3">
                                    <div className="hidden lg:flex justify-end h-full">
                                        <div className="bg-accent/40 w-12 h-16">

                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-3 h-full">
                                        <div className="w-36 h-6 bg-accent/40 rounded-md">

                                        </div>
                                        <div className="flex flex-col gap-y-2  text-muted-foreground">
                                            <div className="flex gap-x-2 items-center">
                                                <div className="w-6 h-6 rounded-full bg-accent/40 animate-pulse">

                                                </div>
                                                <div className="w-32 h-4 bg-accent/40 animate-pulse rounded-md">

                                                </div>
                                            </div>
                                            <div className="flex gap-x-2 items-center">
                                                <div className="w-6 h-6 rounded-full bg-accent/40 animate-pulse">

                                                </div>
                                                <div className="w-32 h-4 bg-accent/40 rounded-md animate-pulse">

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-4">
                                            <div className="w-12 h-4 bg-accent/40 rounded-md animate-pulse">
                                            </div>
                                            <div className="flex items-center w-32 h-4 bg-accent/40 rounded-md">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="w-[30%] lg:w-[20%] flex flex-col">
                                <div className=" aspect-square">
                                    <div className="w-full h-full bg-accent/40 animate pulse rounded-md">
                                    </div>
                                </div>
                                <div className="flex lg:hidden justify-end mt-3">
                                    <div className="bg-accent/40 w-12 h-16 rounded">

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
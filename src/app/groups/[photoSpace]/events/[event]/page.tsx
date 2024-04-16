'use client'
import PaymentModal from "@/app/components/event/payment-modal"
import MyMap from "@/app/components/map/map"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getEventAction } from "@/lib/actions"
import { IPhotoSpace, IUser } from "@/lib/types"
import { eventStore } from "@/store"
import { format } from "date-fns"
import { ArrowUpRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { event: string } }) {
    const [loading, setLoading] = useState()
    const [selectedTrees, setSelectesTrees] = useState(5)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)

    const event = eventStore(state => state.event)
    const setEvent = eventStore(state => state.setEvent)
    useEffect(() => {
        const pullEvent = async () => {
            const response = await getEventAction({ _id: params.event })
            if (response.event) {
                setEvent(response.event)
            }
        }
        if (!event) {
            pullEvent()
        }
    }, [event, params.event, setEvent])
    if (loading) {
        return (
            <>
                loadding...
            </>
        )
    }
    return (
        event &&
        <div className="container flex flex-col lg:flex-row gap-x-5">
            <div className="w-full lg:w-1/3 shrink-0">
                <div className="w-full aspect-square rounded-md ">
                    <div className="border rounded-md w-full h-full">
                        <Image placeholder="blur" blurDataURL="/loading-image.jpeg" src={event?.photo as string} className="w-full h-full rounded-md object-cover shadow-lg" width={400} height={400} alt={`${event?.name}`} />
                    </div>
                    <div className="w-full hidden lg:flex items-center gap-x-2 mt-3">
                        <div className="h-full uppercase px-2 py-1.5 bg-blue-400 text-xl rounded-md tracking-widest text-white">
                            {(event?.group as IPhotoSpace)?.name?.split(" ")[0][0]}{(event?.group as IPhotoSpace)?.name.split(" ")[0][1]}
                        </div>
                        <div className="h-full">
                            <div className="text-xs text-muted-foreground">Presented by</div>
                            <div className="font-semibold">{(event.group as IPhotoSpace).name}</div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="text-xs mt-3">
                            {(event?.group as IPhotoSpace)?.description}
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="text-xs mt-3 border-b pb-2">
                            Hosted By
                        </div>
                        <div className="flex gap-x-2 items-center mt-3">
                            <Avatar className="w-6 h-6">
                                <AvatarImage src={(event?.owner as IUser).image as string} alt={`${(event?.owner as IUser)?.name} photo`} />
                                <AvatarFallback>{(event?.owner as IUser)?.name?.split(" ")[0][0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                                {(event.owner as IUser).name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="lg:w-3/4 flex flex-col gap-y-5 mb-10">
                    <div className="flex flex-col mt-5 lg:mt-0 gap-y-3 text-xl xl:text-2xl">
                        {
                            event?.name
                        }
                    </div>
                    <div className="lg:hidden">
                        <div className="text-xs border-b pb-2">
                            Hosted By
                        </div>
                        <div className="flex gap-x-2 items-center mt-3">
                            <Avatar className="w-6 h-6">
                                <AvatarImage src={(event?.owner as IUser)?.image as string} alt={`${(event?.owner as IUser)?.name} photo`} />
                                <AvatarFallback>{(event?.owner as IUser)?.name?.split(" ")[0][0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                                {(event.owner as IUser).name}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-5 items-center">
                        <div className="flex flex-col border rounded">
                            <div className="px-2.5 bg-accent/40 uppercase py-0.5 rounded-t text-[0.5rem]">
                                {new Date(event?.date as Date)?.toLocaleString('en-us', { month: 'short' })}
                            </div>
                            <div className=" text-center  text-muted-foreground">
                                {new Date(event?.date as Date).getDate()}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                {format((event?.date as Date), "LLLL	d, yyyy")}
                            </div>
                            {
                                event.start && event.end &&
                                <div className="text-sm text-muted-foreground">
                                    {event.start} - {event.end}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex gap-x-5 items-center">
                        <div className="p-2.5 flex flex-col border rounded">
                            <MapPin size={18} />
                        </div>
                        <div className="flex flex-col">
                            <Link href={`https://maps.google.com?q=${event.location?.latitude},${event.location?.longitude}`} className="flex group cursor-pointer" target="_blank">
                                <div>
                                    {event.location?.location}
                                </div>
                                <div className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all durarion-500 text-muted-foreground group-hover:text-inherit">
                                    <span><ArrowUpRight /></span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Card className="border-none bg-accent/40 py-1">
                            <CardTitle className="px-3 text-sm font-normal text-muted-foreground py-2 pb-1 ">Join Event</CardTitle>
                            <CardContent className="flex flex-col px-0">
                                <div className="flex flex-col items-center justify-center gap-y-3 py-1 px-8">
                                    <div className="p-3 rounded-full bg-accent">
                                        <Image src={"/forest.svg"} width={50} height={50} alt="Forest image" className="" />
                                    </div>
                                    <div className="text-sm">
                                        Kes 100 plants 1 tree
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-4 px-4">
                                    <div className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-4 mt-4">
                                        <div className="w-full">
                                            <Button variant={selectedTrees === 5 ? "default" : "outline"} className="w-full" onClick={() => { setSelectesTrees(5) }}>
                                                5 trees
                                            </Button>
                                        </div>
                                        <div>
                                            <Button variant={selectedTrees === 10 ? "default" : "outline"} className="w-full" onClick={() => { setSelectesTrees(10) }}>
                                                10 trees
                                            </Button>
                                        </div>
                                        <div>
                                            <Button variant={selectedTrees === 20 ? "default" : "outline"} className="w-full" onClick={() => { setSelectesTrees(20) }}>
                                                20 trees
                                            </Button>
                                        </div>
                                        <div>
                                            <Button variant={selectedTrees === 50 ? "default" : "outline"} className="w-full" onClick={() => { setSelectesTrees(50) }}>
                                                50 trees
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <Input type="number" placeholder="Other number" onChange={(e) => { setSelectesTrees(parseInt(e.target.value)) }} />
                                    </div>
                                    <div className="w-full">
                                        <Button className="w-full" onClick={() => { setOpenPaymentModal(true) }}>
                                            Support initiative
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <div className="text-xs mt-3 border-b pb-2">
                            About Event
                        </div>
                        <div className="flex gap-x-2 items-center mt-3 text-sm">
                            {event.description}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs mt-3 border-b pb-2">
                            Location
                        </div>
                        <div className="flex gap-x-2 items-center mt-2 text-sm pb-2">
                            {event.location?.location}
                        </div>
                        <div className="w-full h-52">
                            <MyMap classNames="lg:rounded-md overflow-hidden" />
                        </div>
                    </div>
                    <div className="w-full flex lg:hidden items-center gap-x-2 mt-3">
                        <div className="h-full uppercase px-2 py-1.5 bg-blue-400 text-xl rounded-md tracking-widest text-white">
                            {(event?.group as IPhotoSpace)?.name?.split(" ")[0][0]}{(event?.group as IPhotoSpace)?.name.split(" ")[0][1]}
                        </div>
                        <div className="h-full">
                            <div className="text-xs text-muted-foreground">Presented by</div>
                            <div className="font-semibold">{(event.group as IPhotoSpace).name}</div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <div className="text-xs">
                            {(event?.group as IPhotoSpace)?.description}
                        </div>
                    </div>
                </div>
            </div>
            <PaymentModal open={openPaymentModal} setOpen={() => { setOpenPaymentModal(!openPaymentModal) }} event={event} trees={selectedTrees} amount={selectedTrees * 100} />
        </div>
    )
}
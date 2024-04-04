import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { modalsStore, photoSpaceStore } from "@/store";
import { Avatar } from "@radix-ui/react-avatar";
import { MoreVertical } from "lucide-react";
import InvitationModal from "./invitation-modal";
import AddPhotosModal from "./photos-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getLoggedInUser, joinGroupAction } from "@/lib/actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { IUser } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ name, photo, description, access }: { name: string, photo?: string, description?: string, access: boolean }) {
    const [user, setUser] = useState<IUser>()
    const [loading, setLoading] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const sendInvitationModal = modalsStore(state => state.sendInvitationModal)
    const addPhotosModal = modalsStore(state => state.addPhotosModal)
    const setSendInvitationModal = modalsStore(state => state.setSendInvitationModal)
    const setAddPhotosModal = modalsStore(state => state.setAddPhotosModal)
    const [loadingData, setLoadingData] = useState(false)

    const pathname = usePathname()

    const photoSpace = photoSpaceStore(state => state.photoSpace)

    useEffect(() => {
        pullUserDetails()
    }, [])

    useEffect(() => {
        setLoadingData(true)
        if (user && photoSpace) {
            setIsMember(user.groups!.includes(photoSpace?._id!))
        }
        setLoadingData(false)
    }, [photoSpace, user])

    const pullUserDetails = async () => {
        setLoadingData(true)
        const user = await getLoggedInUser()
        setUser(user)
        setLoadingData(false)
    }
    const joinGroup = async () => {
        if (user && photoSpace) {
            setLoading(true)
            const joinStatus = await joinGroupAction({ groupId: photoSpace._id! })
            setLoading(false)
            if (joinStatus) {
                toast.success("You have joined the group successfully")
                const updatedUser = { ...user, groups: [...(user.groups ? [...user.groups, photoSpace._id!] : [photoSpace._id!])] }
                setUser(updatedUser)
                setIsMember(true)
            } else {
                toast.error("Couldn't join. Something wrong happened.")
            }
        }
    }
    if (!user && !loadingData) {
        return (
            <Skeleton />
        )
    }

    const leaveGroup = () => {

    }

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex justify-between items-center lg:items-end">
                <div className="w-full flex items-center gap-x-4 mt-5">
                    <Avatar>
                        <AvatarImage src={photo} alt={`${name} photo`} />
                        <div className="uppercase px-3 py-2.5 bg-blue-400 text-xl rounded-md tracking-widest text-white">
                            {name.split(" ")[0][0]}{name.split(" ")[0][1]}
                        </div>
                    </Avatar>
                    <CardTitle className="text-md lg:text-2xl">
                        {name} {access && <span className="text-xs font-light">(Public) </span> || <span className="text-xs font-light">(Private) </span>}
                    </CardTitle>
                </div>
                {/* Private groups */}
                {
                    !access &&
                    <div>
                        <div className="hidden lg:flex gap-x-5">
                            <Button onClick={() => { setAddPhotosModal(true) }}>
                                Add planted trees
                            </Button>
                            <Button onClick={() => { setSendInvitationModal(true) }} variant={"outline"}>
                                Invite member
                            </Button>
                        </div>
                        <div className="flex lg:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <MoreVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => { setAddPhotosModal(true) }}>
                                        Add planted trees
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setSendInvitationModal(true) }}>
                                        Invite member
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                }
                {/* Public group, but user is not the owner of the group */}
                {
                    user && photoSpace!.access && photoSpace?.ownerId?._id !== user._id &&
                    <div>
                        <div className="hidden lg:flex gap-x-5">
                            {
                                isMember &&
                                <Button disabled={loading} variant={"destructive"} onClick={leaveGroup}>
                                    Leave group
                                </Button>
                                ||
                                <Button disabled={loading} onClick={joinGroup}>
                                    Join group
                                </Button>
                            }
                        </div>
                        <div className="flex lg:hidden">
                            {
                                isMember &&
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <MoreVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={leaveGroup}>
                                            Join group
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                ||
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <MoreVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={joinGroup}>
                                            Leave group
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            }
                        </div>
                    </div>
                }
                {/* Public group and user is the owner */}
                {
                    user && photoSpace?.ownerId?._id === user._id && photoSpace!.access &&
                    <>
                        <div className="hidden lg:flex gap-x-5">
                            <Link href={`${pathname}/events/new`}>
                                <Button disabled={loading} >
                                    New event
                                </Button>
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <MoreVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link href={`${pathname}/events/new`}>
                                        <DropdownMenuItem onClick={joinGroup}>
                                            New event
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </>
                }
            </div>
            <InvitationModal open={sendInvitationModal} setOpen={() => { setSendInvitationModal(!sendInvitationModal) }} />
            <AddPhotosModal open={addPhotosModal} setOpen={() => { setAddPhotosModal(!addPhotosModal) }} />

        </div >
    )
}

const Skeleton = () => {
    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex justify-between items-center lg:items-end">
                <div className="w-full flex items-center gap-x-4 mt-5">
                    <Avatar>
                        <AvatarImage alt={`${name} photo`} />
                        <div className="uppercase w-12 h-12 px-3 py-2.5 bg-gray-100 animate-pulse text-xl rounded-md tracking-widest text-white">

                        </div>
                    </Avatar>
                    <div className="w-1/2 lg:w-1/4 h-8 rounded-md bg-gray-100">

                    </div>
                </div>

                <div className="hidden lg:flex gap-x-5 w-24 h-8 bg-gray-100 animate-pulse rounded-md">

                </div>
                <div className="flex lg:hidden w-2 h-10 bg-gray-100 rounded-md animate-pulse">

                </div>

            </div>
        </div>
    )
}
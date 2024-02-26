'use client'
import { ArrowLeft, MenuIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,

} from "@/components/ui/sheet"
import { IUser } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { getLoggedInUser, getPopulatedInvitations } from "@/lib/actions";
import ContributorCard from "./contributor";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InvitationModal from "./invitation-modal";
import AddPhotosModal from "./photos-modal";
import Uploads from "./uploads";
import { modalsStore, photoSpaceStore } from "@/store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function NavMenu() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [invitations, setInvitations] = useState<any>()
    const [user, setUser] = useState<IUser | undefined>()
    const photoSpace = photoSpaceStore(state => state.photoSpace)
    const sendInvitationModal = modalsStore(state => state.sendInvitationModal)
    const addPhotosModal = modalsStore(state => state.addPhotosModal)
    const setSendInvitationModal = modalsStore(state => state.setSendInvitationModal)
    const setAddPhotosModal = modalsStore(state => state.setAddPhotosModal)

    useEffect(() => {

        const pullUsers = async () => {
            if (photoSpace?.invitations) {
                const inv = await getPopulatedInvitations(photoSpace.invitations)
                const user = await getLoggedInUser()
                setInvitations(inv)
                setUser(user)
            }
        }

        pullUsers()
    }, [photoSpace])
    return (
        <div>
            {
                sidebarOpen &&
                <Sheet open={sidebarOpen} >
                    <SheetContent onInteractOutside={() => { setSidebarOpen(prevState => !prevState) }} side={"left"}>
                        <SheetHeader>
                            <div className="flex items-center justify-between px-4 pb-2 gap-x-3 -mt-4">
                                <div className=" p-1 hover:bg-gray-100 rounded-full">
                                    <Link href="/dashboard">
                                        <ArrowLeft />
                                    </Link>
                                </div>
                                <div>
                                    Geospot
                                </div>
                                <div>

                                </div>
                            </div>
                        </SheetHeader>
                        <div className="flex flex-col gap-y-4">
                            <Separator />
                            <SheetDescription>
                                Uploads
                            </SheetDescription>
                            <Uploads uploads={photoSpace!.uploads || []} owner={photoSpace!.ownerId} user={user} addPhotos={(status: boolean) => { setAddPhotosModal(status) }} />
                            <SheetDescription>
                                Contributors
                            </SheetDescription>
                            <div className="flex gap-2 flex-wrap items-center">
                                {
                                    invitations && invitations.length > 0 && invitations.map((invitation: IUser, id: number) => {
                                        return (
                                            <ContributorCard key={id} name={invitation.name as string} photo={invitation.image as string} email={invitation.email as string} />
                                        )
                                    })
                                }
                                {
                                    invitations && photoSpace && photoSpace?.invitations?.map((email, id) => {
                                        if (!invitations.find((invitation: IUser) => invitation.email === email)) {
                                            return (
                                                <ContributorCard key={id} name={""} photo={"" as string} email={email as string} />

                                            )
                                        }
                                    })
                                }
                                {photoSpace && photoSpace.ownerId && photoSpace.ownerId._id === user?._id &&
                                    <>
                                        {
                                            photoSpace.invitations && photoSpace.invitations.length === 0 && invitations.length === 0 &&
                                            <div className="w-full flex flex-col items-center gap-y-5">
                                                <div className="">No contributors invited</div>
                                                <div>
                                                    <Button variant={"outline"} onClick={() => { setSendInvitationModal(true) }}>
                                                        Invite
                                                    </Button>
                                                </div>
                                            </div>
                                            ||
                                            <Button size={"sm"} variant={"ghost"} onClick={() => { setSendInvitationModal(true) }}>
                                                <PlusIcon className="w-5 h-5" />
                                            </Button>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                ||
                <div onClick={() => { setSidebarOpen(prevState => !prevState) }}>
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className='shadow-md'>
                                        <AvatarFallback>
                                            <MenuIcon />
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Open menu</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            }
            <InvitationModal open={sendInvitationModal} setOpen={() => { setSendInvitationModal(!sendInvitationModal) }} photoSpace={photoSpace} setInvitations={(inv: String[]) => { setInvitations(inv) }} />
            <AddPhotosModal open={addPhotosModal} setOpen={() => { setAddPhotosModal(!addPhotosModal) }} />
        </div >
    )
}
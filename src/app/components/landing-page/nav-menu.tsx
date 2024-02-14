'use client'
import { MenuIcon, MoveLeftIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,

} from "@/components/ui/sheet"
import { IPhotoSpace, IUser } from "@/lib/types";
import UploadCard from "../photoSpace/uploads";
import { Separator } from "@/components/ui/separator";
import { getPopulatedInvitations } from "@/lib/actions";
import ContributorCard from "../photoSpace/contributor";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavMenu({ photoSpace }: { photoSpace: IPhotoSpace }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [invitations, setInvitations] = useState<any>()
    useEffect(() => {
        pullUsers()
    }, [])

    const pullUsers = async () => {
        if (photoSpace.invitations) {
            let populatedInvitations
            const inv = await getPopulatedInvitations(photoSpace.invitations)
            setInvitations(inv)
        }
    }
    return (
        <div>
            {
                sidebarOpen &&
                <Sheet open={sidebarOpen} >
                    <SheetClose>

                    </SheetClose>
                    <SheetContent onInteractOutside={() => { setSidebarOpen(prevState => !prevState) }} side={"left"}>
                        <SheetHeader>
                            <div className="flex items-center justify-between px-4 pb-2 gap-x-3 -mt-2">
                                <div>
                                    <Link href="/dashboard">
                                        <MoveLeftIcon />
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
                            <UploadCard name={`${photoSpace?.ownerId?.name} (owner)`} photos={[]} />
                            <Separator />
                            <SheetDescription>
                                Contributors
                            </SheetDescription>
                            <div className="flex gap-2 flex-wrap items-center">
                                {
                                    invitations && invitations.length > 0 && invitations.map((invitation: IUser) => {
                                        return (
                                            <ContributorCard name={invitation.name as string} photo={invitation.image as string} email={invitation.email as string} />
                                        )
                                    })
                                }
                                {
                                    photoSpace && photoSpace?.invitations?.map(email => {
                                        if (!invitations.find((invitation: IUser) => invitation.email === email)) {
                                            return (
                                                <ContributorCard name={""} photo={"" as string} email={email as string} />

                                            )
                                        }
                                    })
                                }
                                {
                                    photoSpace.invitations.length === 0 && invitations.length === 0 &&
                                    <div className="w-full flex flex-col items-center gap-y-5">
                                        <div className="">No contributors invited</div>
                                        <div>
                                            <Button variant={"outline"}>
                                                Invite
                                            </Button>
                                        </div>
                                    </div>
                                    ||
                                    <Button size={"sm"} variant={"ghost"}>
                                        <PlusIcon className="w-5 h-5" />
                                    </Button>
                                }
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                ||
                <div onClick={() => { setSidebarOpen(prevState => !prevState) }}>
                    <MenuIcon />
                </div>
            }

        </div>
    )
}
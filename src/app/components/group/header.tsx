import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { modalsStore } from "@/store";
import { Avatar } from "@radix-ui/react-avatar";
import { MoreVertical } from "lucide-react";
import InvitationModal from "../map/invitation-modal";
import AddPhotosModal from "../map/photos-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header({ name, photo, description, access }: { name: string, photo?: string, description?: string, access: boolean }) {
    const sendInvitationModal = modalsStore(state => state.sendInvitationModal)
    const addPhotosModal = modalsStore(state => state.addPhotosModal)
    const setSendInvitationModal = modalsStore(state => state.setSendInvitationModal)
    const setAddPhotosModal = modalsStore(state => state.setAddPhotosModal)

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
                    <CardTitle className="">
                        {name}
                    </CardTitle>
                </div>
                {
                    !access &&
                    <div className="hidden lg:flex gap-x-5">
                        <Button onClick={() => { setAddPhotosModal(true) }}>
                            Add planted trees
                        </Button>
                        <Button onClick={() => { setSendInvitationModal(true) }} variant={"outline"}>
                            Invite member
                        </Button>
                    </div>
                }
                {
                    !access &&
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
                }
            </div>
            <InvitationModal open={sendInvitationModal} setOpen={() => { setSendInvitationModal(!sendInvitationModal) }} />
            <AddPhotosModal open={addPhotosModal} setOpen={() => { setAddPhotosModal(!addPhotosModal) }} />

        </div>
    )
}
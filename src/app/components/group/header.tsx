import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar } from "@radix-ui/react-avatar";
import { MoreVertical } from "lucide-react";

export default function Header({ name, photo, description }: { name: string, photo?: string, description?: string }) {
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
                <div className="hidden lg:flex gap-x-5">
                    <Button>
                        Add planted trees
                    </Button>
                    <Button variant={"outline"}>
                        Invite member
                    </Button>
                </div>
                <div className="flex lg:hidden">
                    <Popover>
                        <PopoverTrigger asChild>
                            <MoreVertical />
                        </PopoverTrigger>
                        <PopoverContent className="">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the dimensions for the layer.
                                    </p>
                                </div>
                                <div className="flex flex-col">

                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
        </div>
    )
}
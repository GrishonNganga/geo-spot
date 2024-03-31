import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function ContributorCard({ name, photo, email }: { name: string, photo?: string, email: string }) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Button variant="link" className="px-0 hover:no-underline">
                    <Avatar>
                        <AvatarImage src={photo} alt={`${name}`} />
                        <AvatarFallback className="capitalize font-semibold text-xl cursor-pointer">
                            {
                                name &&
                                <span>{name.split(" ")[0][0]} {name.split(" ")[1][0]}</span> ||
                                <span>{email[0]}</span>
                            }
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="ml-5">
                <div className="flex flex-col">
                    <div className="capitalize text-base font-semibold">
                        {name}
                    </div>
                    <div className="text-sm text-gray-600">
                        {email}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
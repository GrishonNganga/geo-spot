import * as React from "react"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { LockIcon, MoreHorizontal, UnlockIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IPhotoSpace } from "@/lib/types"
import Link from "next/link"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"

export const columns: ColumnDef<IPhotoSpace>[] = [

    {
        accessorKey: "name",
        header: "Name",
        size: 80,
        cell: ({ row }) => (
            <Link className="flex gap-x-2 items-center" href={"/space/" + row.original.spaceId}>
                <Avatar>
                    <AvatarImage src={""} alt={`${name} photo`} />
                    <div className="w-full uppercase px-2.5 py-2 bg-blue-400 text-xl rounded-md tracking-widest flex items-center justify-center text-white">
                        {row.renderValue("name").split(" ")[0][0]}
                    </div>
                </Avatar>
                <div>
                    <div className="capitalize">
                        {row.getValue("name")}
                    </div>
                    <CardDescription className="text-xs">
                        {row.original.access && "Public" || "Private"}
                    </CardDescription>
                </div>
            </Link>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

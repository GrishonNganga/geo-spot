import * as React from "react"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IUser } from "@/lib/types"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"

export const columns: ColumnDef<IUser>[] = [

    {
        accessorKey: "",
        header: "Name",
        size: 80,
        cell: ({ row }) => (
            <div className="flex gap-x-2 items-center">
                <Avatar>
                    <AvatarImage src={row.original.image as string} alt={`${row.original.image}'s photo`} />
                    <div className="w-full uppercase px-2.5 py-2 bg-blue-400 text-xl rounded-md tracking-widest flex items-center justify-center text-white">
                        {
                            row.original.name &&
                            <span>{row.original.name.split(" ")[0][0]}</span> ||
                            row.original.email && <span>{row.original.email[0]}</span>
                        }
                    </div>
                </Avatar>
                <div className="flex flex-col gap-y-2">
                    <div className="capitalize">
                        {
                            row.original.name ||
                            row.original.email.split("@")[0]
                        }
                    </div>
                    <CardDescription className="text-xs">
                        100 Trees
                    </CardDescription>
                </div>
            </div>
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

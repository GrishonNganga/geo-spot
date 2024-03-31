import * as React from "react"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { MoreHorizontal, TreePine } from "lucide-react"

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
                    <div className="w-full uppercase px-2.5 py-2 bg-green-100 text-xl rounded-md tracking-widest flex items-center justify-center text-green-500">
                        <TreePine />
                    </div>
                </Avatar>
                <div className="flex flex-col gap-y-2">
                    <div className="capitalize">
                        Mahogany
                    </div>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "",
        header: "Name",
        size: 80,
        cell: ({ row }) => (
            <div className="flex gap-x-2 items-center">
                <div className="flex flex-col gap-y-2">
                    <div className="capitalize">
                        1,000
                    </div>
                </div>
            </div>
        ),
    },
]

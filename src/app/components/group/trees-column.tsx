import * as React from "react"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { TreePine } from "lucide-react"
import { ITreeType, IUser } from "@/lib/types"
import { Avatar } from "@/components/ui/avatar"

export const columns: ColumnDef<ITreeType>[] = [

    {
        accessorKey: "name",
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
                        {row.original.name}
                    </div>
                </div>
            </div>
        ),
    }
]

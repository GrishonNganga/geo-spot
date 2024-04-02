import * as React from "react"
import {
    ColumnDef,
} from "@tanstack/react-table"
import { TreePine } from "lucide-react"
import { ITreeType, IUser } from "@/lib/types"
import { Avatar } from "@/components/ui/avatar"
import Image from "next/image"

export const columns: ColumnDef<ITreeType>[] = [

    {
        accessorKey: "name",
        header: "Name",
        size: 80,
        cell: ({ row }) => (
            <div className="flex gap-x-2 items-center">
                <Avatar>
                    <div className="w-full uppercase text-xl rounded-md tracking-widest flex items-center justify-center text-green-500">
                        <Image src={"/forest.svg"} width={100} height={100} alt="Forest icon" className="w-24"/>
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

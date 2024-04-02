"use client"

import * as React from "react"
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { columns } from "./trees-column"
import { ITreeType, IUpload, IUser } from "@/lib/types"
import { CardTitle } from "@/components/ui/card"

export default function TreesTable({ uploads }: { uploads?: IUpload[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [data, setData] = React.useState<ITreeType[]>([])
    const [loading, setLoading] = React.useState(false)

    const pullData = async () => {
        setLoading(true)
        if (uploads && uploads?.length > 0) {
            let cumulativeTreeKinds: ITreeType[] = []
            uploads.forEach((upload) => {
                const kinds = upload.treeTypes
                kinds?.forEach((kind: ITreeType) => {
                    if (!cumulativeTreeKinds.find((tree: ITreeType) => tree.name === kind.name)) {
                        cumulativeTreeKinds.push(kind)
                    }
                })
                return cumulativeTreeKinds
            }, [])
            console.log("TRRE", cumulativeTreeKinds)
            setData(cumulativeTreeKinds)
        }
        setLoading(false)
    }

    React.useEffect(() => {
        pullData()
    }, []);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex lg:flex-row justify-between items-center gap-y-3 lg:gap-y-0 py-4">
                <CardTitle className="text-xl">
                    Trees
                </CardTitle>
                <div className="flex gap-x-2">
                    <Link href="/dashboard/new">
                        <Button className="underline" variant={"link"}>
                            View all
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (loading ?
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                            :
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No trees added...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}
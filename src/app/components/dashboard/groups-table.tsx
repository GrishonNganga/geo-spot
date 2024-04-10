import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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

export default function GroupsTable({ headerGroups, rows, columns, loading }: { headerGroups: any, rows: any, columns: any, loading: boolean }) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {headerGroups.map((headerGroup: any) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) => {
                                return (
                                    <TableHead key={header.id} className={`w-[${header.getSize()}%]`}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {rows?.length ? (
                        rows.map((row: any) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell: any) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (loading ? (
                        Array(10).fill(0).map(el => {
                            return (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="flex gap-x-2 items-center"
                                    >
                                        <div className="w-10 h-10 bg-accent/40 animate-pulse rounded-full">
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <div className="w-40 h-3 bg-accent/40 animate-pulse rounded-md">

                                            </div>
                                            <div className="w-36 h-3 bg-accent/40 animate-pulse rounded-md">

                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        colSpan={columns.length}
                                        className=""
                                    >
                                        <div className="w-10 h-10 bg-accent/40 animate-pulse rounded-full">

                                        </div>
                                    </TableCell>
                                    <TableCell
                                        colSpan={columns.length}
                                        className=""
                                    >
                                        <div className="w-10 h-10 bg-accent/40 animate-pulse rounded-md">

                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    )
                        :
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
    )
}
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

import { columns } from "@/app/components/dashboard/photospace-columns"
import { getData, getLoggedInUser } from "@/lib/actions"
import { IPhotoSpace } from "@/lib/types"
import Actions from "./actions"
import GroupsTable from "./groups-table"
import Pagination from "./pagination"

export default function PhotoSpacesTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [data, setData] = React.useState<IPhotoSpace[]>([])
    const [loading, setLoading] = React.useState(false)

    const pullData = async () => {
        setLoading(true)
        const user = await getLoggedInUser()
        const d = await getData(user._id)
        setLoading(false)
        setData(d)
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
        <div className="w-full lg:container">
            <Actions filterValue={(table.getColumn("name")?.getFilterValue() as string)} handleChange={(val: string) => { table.getColumn("name")?.setFilterValue(val) }} />
            <GroupsTable headerGroups={table.getHeaderGroups()} rows={table.getRowModel().rows} loading={loading} columns={columns} />
            <Pagination filteredRows={table.getFilteredSelectedRowModel().rows} previousPage={() => { table.previousPage() }} nextPage={() => { table.nextPage() }} />
        </div >
    )
}
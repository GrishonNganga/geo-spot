"use client"
import { useEffect, useState } from "react"

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { columns } from "@/app/components/dashboard/photospace-columns"

import Actions from "./actions"
import GroupsTable from "./groups-table"
import Pagination from "./pagination"
import { useFetchGroups } from "./hooks/useFetchGroups"

export default function PhotoSpacesTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const { groups, loading } = useFetchGroups()

    const table = useReactTable({
        data: groups,
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
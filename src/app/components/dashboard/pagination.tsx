import { Button } from "@/components/ui/button";

export default function Pagination({ filteredRows, previousPage, nextPage }: { filteredRows: any, previousPage: () => void, nextPage: () => void }) {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {filteredRows.length} of{" "}
                {filteredRows.length} row(s) selected.
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={previousPage}
                // disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                // disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
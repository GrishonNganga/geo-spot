import { Point } from "@/lib/types";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"

export default function MapPhotoDisplay({ point, open, setOpen }: { point: Point, open: boolean, setOpen: () => void }) {
    return (
        <>
            <TooltipProvider>
                <Tooltip open={true}>
                    <TooltipContent className='p-1 cursor-pointer' onPointerDownOutside={setOpen}>
                        Something here
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}
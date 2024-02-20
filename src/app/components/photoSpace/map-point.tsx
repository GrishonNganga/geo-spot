import { Point } from "@/lib/types";
import Image from 'next/image';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"
import MapPhotoDisplay from "./map-photo-display";
import { useEffect, useState } from "react";

export default function MapPoint({ point, open, setOpen }: { point: Point, open: boolean, setOpen: () => void }) {
    return (
        <div>
            <TooltipProvider>
                <Tooltip open={true}>
                    <TooltipContent className='p-1 cursor-pointer'>
                        <Image src={point.url} alt="Photo" width={100} height={100} className='w-20 h-20 rounded-md object-cover' />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {open && <MapPhotoDisplay open={open} point={point} setOpen={setOpen}/>}
        </div>
    )
}
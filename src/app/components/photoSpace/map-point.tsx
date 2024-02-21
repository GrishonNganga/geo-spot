import { Point } from "@/lib/types";
import Image from 'next/image';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"
import MapPhotoDisplay from "./map-photo-display";

export default function MapPoint({ point, open, setOpen }: { point: Point, open: boolean, setOpen: () => void }) {
    console.log("P", point)
    return (
        <div className="bg-red-500">
            <TooltipProvider>
                <Tooltip open={true}>
                    <TooltipContent avoidCollisions={false} className="p-1 cursor-pointer" onPointerDownOutside={setOpen}>
                        <Image src={point.url} alt="Photo" width={100} height={100} className='w-20 h-20 rounded-md object-cover' />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            {
                open && <MapPhotoDisplay point={point} />
            }
        </div>
    )
}




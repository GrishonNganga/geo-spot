import { Point } from "@/lib/types";
import Image from 'next/image';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip"

export default function MapPoint({ point }: { point: Point }) {
    return (
        <>
            <TooltipProvider>
                <Tooltip open={true}>
                    <TooltipContent className='p-1 cursor-pointer'>
                        <Image src={point.url} alt="Photo" width={100} height={100} className='w-20 h-20 rounded-md object-cover' />
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </>
    )
}
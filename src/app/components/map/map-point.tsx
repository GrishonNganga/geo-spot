import { Point } from "@/lib/types";

import MapPhotoDisplay from "./map-photo-display";
import { TreesIcon } from "lucide-react";
import { forest } from "./forest";
import Image from "next/image";

export default function MapPoint({ point, open, setOpen }: { point: Point, open: boolean, setOpen: () => void }) {
    return (
        <div className="">
            <div className="">
                <Image src={"/forest.svg"} width={50} height={50} alt={point.location} />
            </div>
            {
                open && <MapPhotoDisplay point={point} />
            }
        </div>
    )
}




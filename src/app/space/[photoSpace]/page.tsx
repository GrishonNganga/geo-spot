import Map from "@/app/components/photoSpace/map";
import { IPhotoSpace } from "@/lib/types";

export default function Page({ photoSpace }: { photoSpace: IPhotoSpace }) {
    console.log("P", photoSpace)
    return (
        <Map />
    )
}
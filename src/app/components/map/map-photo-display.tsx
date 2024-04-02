import { Point } from "@/lib/types";

import { InfoWindow } from '@vis.gl/react-google-maps';
import Image from "next/image";

export default function MapPhotoDisplay({ point }: { point: Point }) {
    return (
        <div>
            {point.photos &&
                <InfoWindow maxWidth={1000} position={{ lat: point.lat, lng: point.lng }}>
                    <div className='cursor-pointer w-full lg:w-screen lg:max-w-lg flex flex-col gap-y-2'>
                        <div>
                            {point.photos[0]?.metadata?.make || ""}
                        </div>
                        <div>
                            {point.location || ""}
                        </div>
                        <div>
                            {point.photos[0]?.metadata?.description || ""}
                        </div>
                        <Image src={point.photos[0]?.url as string} alt="Photo" width={500} height={500} className='w-full object-cover' />
                    </div>
                </InfoWindow>
            }
        </div>
    )
}
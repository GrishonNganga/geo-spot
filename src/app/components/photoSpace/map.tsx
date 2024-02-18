'use client'
import { IUpload } from '@/lib/types';
import { APIProvider, AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import Image from 'next/image';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function MyMap({ uploads }: { uploads: IUpload[] }) {
    console.log("U", uploads)
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        getUserLocation()
    }, [])
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
    };

    const getPhotosPoints = () => {
        const points: any = []
        uploads.forEach(upload => {
            upload.photos.forEach((photo: any) => {
                points.push({ url: photo.url, name: photo.metadata.location, lat: photo.metadata.latitude, lng: photo.metadata.longitude, key: JSON.stringify(photo) })
            })
        })
        console.log("Points", points)
        return points
    }
    return (
        <div className="w-full h-full z-0">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
                <Map
                    defaultCenter={{ lat: userLocation?.latitude || 0, lng: userLocation?.longitude || 0 }}
                    defaultZoom={3}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID as string}
                >
                    <Markers points={getPhotosPoints()} />
                </Map>
            </APIProvider>
        </div>
    )
};

type Point = google.maps.LatLngLiteral & { key: string };
type Props = { points: Point[] };

const Markers = ({ points }: Props) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const clusterer = useRef<MarkerClusterer | null>(null);

    // Initialize MarkerClusterer
    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    // Update markers
    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers(prev => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    return (
        <>
            {points.map(point => (
                <AdvancedMarker
                    position={point}
                    key={point.key}
                    ref={marker => setMarkerRef(marker, point.key)}>
                    <TooltipProvider>
                        <Tooltip open={true}>
                            <TooltipContent className='p-1'>
                                <Image src={point.url} alt="Photo" width={100} height={100} className='w-20 h-20 rounded-md' />
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </AdvancedMarker>
            ))}
        </>
    );
};
'use client'
import { IUpload, Point } from '@/lib/types';
import { APIProvider, AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { MarkerClusterer, Marker } from '@googlemaps/markerclusterer';

import {useApiIsLoaded} from '@vis.gl/react-google-maps';

import MapPoint from './map-point';
import { photoStore } from '@/store';

import { ExpandIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forest } from './forest';

type LocationProps = { latitude: number, longitude: number }
export default function MyMap({ uploads, classNames }: { uploads?: IUpload[], classNames?: string }) {
    const [userLocation, setUserLocation] = useState<LocationProps | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false)

    const apiIsLoaded = useApiIsLoaded();

    const pathname = usePathname()
    useEffect(() => {
        getUserLocation()
    }, [])

    const getUserLocation = () => {
        setLoadingLocation(true)
        const location = window.localStorage.getItem('user-location')
        if (location) {
            setUserLocation(JSON.parse(location));
            setLoadingLocation(false)
            return
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    window.localStorage.setItem('user-location', JSON.stringify({ latitude, longitude }))
                    setUserLocation({ latitude, longitude });
                    setLoadingLocation(false)
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLoadingLocation(false)

                }
            );
        }
    };

    const getPhotosPoints = () => {
        const points: any = []
        uploads && uploads.forEach(upload => {
            if (upload.location) {
                points.push({ lat: upload?.location?.latitude, lng: upload.location?.longitude, location: upload.location.location, key: `${upload._id}`, photos: upload.photos })
            }
        })
        return points
    }

    if (loadingLocation) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                Loading...
            </div>
        )
    }
    return (
        <div className={cn("w-full h-full z-0 relative", classNames)}>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
                <Map
                    defaultCenter={{ lat: userLocation?.latitude || 0, lng: userLocation?.longitude || 0 }}
                    defaultZoom={5}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId={process.env.NEXT_PUBLIC_MAP_ID as string}
                >
                    <Markers points={getPhotosPoints()} />
                </Map>
            </APIProvider>
            <div className='absolute bottom-0 right-0 px-5 p-8 flex flex-col gap-y-3 justify-center items-center'>
                <div>
                    <Link href={`${pathname}/map`}>
                        <ExpandIcon size={"40"} />
                    </Link>
                </div>
            </div>
        </div>
    )
};


type Props = { points: Point[] };

const Markers = ({ points }: Props) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const open = photoStore(state => state.open)
    const setOpen = photoStore(state => state.setOpen)

    const clusterer = useRef<MarkerClusterer | null>(null);
    // Initialize MarkerClusterer
    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            const svg = window.btoa(forest);
            clusterer.current = new MarkerClusterer({
                map,
                renderer: {
                    render({ count, position }) {
                        return new google.maps.Marker({
                            // label: { text: String(count), color: "white", fontSize: "10px" },
                            position,
                            icon: { url: `data:image/svg+xml;base64,${svg}`, scaledSize: new google.maps.Size(50, 50), },
                            // adjust zIndex to be above other markers
                            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
                        });
                    }
                }
            });
        }
    }, [map]);

    // Update markers
    useEffect(() => {
        if (Object.keys(markers).length > 0 && clusterer.current) {
            clusterer.current.addMarkers(Object.values(markers));
        }
        return () => {
            if (Object.keys(markers).length > 0 && clusterer.current) {
                clusterer.current.clearMarkers();
            }
        };
    }, [markers, clusterer]);

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
            {points.length > 0 && points.map((point, idx) => (
                <>
                    <AdvancedMarker
                        position={point}
                        key={point.key}
                        className='cursor-pointer'
                        onClick={() => setOpen(`${point.key},${idx}`)}
                        ref={marker => setMarkerRef(marker, point.key)}>
                        <MapPoint point={point} open={`${point.key},${idx}` === open} setOpen={() => { setOpen(undefined) }} />
                    </AdvancedMarker>
                </>
            ))}
        </>
    );
};
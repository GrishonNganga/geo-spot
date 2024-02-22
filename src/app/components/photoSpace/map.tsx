'use client'
import { IUpload, Point } from '@/lib/types';
import { APIProvider, AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MarkerClusterer, Marker, GridAlgorithm } from '@googlemaps/markerclusterer';

import MapPoint from './map-point';
import { photoStore } from '@/store';

type LocationProps = { latitude: number, longitude: number }
export default function MyMap({ uploads }: { uploads?: IUpload[] }) {
    const [userLocation, setUserLocation] = useState<LocationProps | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false)

    useEffect(() => {
        getUserLocation()
    }, [])

    useMemo(() => userLocation, [userLocation])

    const getUserLocation = () => {
        setLoadingLocation(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
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
            upload.photos && upload.photos.forEach((photo: any) => {
                points.push({ url: photo.url, name: photo.metadata.location, lat: photo.metadata.latitude, lng: photo.metadata.longitude, key: `${upload._id}`, metadata: { ...(photo.metadata ? photo.metadata : {}) } })
            })
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
        <div className="w-full h-full z-0">
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
            clusterer.current = new MarkerClusterer({ map });
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
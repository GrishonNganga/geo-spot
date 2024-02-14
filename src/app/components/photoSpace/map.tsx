'use client'
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useState } from 'react';

export default function MyMap() {
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
    return (
        <div className="w-full h-full z-0">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
                <Map
                    defaultCenter={{ lat: userLocation?.latitude || 0, lng: userLocation?.longitude || 0 }}
                    defaultZoom={3}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
            </APIProvider>
        </div>
    )
};

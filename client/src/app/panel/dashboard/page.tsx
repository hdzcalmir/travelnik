"use client"

import Sidebar from '@/components/panel/sidebar/sidebar';
import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

export default function Dashboard() {

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHlyb25laWtuZXIiLCJhIjoiY2xvazNzOHJlMjgyZzJrbzJ1b2k4eHM5eCJ9.tuNLcp01YK2C8O8YCAJSAg';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [17.656692, 44.227211],
            zoom: 13
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            'Dobrodošli u Travnik!'
        );

        map.on('click', (data)=>{
            new mapboxgl.Marker({
                draggable: true
            }).setLngLat(data.lngLat)
                .setPopup(popup)
                .addTo(map);
        })

    })


    return (
        <div className='w-full'>
            <Sidebar></Sidebar>
            <div className="container mx-auto mt-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Locations
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            128
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Events
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            133
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Activities
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            350
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="h-[720px] w-[1280px]" id="map"></div>
            </div>
        </div>
    )
}

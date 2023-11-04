"use client"

import Footer from '@/components/panel/layout/footer/footer';
import Sidebar from '@/components/panel/layout/sidebar/sidebar';
import mapboxgl, { Marker } from 'mapbox-gl';
import { useEffect } from 'react';
import IsAuth from '@/hooks/isAuth';
import { NextPage } from 'next';
import { GEO_LOC, MAP, TOKEN } from '@/common/consts';

const Dashboard: NextPage = () => {

    const ventures: Array<any> = [
        {
            "lng": 17.65746447619486,
            "lat": 44.20660338455724
        },
        {
            "lng": 17.64364880427837,
            "lat": 44.22899848897313
        },
        {
            "lng": 17.67395832304308,
            "lat": 44.22377053265586
        },
        {
            "lng": 17.663315317671504,
            "lat": 44.22949050808299
        },
        {
            "lng": 17.66280033354164,
            "lat": 44.22131015722667
        },
        {
            "lng": 17.652414820234895,
            "lat": 44.22161770977837
        },
        {
            "lng": 17.653101465742736,
            "lat": 44.22758391136591
        },
        {
            "lng": 17.623489878218948,
            "lat": 44.223955056668046
        },
        {
            "lng": 17.620829126876004,
            "lat": 44.234594962996255
        },
        {
            "lng": 17.637909433882783,
            "lat": 44.231766042673655
        }
    ];

    useEffect(() => {

        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: MAP,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [GEO_LOC[0], GEO_LOC[1]],
            zoom: 13
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            'Dobrodošli u Travnik!'
        );

        map.on('click', (data) => {
            const venture = new mapboxgl.Marker({
            }).setLngLat(data.lngLat)
                .setPopup(popup)
                .addTo(map);
        })

        map.on('load', ()=>{
            ventures.forEach( async (addr)=>{
                new mapboxgl.Marker({
                }).setLngLat(addr)
                    .setPopup(popup)
                    .addTo(map);

                await reverseGeo(addr);
            })
        })

    })

    let reverseGeo = async (geo: any) => {
        try {
            const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${geo.lng},${geo.lat}.json?access_token=pk.eyJ1IjoidHlyb25laWtuZXIiLCJhIjoiY2xvazNzOHJlMjgyZzJrbzJ1b2k4eHM5eCJ9.tuNLcp01YK2C8O8YCAJSAg`);
            const data = await resp.json();
            console.log(data);
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="space-y-5">
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
            <Footer></Footer>
        </div>
    )
}
export default IsAuth(Dashboard)
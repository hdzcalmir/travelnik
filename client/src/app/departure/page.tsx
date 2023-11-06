"use client"

import { IActivity } from "@/common/interfaces/IActivity";
import { IEvent } from "@/common/interfaces/IEvent";
import { IVenture } from "@/common/interfaces/IVenture";
import AccommodationList from "@/components/home/accommodation/AccommodationList";
import Navbar from "@/components/home/navbar/Navbar"
import useAccommodations from "@/hooks/useAccommodations";
import ActivityAPI from "@/interceptor/Activity/Activity";
import BusinessAPI from "@/interceptor/Business/Business";
import EventAPI from "@/interceptor/Event/Event";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import mapboxgl, { Marker } from 'mapbox-gl';
import { GEO_LOC, LOAD, MAP, TOKEN } from '@/common/consts';
import ActivityTable from "@/components/home/departure/ActivityTable";

const AboutPage = () => {
    // >> React Hooks
    const params = useSearchParams();
    const router = useRouter();

    // >> States & Hooks
    const { accommodations, accommodationsLoading } = useAccommodations();
    const [businesses, setBusinesses] = useState<IVenture[]>();
    const [activities, setActivities] = useState<IActivity[]>();
    const [events, setEvents] = useState<IEvent[]>();

    // >> Filters
    const interests = params.get('interests');
    const check_in = params.get('check_in');
    const check_out = params.get('check_out');
    const people = params.get('people');


    useEffect(() => {
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
        if (interests?.length === 0 || check_in?.length === 0 || check_out?.length === 0 || people?.length === 0) {
            router.push('/');
        }

        // >> Mapbox
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

        map.on(LOAD, () => {
            ventures.forEach((addr) => {
                let el = document.createElement('div');
                el.className = 'marker';
                new mapboxgl.Marker(el)
                    .setLngLat(addr)
                    .setPopup(popup)
                    .addTo(map);
            })
        })

        // >> Fetch relevant data from back-end API
        const fetchBusinesses = async () => {
            const response = await BusinessAPI.fetchBusinessesWithFilters(interests, check_in, check_out, people);
            setBusinesses(response.data);
        }

        const fetchActivities = async () => {
            const response = await ActivityAPI.fetchActivitiesWithFilters(interests, check_in, check_out, people);
            setActivities(response.data);
        }

        const fetchEvents = async () => {
            const response = await EventAPI.fetchEventsWithFilters(interests, check_in, check_out, people);
            setEvents(response.data);
        }

        fetchBusinesses();
        fetchActivities();
        fetchEvents();
    }, [router, interests, check_in, check_out, people])
    console.log(businesses)
    return (
        <>
            <Navbar />
            <div className="grid lg:grid-cols-3 grid-rows-1">
                <div className="col-span-2">
                    <div className="flex justify-center">
                        <div className="h-[680px] w-full" id="map"></div>
                    </div>
                    <ActivityTable />
                </div>
                <div className="py-4 xs:w-full bg-gray-800">
                    <div className="mx-2">
                        <h2 className="text-3xl font-bold mx-2 text-white">Available apartments:</h2>
                        <div className="overflow-y-auto h-[84vh] px-2 scrollbar-hidden">
                            <AccommodationList accommodations={accommodations} accommodationsLoading={accommodationsLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;
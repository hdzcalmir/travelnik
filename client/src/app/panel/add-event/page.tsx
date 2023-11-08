"use client"

import { ADDRESS, CITY, CLICK, COUNTRY, COORDS, LAT, LNG, MAP, POST_CODE, TOKEN, DEFAULT_MARKER } from "@/common/consts";
import Footer from "@/components/panel/layout/footer/footer";
import Sidebar from "@/components/panel/layout/sidebar/sidebar";
import EventAPI from "@/interceptor/Event/Event";
import { mapboxApi } from "@/interceptor/mapboxApi";
import mapboxgl, { Marker } from "mapbox-gl";
import { useEffect, useState } from "react";


const addEvent = async (event: any) => {
    await EventAPI.addEvent(event);
}

export default function AddEvent() {

    let markerExists = false;
    let marker: Marker;

    const [event, setEvent] = useState({
        name: '',
        category: '',
        longitude: 0,
        latitude: 0,
        address: '',
        city: '',
        country: '',
        postalCode: '',
        description: '',
        start_date: '',
        end_date: ''
    });

    useEffect(() => {

        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: MAP,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [COORDS[0], COORDS[1]],
            zoom: 13
        });

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');

        map.on(CLICK, async (data) => {
            if (!markerExists) {
                let icon = document.createElement('div');
                icon.className = DEFAULT_MARKER;

                marker = new mapboxgl.Marker(icon)
                    .setLngLat(data.lngLat)
                    .addTo(map);
                const resp = await mapboxApi.reverseGeocode(data.lngLat);
                setEvent({ ...event, [COUNTRY]: resp.features[4].text, [CITY]: resp.features[2].text, [POST_CODE]: resp.features[1].text, [ADDRESS]: resp.features[0].text, [LAT]: data.lngLat.lat, [LNG]: data.lngLat.lng });
                markerExists = true;
            }
        })
    }, [])


    const handleInputChange = (e: any) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
        console.log(event)
    }

    const handleAddVenture = async (e: any) => {
        e.preventDefault();
        await addEvent(event);
    };

    return (
        <div className="">
            <Sidebar></Sidebar>
            <div className="p-4 sm:ml-64 h-full">
                <div className="border-b-2 border-teal-500">
                    <h1 className="text-teal-500 font-bold text-2xl">Add Event</h1>
                </div>
                <div className="p-4 border-gray-200 h-full dark:border-gray-700">
                    <div className="rounded-lg h-96 mb-4" id="map">
                    </div>
                    <div className="flex items-center justify-center h-full p-10 mb-4 rounded bg-gray-50">
                        <form onSubmit={handleAddVenture} className="w-full">
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input name="name" value={event.name} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Name" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input name="description" value={event.description} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Description" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input name="category" value={event.category} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Category" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={event.country} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Country" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={event.city} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="City" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={event.postalCode} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Postal Code" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={event.address} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Street" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input type="date" name="start_date" value={event.start_date} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Opening time" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input type="date" name="end_date" value={event.end_date} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Closing time" />
                            </div>
                            <div className="flex justify-end mt-10 space-x-3">
                                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

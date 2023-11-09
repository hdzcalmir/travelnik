"use client"
import { ADDRESS, CITY, CLICK, COUNTRY, COORDS, LAT, LNG, MAP, POST_CODE, TOKEN, DEFAULT_MARKER } from "@/common/consts";
import Footer from "@/components/panel/layout/footer/footer";
import Sidebar from "@/components/panel/layout/sidebar/sidebar";
import ActivityAPI from "@/interceptor/Activity/Activity";
import { mapboxApi } from "@/interceptor/mapboxApi";
import mapboxgl, { Marker } from "mapbox-gl";
import { useEffect, useState } from "react";


const addActivity = async (activity: any) => {
    await ActivityAPI.addActivtiy(activity);
}

export default function AddActivity() {

    let markerExists = false;
    let marker: Marker;

    const [activity, setActivity] = useState({
        name: '',
        category: '',
        longitude: 0,
        latitude: 0,
        address: '',
        city: '',
        country: '',
        postalCode: '',
        description: '',
        difficulty: '',
        duration: ''
    });

    useEffect(() => {

        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: MAP,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [COORDS[0], COORDS[1]],
            zoom: 14
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
                setActivity({ ...activity, [COUNTRY]: resp.features[4].text, [CITY]: resp.features[2].text, [POST_CODE]: resp.features[1].text, [ADDRESS]: resp.features[0].text, [LAT]: data.lngLat.lat, [LNG]: data.lngLat.lng });
                markerExists = true;
            }
        })
    }, [])


    const handleInputChange = (e: any) => {
        setActivity({ ...activity, [e.target.name]: e.target.value });
        console.log(activity)
    }

    const handleAddVenture = async (e: any) => {
        e.preventDefault();
        await addActivity(activity);
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
                                <input name="name" value={activity.name} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Name" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input name="description" value={activity.description} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Description" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input name="category" value={activity.category} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Category" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input type="text" name="difficulty" value={activity.difficulty} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Difficulty" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input type="time" name="duration" value={activity.duration} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Duration" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={activity.country} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Country" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={activity.city} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="City" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={activity.postalCode} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Postal Code" />
                            </div>
                            <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={activity.address} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Street" />
                            </div>
                            <div className="flex justify-end mt-10 space-x-3">
                                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                                    Add Activity
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

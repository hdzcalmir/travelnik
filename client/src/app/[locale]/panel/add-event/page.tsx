"use client"

import { ADDRESS, CITY, CLICK, COUNTRY, COORDS, LAT, LNG, MAP, POST_CODE, TOKEN, DEFAULT_MARKER } from "@/common/consts";
import { interests } from "@/common/interests";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import Footer from "@/components/panel/layout/footer/Footer";
import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import IsAuth from "@/hooks/isAuth";
import EventAPI from "@/interceptor/Event/Event";
import { mapboxApi } from "@/interceptor/mapboxApi";
import mapboxgl, { Marker } from "mapbox-gl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const addEvent = async (event: any) => {
    await EventAPI.addEvent(event);
}

function AddEvent() {

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
            zoom: 14
        });

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');

        map.on(CLICK, async (data) => {
            if (!markerExists) {
                let icon = document.createElement('div');
                icon.className = DEFAULT_MARKER;

                const resp = await mapboxApi.reverseGeocode(data.lngLat);
                if (resp?.features[4]?.text) {
                    marker = new mapboxgl.Marker(icon)
                        .setLngLat(data.lngLat)
                        .addTo(map);
                    setEvent({ ...event, [COUNTRY]: resp.features[4].text, [CITY]: resp.features[2].text, [POST_CODE]: resp.features[1].text, [ADDRESS]: resp.features[0].text, [LAT]: data.lngLat.lat, [LNG]: data.lngLat.lng });
                    markerExists = true;
                } else {
                    setEvent({ ...event, [COUNTRY]: '', [CITY]: '', [POST_CODE]: '', [ADDRESS]: '', [LAT]: 0, [LNG]: 0 });
                }

            } else {
                marker?.remove();
                let icon = document.createElement('div');
                icon.className = DEFAULT_MARKER;

                const resp = await mapboxApi.reverseGeocode(data.lngLat);
                if (resp?.features[4]?.text) {
                    marker = new mapboxgl.Marker(icon)
                        .setLngLat(data.lngLat)
                        .addTo(map);
                        setEvent({ ...event, [COUNTRY]: resp.features[4].text, [CITY]: resp.features[2].text, [POST_CODE]: resp.features[1].text, [ADDRESS]: resp.features[0].text, [LAT]: data.lngLat.lat, [LNG]: data.lngLat.lng });
                    markerExists = true;
                } else {
                    setEvent({ ...event, [COUNTRY]: '', [CITY]: '', [POST_CODE]: '', [ADDRESS]: '', [LAT]: 0, [LNG]: 0 });
                }
            }
        })
    }, [])


    const handleInputChange = (e: any) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
        console.log(event)
    }
    
    const handleAddEvent = async (e: any) => {
        e.preventDefault();
        try {
            const response = await EventAPI.addEvent(event);
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="p-2 sm:p-4 sm:ml-64 h-full bg-panelBg">
                <div className="flex flex-col w-full items-center border-gray-200 h-full dark:border-gray-700">
                    <Breadcrumb homeElement={'Home'}></Breadcrumb>
                    <div className="rounded-lg shadow-lg h-96 w-full lg:w-2/3 mb-4" id="map">
                    </div>
                    <div className="flex flex-col shadow-lg items-center justify-center w-full lg:w-2/3 h-full mb-4 rounded-lg bg-gray-800">
                        <div className="flex justify-start h-16 items-center border-b border-gray-700 w-full px-5">
                            <h2 className="text-gray-50 font-bold text-xl">Add Event</h2>
                        </div>
                        <form onSubmit={handleAddEvent} className="w-full space-y-2 py-5">
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Name</label>
                                <input name="name" value={event.name} onChange={handleInputChange} className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Event name" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Description</label>
                                <input name="description" value={event.description} onChange={handleInputChange} className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Event description" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Category</label>
                                <select className="outline-none text-gray-50 py-3 px-2 bg-gray-700 rounded-lg w-2/3" id="category" name="category" value={event.category} onChange={handleInputChange}>
                                    <option>Select Category..</option>
                                    {interests.map((interest) => (
                                        <option key={interest} value={interest}>
                                            {interest}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Country</label>
                                <input value={event.country} disabled className="appearance-none bg-gray-700 border-none rounded-lg w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Country" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">City</label>
                                <input value={event.city} disabled className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 px-2 py-3 leading-tight focus:outline-none" type="text" placeholder="City" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Postal Code</label>
                                <input value={event.postalCode} disabled className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Postal Code" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Street</label>
                                <input value={event.address} disabled className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Street" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Starting Date</label>
                                <input type="date" name="start_date" value={event.start_date} onChange={handleInputChange} className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Ending Date</label>
                                <input type="date" name="end_date" value={event.end_date} onChange={handleInputChange} className="appearance-none mb-5 bg-gray-700 rounded-lg border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" />
                            </div>
                            <div className="bg-gray-700 h-[1px]"></div>
                            <div className="flex justify-end px-5">
                                <button className="flex-shrink-0 mt-5 bg-secondaryColor/80 hover:bg-secondaryColor font-semibold text-md text-white py-2 px-4 rounded-xl">
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

export default IsAuth(AddEvent);
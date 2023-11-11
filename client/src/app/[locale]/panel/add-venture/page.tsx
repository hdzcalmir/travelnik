"use client"

import { ADDRESS, CITY, CLICK, COUNTRY, COORDS, LAT, LNG, MAP, POST_CODE, TOKEN, DEFAULT_MARKER } from "@/common/consts";
import { VentureCategory } from "@/common/enums";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import Footer from "@/components/panel/layout/footer/Footer";
import Sidebar from "@/components/panel/layout/sidebar/Sidebar"
import IsAuth from "@/hooks/isAuth";
import VentureAPI from "@/interceptor/Venture/Venture";
import { mapboxApi } from "@/interceptor/mapboxApi";
import mapboxgl, { Marker } from "mapbox-gl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const addVenture = async (venture: any) => {
    await VentureAPI.addVenture(venture);
}

function AddVenture() {

    let markerExists = false;
    let marker: Marker;

    const [venture, setVenture] = useState({
        name: '',
        category: '',
        longitude: 0,
        latitude: 0,
        address: '',
        city: '',
        country: '',
        postalCode: '',
        description: '',
        opening_time: '',
        closing_time: ''
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
                    setVenture({ ...venture, [COUNTRY]: resp.features[4].text, [CITY]: resp.features[2].text, [POST_CODE]: resp.features[1].text, [ADDRESS]: resp.features[0].text, [LAT]: data.lngLat.lat, [LNG]: data.lngLat.lng });
                    markerExists = true;
                } else {
                    setVenture({ ...venture, [COUNTRY]: '', [CITY]: '', [POST_CODE]: '', [ADDRESS]: '', [LAT]: 0, [LNG]: 0 });
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
                    setVenture({ ...venture, [COUNTRY]: resp.features[4].text, [CITY]: resp.features[2].text, [POST_CODE]: resp.features[1].text, [ADDRESS]: resp.features[0].text, [LAT]: data.lngLat.lat, [LNG]: data.lngLat.lng });
                    markerExists = true;
                } else {
                    setVenture({ ...venture, [COUNTRY]: '', [CITY]: '', [POST_CODE]: '', [ADDRESS]: '', [LAT]: 0, [LNG]: 0 });
                }
            }
        })
    }, [])


    const handleInputChange = (e: any) => {
        setVenture({ ...venture, [e.target.name]: e.target.value });
    }

    const handleAddVenture = async (e: any) => {
        e.preventDefault();
        await addVenture(venture);
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
                            <h2 className="text-gray-50 font-bold text-xl">Add Venture</h2>
                        </div>
                        <form onSubmit={handleAddVenture} className="w-full space-y-2 py-5">
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Name</label>
                                <input name="name" value={venture.name} onChange={handleInputChange} className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Venture name" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Description</label>
                                <input name="description" value={venture.description} onChange={handleInputChange} className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Venture description" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Category</label>
                                <select className="outline-none text-gray-50 py-3 px-2 bg-gray-700 rounded-lg w-2/3" id="category" name="category" value={venture.category} onChange={handleInputChange}>
                                    <option>Select Category..</option>
                                    <option value={VentureCategory.Restaurant}>Restaurant</option>
                                    <option value={VentureCategory.Hotel}>Hotel</option>
                                    <option value={VentureCategory.Hospital}>Hospital</option>
                                    <option value={VentureCategory.Gym}>Gym</option>
                                    <option value={VentureCategory.Cinema}>Cinema</option>
                                    <option value={VentureCategory.GasStation}>Gas Station</option>
                                    <option value={VentureCategory.Store}>Market</option>
                                    <option value={VentureCategory.Taxi}>Taxi</option>
                                    <option value={VentureCategory.BusStation}>Bus Station</option>
                                </select>
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Country</label>
                                <input value={venture.country} disabled className="appearance-none bg-gray-700 border-none rounded-lg w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Country" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">City</label>
                                <input value={venture.city} disabled className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 px-2 py-3 leading-tight focus:outline-none" type="text" placeholder="City" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Postal Code</label>
                                <input value={venture.postalCode} disabled className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Postal Code" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Street</label>
                                <input value={venture.address} disabled className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Street" />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Opening Time</label>
                                <input type="time" name="opening_time" value={venture.opening_time} onChange={handleInputChange} className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-between w-full items-center px-5">
                                <label className="text-md text-gray-50">Closing Time</label>
                                <input type="time" name="closing_time" value={venture.closing_time} onChange={handleInputChange} className="appearance-none mb-5 bg-gray-700 rounded-lg border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none" />
                            </div>
                            <div className="bg-gray-700 h-[1px]"></div>
                            <div className="flex justify-end px-5">
                                <button className="flex-shrink-0 mt-5 bg-secondaryColor/80 hover:bg-secondaryColor font-semibold text-md text-white py-2 px-4 rounded-xl">
                                    Add Venture
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

export default IsAuth(AddVenture);
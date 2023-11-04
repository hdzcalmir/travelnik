"use client"

import Footer from "@/components/panel/footer/footer";
import Sidebar from "@/components/panel/sidebar/sidebar"
import http from "@/interceptor/http";
import mapboxgl from "mapbox-gl";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Venture() {

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        longitude: '',
        latitude: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        description: '',
        opening_time: '',
        closing_time: ''
    });

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHlyb25laWtuZXIiLCJhIjoiY2xvazNzOHJlMjgyZzJrbzJ1b2k4eHM5eCJ9.tuNLcp01YK2C8O8YCAJSAg';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [17.656692, 44.227211],
            zoom: 13
        });

        map.on('click', async (data) => {
            new mapboxgl.Marker({
            }).setLngLat(data.lngLat)
                .addTo(map);
            await reverseGeo(data.lngLat);
        })

    }, [])

    let reverseGeo = async (geo: any) => {
        try {
            const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${geo.lng},${geo.lat}.json?access_token=pk.eyJ1IjoidHlyb25laWtuZXIiLCJhIjoiY2xvazNzOHJlMjgyZzJrbzJ1b2k4eHM5eCJ9.tuNLcp01YK2C8O8YCAJSAg`);
            const data = await resp.json();
            console.log(data)
            setFormData({ ...formData, ['country']: data.features[4].text, ['city']: data.features[2].text, ['postalCode']: data.features[1].text, ['address']: data.features[0].text, ['latitude']: geo.lat, ['longitude']: geo.lng});
        } catch (e) {
            console.log(e)
        }
    }

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function addVenture(e: any) {
        e.preventDefault();
        try {
            console.log(formData);
            await http.post('/business', formData);
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <div className="space-y-10">
            <Sidebar></Sidebar>
            <div className="container mx-auto">
                <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 truncate">
                        Total ventures
                    </div>
                    <div className="mt-1 text-3xl font-semibold text-gray-900">
                        25
                    </div>
                </div>
            </div>
            <div className="container mx-auto space-y-5">
                <div className="border-b-2 border-teal-500">
                    <h1 className="text-teal-500 font-bold text-2xl">Add Venture</h1>
                </div>
                <div className="flex justify-center">
                    <div className="h-[480px] w-[1560px]" id="map"></div>
                </div>
                <form onSubmit={addVenture} className="w-full">
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input name="name" value={formData.name} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Name" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input name="category" value={formData.category} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Category" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input  value={formData.country} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Country" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input value={formData.city} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="City" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input  value={formData.postalCode} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Postal Code" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input  value={formData.address} disabled className="appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Street" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input name="description" value={formData.description} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Description" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input name="opening_time" value={formData.opening_time} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Opening time" />
                    </div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                        <input name="closing_time" value={formData.closing_time} onChange={handleInputChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Closing time" />
                    </div>
                    <div className="flex justify-end mt-10">
                        <button type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                            Add Venture
                        </button>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
    )
}

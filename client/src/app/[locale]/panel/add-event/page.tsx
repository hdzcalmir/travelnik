"use client";

import { TOKEN } from "@/common/consts";
import { interests } from "@/common/interests";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";
import IsAuth from "@/hooks/isAuth";
import EventAPI from "@/interceptor/Event/Event";
import mapboxgl, { Marker } from "mapbox-gl";
import { useEffect, useState } from "react";
import { Utils } from "@/common/utils";
import { IEventState } from "@/common/interfaces/IStates";
import { GeoLocationFactory } from "@/common/geoLocationFactory";
import Flatpickr from "react-flatpickr";

const addEvent = async (event: IEventState) => {
  await EventAPI.addEvent(event);
};

function AddEvent() {
  let markerExists = false;
  let marker: Marker;

  const [event, setEvent] = useState<IEventState>({
    name: "",
    category: "",
    longitude: 0,
    latitude: 0,
    address: "",
    city: "",
    country: "",
    postal_code: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    mapboxgl.accessToken = TOKEN;
    const map = Utils.getMap();
    new mapboxgl.NavigationControl();
    GeoLocationFactory.geoLocation(map, markerExists, event, setEvent, marker);
  }, []);

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setEvent({ ...event, [name]: value });
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addEvent(event);
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="p-2 sm:p-4 sm:ml-64 h-full bg-panelBg">
        <div className="flex flex-col w-full items-center border-gray-200 h-full dark:border-gray-700">
          <Breadcrumb homeElement={"Home"}></Breadcrumb>
          <div
            className="rounded-lg shadow-lg h-96 w-full lg:w-2/3 mb-4"
            id="map"
          ></div>
          <div className="flex flex-col shadow-lg items-center justify-center w-full lg:w-2/3 h-full mb-4 rounded-lg bg-gray-800">
            <div className="flex justify-start h-16 items-center border-b border-gray-700 w-full px-5">
              <h2 className="text-gray-50 font-bold text-xl">Add Event</h2>
            </div>
            <form onSubmit={handleAddEvent} className="w-full space-y-2 py-5">
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Name</label>
                <input
                  name="name"
                  value={event.name}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Event name"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Description</label>
                <input
                  name="description"
                  value={event.description}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg bg-gray-700 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Event description"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Category</label>
                <select
                  className="outline-none text-gray-50 py-3 px-2 bg-gray-700 rounded-lg w-2/3"
                  id="category"
                  name="category"
                  value={event.category}
                  onChange={handleInputChange}
                >
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
                <input
                  value={event.country}
                  disabled
                  className="appearance-none bg-gray-700 border-none rounded-lg w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Country"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">City</label>
                <input
                  value={event.city}
                  disabled
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 px-2 py-3 leading-tight focus:outline-none"
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Postal Code</label>
                <input
                  value={event.postal_code}
                  disabled
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Postal Code"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Street</label>
                <input
                  value={event.address}
                  disabled
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Street"
                />
              </div>
              <div className="flex flex-col lg:flex-row justify-between w-full lg:space-x-5 items-center px-5">
                <label className="text-md text-gray-50 w-full">Starting Date</label>
                <div className="relative w-full flex justify-end">
                  <div className="flex absolute inset-y-0 left-0 lg:left-20 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <Flatpickr
                    value={new Date(event.start_date)}
                    onChange={([date]) => {
                      setEvent({
                        ...event,
                        start_date: date.toISOString()
                      });
                    }}
                    className="bg-gray-50 border w-full lg:w-2/3 cursor-pointer border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-secondaryColor font-medium"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <label className="text-md text-gray-50 w-full">Ending Date</label>
                <div className="relative w-full flex justify-end">
                  <div className="flex absolute inset-y-0 left-0 lg:left-20 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <Flatpickr
                    value={new Date(event.end_date)}
                    onChange={([date]) => {
                      setEvent({
                        ...event,
                        end_date: date.toISOString()
                      });
                    }}
                    className="bg-gray-50 border cursor-pointer w-full lg:w-2/3 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-secondaryColor font-medium"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="bg-gray-700s h-[1px]"></div>
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
  );
}

export default IsAuth(AddEvent);

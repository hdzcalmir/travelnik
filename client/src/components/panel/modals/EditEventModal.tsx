import { difficulties } from '@/common/difficulties';
import { interests } from '@/common/interests';
import { IEvent } from '@/common/interfaces/IEvent';
import useActivities from '@/hooks/useActivities';
import useEvents from '@/hooks/useEvents';
import React, { useState } from 'react';
import Flatpickr from "react-flatpickr";
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';


interface EditActivityModalProps {
  data: IEvent;
  toggleModal: () => void;
}

export interface IEventUpdate {
  name: string,
  description: string,
  category: string,
  start_date: string,
  end_date: string,
  latitude: number,
  longitude: number,
  address: string,
  city: string,
  country: string,
  postal_code: string
}

const EditEventModal: React.FC<EditActivityModalProps> = ({ data, toggleModal }) => {

  const { updateEventMutation } =
    useEvents();

  const id = data.id;

  const [event, setEvent] = useState<IEventUpdate>({
    name: data.name,
    description: data.description,
    category: data.category,
    start_date: data.start_date,
    end_date: data.end_date,
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
    city: data.city,
    country: data.country,
    postal_code: data.postal_code
  })

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setEvent({ ...event, [name]: value });
  };

  const handleUpdateActivity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateEventMutation.mutateAsync({ id, event });
  };

  console.log(event)
  return (
    <>
      <div
        className="fixed top-0 z-50 left-0 w-full h-full bg-black opacity-50"
        onClick={() => {
          toggleModal();
        }}
      ></div>
      <div
        id="crud-modal"
        aria-hidden="true"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full lg:w-2/5 p-4 md:p-5"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Event Data <span className="font-medium text-gray-500">- {data.name}</span>
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
              onClick={() => {
                toggleModal();
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleUpdateActivity}
            className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-1">
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Name</label>
                <input
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Event name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Interest</label>
                <select
                  className="outline-none text-gray-50 py-3 px-2 bg-gray-700 rounded-lg w-2/3"
                  name="category"
                  onChange={handleInputChange}
                >
                  <option>Select Interest..</option>
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
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-500 py-3 px-2 leading-tight focus:outline-none"
                  value={data.country}
                  disabled
                  type="text"
                  placeholder="Event name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">City</label>
                <input
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-500 py-3 px-2 leading-tight focus:outline-none"
                  value={data.city}
                  disabled
                  type="text"
                  placeholder="Event name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Address</label>
                <input
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-500 py-3 px-2 leading-tight focus:outline-none"
                  value={data.address}
                  disabled
                  type="text"
                  placeholder="Event name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col md:space-x-3 md:flex-row justify-between w-full space-y-2 items-center px-5">
                <label className="text-md text-gray-50 w-full">Starting Date</label>
                <div className="relative w-full flex justify-end">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
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
                    className="bg-gray-50 border w-full cursor-pointer border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-secondaryColor font-medium"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <label className="text-md text-gray-50 w-full">Ending Date</label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
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
                    className="bg-gray-50 border cursor-pointer w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-secondaryColor focus:border-secondaryColor block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondaryColor dark:focus:border-secondaryColor font-medium"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-16 justify-end gap-x-2">
              <button
                className="text-white inline-flex items-center bg-transparentBtn hover:bg-hoverBtn focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
                onClick={() => {
                  toggleModal();
                }}
              >
                <span className="mr-2">Cancel</span>
                <MdCancel className="text-[16px] text-red-500"/>
              </button>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-transparentBtn hover:bg-hoverBtn focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
              >
                  <span className="mr-2">Update</span>
                <FaCheckCircle className="text-[16px] text-green-500"/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEventModal;

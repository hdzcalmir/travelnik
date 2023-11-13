import { Category } from '@/common/enums';
import { IVenture } from '@/common/interfaces/IVenture';
import useVentures from '@/hooks/useVentures';
import React, { useState } from 'react';


interface EditVentureModalProps {
  data: IVenture;
  toggleModal: () => void;
}

export interface IVentureUpdate {
  name: string,
  category: Category,
  description: string,
  opening_time: string,
  closing_time: string,
  latitude: number,
  longitude: number,
  address: string,
  city: string,
  country: string,
  postal_code: string
}
const EditVentureModal: React.FC<EditVentureModalProps> = ({ data, toggleModal }) => {

  const { updateVentureMutation } = useVentures();

  const id = data.id;

  const [venture, setVenture] = useState<IVentureUpdate>({
    name: data.name,
    category: data.category,
    description: data.description,
    opening_time: data.opening_time,
    closing_time: data.closing_time,
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
    city: data.city,
    country: data.country,
    postal_code: "72270"
  })

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setVenture({ ...venture, [name]: value });
  };

  const handleUpdateActivity = async (e: React.FormEvent<HTMLFormElement>) => {
    toggleModal();
    e.preventDefault();
    await updateVentureMutation.mutateAsync({ id, venture });
  };

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
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 w-full max-w-md p-4 md:p-5"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Venture Data
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
                  name="name"
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg bg-gray-800 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Venture name"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Description</label>
                <input
                  name="description"
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg bg-gray-800 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Venture description"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Category</label>
                <select
                  className="outline-none text-gray-50 py-3 px-2 bg-gray-800 rounded-lg w-2/3"
                  id="category"
                  name="category"
                  onChange={handleInputChange}>
                  <option>Select Category..</option>
                  <option value={Category.Restaurant}>Restaurant</option>
                  <option value={Category.Hotel}>Hotel</option>
                  <option value={Category.Hospital}>Hospital</option>
                  <option value={Category.Gym}>Gym</option>
                  <option value={Category.Cinema}>Cinema</option>
                  <option value={Category.GasStation}>Gas Station</option>
                  <option value={Category.Store}>Market</option>
                  <option value={Category.Taxi}>Taxi</option>
                  <option value={Category.BusStation}>
                    Bus Station
                  </option>
                </select>
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Opening Time</label>
                <input
                  type="time"
                  name="opening_time"
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg bg-gray-800 border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Closing Time</label>
                <input
                  type="time"
                  name="closing_time"
                  onChange={handleInputChange}
                  className="appearance-none mb-5 bg-gray-800 rounded-lg border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-x-2">
              <button
                className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                onClick={() => {
                  toggleModal();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditVentureModal;

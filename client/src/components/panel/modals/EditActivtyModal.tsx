import { difficulties } from '@/common/difficulties';
import { IActivity } from '@/common/interfaces/IActivity';
import useActivities from '@/hooks/useActivities';
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';


interface EditActivityModalProps {
  data: IActivity;
  toggleModal: () => void;
}

export interface IActivityUpdate {
  name: string;
  description: string,
  category: string,
  duration: string,
  difficulty: string,
  latitude: number,
  longitude: number,
  address: string,
  city: string,
  country: string,
  postal_code: string
}
const EditActivityModal: React.FC<EditActivityModalProps> = ({ data, toggleModal }) => {

  const { updateActivityMutation } =
    useActivities();
  
  const id = data.id;

  const [activity, setActivity] = useState<IActivityUpdate>({
    name: data.name,
    description: data.description,
    category: data.category,
    duration: data.duration,
    difficulty: data.description,
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
    city: data.address,
    country: data.address,
    postal_code: "72270"
  })

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setActivity({ ...activity, [name]: value });
  };

  const handleUpdateActivity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateActivityMutation.mutateAsync({id, activity});
  };

  console.log(activity)
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
        <div className="relative rounded-lg shadow bg-gray-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Activity Data <span className="font-medium text-gray-500">- {data.name}</span>
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
                  placeholder="Activity name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Country</label>
                <input
                  value={data.country}
                  disabled
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-500 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Activity name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">City</label>
                <input
                  value={data.city}
                  disabled
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-500 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Activity name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Address</label>
                <input
                  value={data.address}
                  disabled
                  className="appearance-none bg-gray-700 border-none w-2/3 rounded-lg text-gray-500 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Activity name"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Difficulty</label>
                <select
                  className="outline-none text-gray-50 py-3 px-2 bg-gray-700 rounded-lg w-2/3"
                  id="difficulty"
                  name="difficulty"
                  onChange={handleInputChange}
                >
                  <option>Select Difficulty..</option>
                  {Object.keys(difficulties).map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Duration</label>
                <input
                  type="number"
                  name="duration"
                  onChange={handleInputChange}
                  className="appearance-none mb-5 bg-gray-700 rounded-lg border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  placeholder="Duration in minutes.."
                />
              </div>
            </div>
            <div className="flex justify-end gap-x-2">
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

export default EditActivityModal;

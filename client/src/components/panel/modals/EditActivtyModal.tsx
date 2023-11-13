import { difficulties } from '@/common/difficulties';
import React from 'react';

const EditActivityModal = () => {
  return (
    <>
      <div
        className="fixed top-0 z-50 left-0 w-full h-full bg-black opacity-50"
        onClick={() => {
          // Add logic to close the modal when clicking on the overlay
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
              Update Activity Data
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
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
          <form action="#" className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-1">
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Name</label>
                <input
                  className="appearance-none bg-gray-800 border-none w-2/3 rounded-lg text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Activity name.."
                />
              </div>
              <div className="flex justify-between w-full items-center px-5">
                <label className="text-md text-gray-50">Difficulty</label>
                <select
                  className="outline-none text-gray-50 py-3 px-2 bg-gray-800 rounded-lg w-2/3"
                  id="difficulty"
                  name="difficulty"
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
                  className="appearance-none mb-5 bg-gray-800 rounded-lg border-none w-2/3 text-gray-50 py-3 px-2 leading-tight focus:outline-none"
                  placeholder="Duration in minutes.."
                />
              </div>
            </div>
            <div className="flex justify-end gap-x-2">
            <button
              type="submit"
              className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
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

export default EditActivityModal;

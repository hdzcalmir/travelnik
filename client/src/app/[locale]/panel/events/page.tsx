"use client";

import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";
import IsAuth from "@/hooks/isAuth";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import TableSkeleton from "@/components/panel/tableSkeleton/TableSkeleton";
import useEvents from "@/hooks/useEvents";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Events() {
  const { events, eventsLoading, deleteEventMutation } = useEvents();

  const handleDeleteVenture = async (id: string) => {
    await deleteEventMutation.mutateAsync({id});
  }

  if (eventsLoading) {
    const skeletonElements = Array.from({ length: 1 }, (_, index) => (
      <TableSkeleton key={index} />
    ));

    return (
      <div className="h-[90vh] w-full">
        <Sidebar></Sidebar>
        <div className="p-2 sm:p-4 sm:ml-64 h-full bg-gray-700">
          <Breadcrumb homeElement={"Home"}></Breadcrumb>
          {skeletonElements}
        </div>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="p-2 sm:p-4 sm:ml-64 h-full bg-panelBg">
        <Breadcrumb homeElement={"Home"}></Breadcrumb>
        <div className="flex flex-col w-full items-center border-gray-200 h-[80vh] dark:border-gray-700">
          <div className="flex flex-col shadow-lg items-center w-full h-full mb-4 rounded-lg bg-gray-800">
            <div className="flex h-10 mt-5  w-full px-5">
              <h2 className="text-gray-50 font-bold text-xl">Events</h2>
            </div>
            <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400">
              <thead className="text-xs border-b border-gray-700 uppercase bg-gray-800 text-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event) => (
                  <tr
                    key={event.id}
                    className="bg-gray-800 border-b border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {event.name}
                    </th>
                    <td className="px-6 py-4">{event.address}</td>
                    <td className="px-6 py-4">{event.category}</td>
                    <td className="px-6 py-4">{event.start_date}</td>
                    <td className="px-6 py-4">{event.end_date}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <a className="bg-[#ffffff1a] hover:bg-[#ffffff2d] text-md px-4 space-x-2 justify-center flex py-2 items-center text-gray-50 cursor-pointer rounded-lg font-semibold">
                        <span>Edit</span>
                        <FaEdit className="text-lg text-secondaryColor"></FaEdit>
                      </a>
                      <a onClick={() => { handleDeleteVenture(String(event.id)) }}
                        className="bg-[#ffffff1a] hover:bg-[#ffffff2d] text-md px-2 space-x-2 justify-center flex py-2 items-center text-gray-50 cursor-pointer rounded-lg font-semibold">
                        <MdDelete className="text-xl text-red-500"></MdDelete>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default IsAuth(Events);

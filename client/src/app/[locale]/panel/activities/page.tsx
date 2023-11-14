"use client";

import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";
import IsAuth from "@/hooks/isAuth";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import useActivities from "@/hooks/useActivities";
import TableSkeleton from "@/components/panel/tableSkeleton/TableSkeleton";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditActivityModal, { IActivityUpdate } from "@/components/panel/modals/EditActivtyModal";
import { IActivity } from "@/common/interfaces/IActivity";

function Activities() {
  const { activities, activitiesLoading, deleteActivityMutation } =
    useActivities();

  const handleDeleteVenture = async (id: string) => {
    await deleteActivityMutation.mutateAsync({ id });
  };

  const [isOpened, toggleModal] = useState(false);
  const [activity, setActivity] = useState<any>({
    id: "",
    name: "",
    description: "",
    category: "",
    duration: "",
    difficulty: "",
    latitude: 0,
    longitude: 0,
    address: "",
    city: "",
    country: "",
    postal_code: ""
  });


  if (activitiesLoading) {
    const skeletonElements = Array.from({ length: 1 }, (_, index) => (
      <TableSkeleton key={index} />
    ));

    return (
      <div className="h-[90vh]">
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
        <div className="flex flex-col w-full items-center  h-[80vh] border-gray-700">
          <div className="flex flex-col shadow-lg items-center w-full h-full mb-4 rounded-lg bg-gray-800">
            <div className="flex h-10 mt-5 w-full px-5">
              <h2 className="text-gray-50 font-bold text-xl">Activities</h2>
            </div>
            <div className="w-full overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
                <thead className="text-xs uppercase border-b border-gray-700 text-gray-100">
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
                  {activities?.map((activity) => (
                    <tr
                      key={activity.id}
                      className="bg-gray-800 border-b border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {activity.name}
                      </th>
                      <td className="px-6 py-4">{activity.address}</td>
                      <td className="px-6 py-4">{activity.category}</td>
                      <td className="px-6 py-4">{activity.difficulty}</td>
                      <td className="px-6 py-4">{activity.duration}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <a onClick={() => {
                          setActivity(activity);
                          toggleModal(true);
                        }} className="bg-[#ffffff1a] hover:bg-[#ffffff2d] text-md px-4 space-x-2 justify-center flex py-2 items-center text-gray-50 cursor-pointer rounded-lg font-medium">
                          <span>Edit</span>
                          <FaEdit className="text-lg text-secondaryColor"></FaEdit>
                        </a>
                        <a
                          onClick={() => {
                            handleDeleteVenture(String(activity.id));
                          }}
                          className="bg-[#ffffff1a] hover:bg-[#ffffff2d] text-md px-2 space-x-2 justify-center flex py-2 items-center text-gray-50 cursor-pointer rounded-lg font-medium"
                        >
                          <MdDelete className="text-xl text-red-500"></MdDelete>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {
                isOpened &&
                <EditActivityModal data={activity as IActivity} toggleModal={() => toggleModal(false)}></EditActivityModal>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default IsAuth(Activities);

"use client";

import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";
import IsAuth from "@/hooks/isAuth";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import TableSkeleton from "@/components/panel/tableSkeleton/TableSkeleton";
import useVentures from "@/hooks/useVentures";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaList } from "react-icons/fa";
import { IVenture } from "@/common/interfaces/IVenture";
import { useState } from "react";
import Card from "@/components/panel/card/card";
import { IoGrid } from "react-icons/io5";
import EditVentureModal from "@/components/panel/modals/EditVentureModal";
import { Utils } from "@/common/utils";

function Ventures() {
  const { ventures, venturesLoading, deleteVentureMutation } = useVentures();

  const [isOpened, toggleModal] = useState(false);
  const [cardView, toggleCardView] = useState(false);
  const [venture, setVenture] = useState<any>({
    id: "",
    name: "",
    category: "",
    description: "",
    opening_time: "",
    closing_time: "",
    latitude: 0,
    longitude: 0,
    address: "",
    city: "",
    country: "",
    postal_code: ""
  });

  if (venturesLoading) {
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
  const handleDeleteVenture = async (id: string) => {
    await deleteVentureMutation.mutateAsync({ id });
  };


  return (
    <div>
      <Sidebar></Sidebar>
      <div className="p-2 h-[100vh] sm:p-4 sm:ml-64 bg-panelBg">
        <div className="flex justify-between">
          <Breadcrumb homeElement={"Home"}></Breadcrumb>
          <div className="flex space-x-3 items-center">
            <div onClick={() => { toggleCardView(false) }} className="bg-transparentBtn cursor-pointer hover:bg-hoverBtn text-gray-50 p-3 rounded-lg"><FaList /></div>
            <div onClick={() => { toggleCardView(true) }} className="bg-transparentBtn cursor-pointer hover:bg-hoverBtn text-gray-50 p-3 rounded-lg"><IoGrid /></div>
          </div>
        </div>
        {!cardView &&
          <div className="flex flex-col w-full items-center border-gray-200 h-[80vh] dark:border-gray-700">
            <div className="flex flex-col shadow-lg items-center w-full h-full mb-4 rounded-lg bg-gray-800">
              <div className="flex h-10 mt-5  w-full px-5">
                <h2 className="text-gray-50 font-bold text-xl">Ventures</h2>
              </div>
              <div className="w-full overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
                  <thead className="text-xs  uppercase border-b border-gray-700 text-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
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
                        Opening Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Closing Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventures?.map((venture) => (
                      <tr
                        key={venture.id}
                        className="bg-gray-800 border-b border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {venture.id}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {venture.name}
                        </th>
                        <td className="px-6 py-4">{venture.address}</td>
                        <td className="px-6 py-4">{Utils.getCategory(venture.category)}</td>
                        <td className="px-6 py-4">{venture.opening_time}</td>
                        <td className="px-6 py-4">{venture.closing_time}</td>
                        <td className="px-6 py-4 flex space-x-2">
                          <a
                            onClick={() => {
                              setVenture(venture);
                              toggleModal(true);
                            }}
                            className="bg-[#ffffff1a] hover:bg-[#ffffff2d] text-md px-4 space-x-2 justify-center flex py-2 items-center text-gray-50 cursor-pointer rounded-lg font-medium">
                            <span>Edit</span>
                            <FaEdit className="text-lg text-secondaryColor"></FaEdit>
                          </a>
                          <a
                            onClick={() => {
                              handleDeleteVenture(String(venture.id));
                            }}
                            className="bg-[#ffffff1a] hover:bg-[#ffffff2d] text-md px-2 space-x-2 justify-center flex py-2 items-center text-gray-50 cursor-pointer rounded-lg font-semibold"
                          >
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
        }
        {cardView &&
          <div className="grid w-full grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-2 md:space-y-0 md:space-x-2">
            <Card data={ventures as Array<IVenture>} toggleModal={() => toggleModal(true)} setVenture={setVenture}></Card>
          </div>
        }
        {
          isOpened &&
          <EditVentureModal data={venture as IVenture} toggleModal={() => toggleModal(false)}></EditVentureModal>
        }
      </div>
      <Footer></Footer>
    </div>
  );
}
export default IsAuth(Ventures);
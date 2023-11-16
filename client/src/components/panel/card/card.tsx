import { IVenture } from "@/common/interfaces/IVenture";
import { Utils } from "@/common/utils";
import useVentures from "@/hooks/useVentures";
import { getHourFormat } from "@/value-converters/hours";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface CardProps {
  data: Array<IVenture>;
  toggleModal: () => void;
  setVenture: any;
}

const Card: React.FC<CardProps> = ({ data, toggleModal, setVenture }) => {
  const { deleteVentureMutation } = useVentures();

  const handleDeleteVenture = async (id: string) => {
    await deleteVentureMutation.mutateAsync({ id });
  };

  return (
    <>
      {data.map((location, index) => (
        <div
          key={index}
          className={`max-w-sm ${
            index === 0 ? "mt-4 ml-4" : ""
          } h-96 shadow-lg flex flex-col justify-between rounded-xl bg-gray-800`}
        >
          <div className="space-y-5">
            <div className="tracking-tight flex justify-center border-gray-600 border-b">
              <h5 className="text-2xl p-4 text-white">{location.name}</h5>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex">
                <div className="font-normal text-sm text-gray-400 w-1/3">
                  Street:
                </div>
                <div className="w-2/3 text-gray-50 text-sm">
                  {location.address}
                </div>
              </div>
              <div className="flex">
                <div className="font-normal text-sm text-gray-400 w-1/3">
                  Category:
                </div>
                <div className="w-2/3 text-gray-50 text-sm">
                  {Utils.getCategory(location.category)}
                </div>
              </div>
              <div className="flex mt-1 text-sm space-x-4">
                <div className="font-normal text-gray-200">
                  <span className="text-gray-400">Opening time: </span>
                  {getHourFormat(location.opening_time)}
                </div>
                <div className="font-normal text-gray-200">
                  <span className="text-gray-400">Closing time: </span>
                  {getHourFormat(location.closing_time)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-5 justify-center gap-x-2">
            <button
              className="text-white inline-flex items-center bg-transparentBtn hover:bg-hoverBtn focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
              onClick={() => {
                handleDeleteVenture(String(location.id));
              }}
            >
              <span className="mr-2">Delete</span>
              <MdDelete className="text-xl text-red-500" />
            </button>
            <button
              onClick={() => {
                setVenture(location);
                toggleModal();
              }}
              className="text-white inline-flex items-center bg-transparentBtn hover:bg-hoverBtn focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center"
            >
              <span className="mr-2">Edit</span>
              <FaEdit className="text-lg text-green-500" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;

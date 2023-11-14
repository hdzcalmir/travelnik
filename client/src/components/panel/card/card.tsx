import { IVenture } from '@/common/interfaces/IVenture';
import { Utils } from '@/common/utils';
import useVentures from '@/hooks/useVentures';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface CardProps {
    data: Array<IVenture>;
    toggleModal: () => void;
}

const Card: React.FC<CardProps> = ({ data, toggleModal }) => {

    const { deleteVentureMutation, updateVentureMutation } = useVentures();

    const handleDeleteVenture = async (id: string) => {
        await deleteVentureMutation.mutateAsync({ id });
      };

    const handleUpdateVenture = async (id: string) => {
        await deleteVentureMutation.mutateAsync({ id });
      };

    return (
        <>
            {data.map((location, index) => (
                <div key={index} className="max-w-sm p-6 shadow-lg h-96 flex flex-col justify-between rounded-xl bg-gray-800">
                    <div className="space-y-5">
                        <a href="#" className="text-2xl tracking-tight text-white">
                            <h5>{location.name}</h5>
                        </a>
                        <div className="space-y-2">
                            <div className="font-normal text-gray-200"><span className="text-gray-400">Description: </span>{location.description}</div>
                            <div className="font-normal text-gray-200"><span className="text-gray-400">Address: </span>{location.address}</div>
                            <div className="font-normal text-gray-200"><span className="text-gray-400">Category: </span>{Utils.getCategory(location.category)}</div>
                            <div className="flex mt-1 space-x-4">
                                <div className="font-normal text-gray-200"><span className="text-gray-400">Opening time: </span>{location.opening_time}</div>
                                <div className="font-normal text-gray-200"><span className="text-gray-400">Closing time: </span>{location.closing_time}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-x-2">
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
                            toggleModal()
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

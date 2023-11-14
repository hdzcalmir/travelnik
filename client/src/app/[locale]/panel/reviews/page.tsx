"use client";

import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";
import IsAuth from "@/hooks/isAuth";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import TableSkeleton from "@/components/panel/tableSkeleton/TableSkeleton";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import useReviews from "@/hooks/useReviews";
import moment from "moment";

function Reviews() {
    const { reviews, reviewsLoading, deleteReviewMutation } = useReviews();

    const [isOpened, toggleModal] = useState(false);

    if (reviewsLoading) {
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
    const handleDeleteReview = async (id: string) => {
        await deleteReviewMutation.mutateAsync({ id });
    };


    return (
        <div>
            <Sidebar></Sidebar>
            <div className="p-2 h-[100vh] sm:p-4 sm:ml-64 bg-panelBg">
                <div className="flex justify-between">
                    <Breadcrumb homeElement={"Home"}></Breadcrumb>
                </div>
                <div className="flex flex-col w-full items-center border-gray-200 h-[80vh] dark:border-gray-700">
                    <div className="flex flex-col shadow-lg items-center w-full h-full mb-4 rounded-lg bg-gray-800">
                        <div className="flex h-10 mt-5  w-full px-5">
                            <h2 className="text-gray-50 font-bold text-xl">Reviews</h2>
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
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Rating
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Entity ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews?.map((review) => (
                                        <tr
                                            key={review.id}
                                            className="bg-gray-800 border-b border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium whitespace-nowrap"
                                            >
                                                {review.id}
                                            </th>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium whitespace-nowrap"
                                            >
                                                {review.name}
                                            </th>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium whitespace-nowrap"
                                            >
                                                {moment(review.date).fromNow()}
                                            </th>
                                            <td className="px-6 py-4">{review.rate}</td>
                                            <td className="px-6 py-4">{review.entity_id}</td>
                                            <td className="px-6 py-4">{review.entity_type.charAt(0).toUpperCase() + review.entity_type.slice(1)}</td>
                                            <td className="px-6 py-4 flex space-x-2">
                                                <a
                                                    onClick={() => {
                                                        toggleModal(true);
                                                    }}
                                                    className="bg-[#ffffff1a] hover:bg-[#ffffff2d] text-md px-4 space-x-2 justify-center flex py-2 items-center text-gray-50 cursor-pointer rounded-lg font-medium">
                                                    <span>Approve</span>
                                                    <FaEdit className="text-lg text-secondaryColor"></FaEdit>
                                                </a>
                                                <a
                                                    onClick={() => {
                                                        handleDeleteReview(String(review.id));
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
                {/* {
                    isOpened &&
                    <EditVentureModal data={venture as IVenture} toggleModal={() => toggleModal(false)}></EditVentureModal>
                } */}
            </div>
            <Footer></Footer>
        </div>
    );
}
export default IsAuth(Reviews);
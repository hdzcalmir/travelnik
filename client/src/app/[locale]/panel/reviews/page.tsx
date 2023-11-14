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
import ReviewDetailsModal from "@/components/panel/modals/ReviewDetailsModal";
import { IReview } from "@/common/interfaces/IReview";

function Reviews() {
    const { unapprovedReviews, unapprovedReviewsLoading, deleteUnapprovedReviewMutation } = useReviews();

    const [isOpened, toggleModal] = useState(false);
    const [review, setReview] = useState<IReview>({
        id: -1,
        entity_id: -1,
        entity_type: "",
        name: "",
        date: "",
        text: "",
        rate: 1,
        images: [],
        approved: 0,
    });

    if (unapprovedReviewsLoading) {
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
        await deleteUnapprovedReviewMutation.mutateAsync({ id });
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
                                    {unapprovedReviews?.map((review) => (
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
                                            <td className="px-6 py-4 flex items-center">
                                                <div className="mt-4 flex">

                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                    {review.rate}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{review.entity_id}</td>
                                            <td className="px-6 py-4">{review.entity_type.charAt(0).toUpperCase() + review.entity_type.slice(1)}</td>
                                            <td className="px-6 py-4 flex space-x-2">
                                                <a
                                                    onClick={() => {
                                                        setReview(review)
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
                {
                    isOpened &&
                    <ReviewDetailsModal data={review as IReview} toggleModal={() => toggleModal(false)} />
                }
            </div>
            <Footer></Footer>
        </div>
    );
}
export default IsAuth(Reviews);
"use client"

import Footer from "@/components/panel/layout/footer/Footer";
import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import IsAuth from "@/hooks/isAuth";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import TableSkeleton from "@/components/panel/tableSkeleton/TableSkeleton";
import useEvents from "@/hooks/useEvents";


function Events() {

    const { events, eventsLoading } = useEvents();

    if (eventsLoading) {

        const skeletonElements = Array.from({ length: 1 }, (_, index) => (
            <TableSkeleton key={index} />
        ));

        return (
            <div className="h-[90vh] w-full">
                <Sidebar></Sidebar>
                <div className="p-2 sm:p-4 sm:ml-64 h-full bg-gray-700">
                    <Breadcrumb homeElement={'Home'}></Breadcrumb>
                    {skeletonElements}
                </div>
                <Footer></Footer>
            </div>
        )
    }

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="p-2 sm:p-4 sm:ml-64 h-full bg-gray-700">
                <Breadcrumb homeElement={'Home'}></Breadcrumb>
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
                                {events?.map((activity) => (
                                    <tr key={activity.id} className="bg-gray-800 border-b border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                            {activity.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {activity.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {activity.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {activity.start_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {activity.end_date}
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            <a href="#" className="bg-green-500 hover:bg-green-600 rounded-lg px-5 py-2 text-gray-50 font-semibold">Edit</a>
                                            <a href="#" className="bg-red-500 hover:bg-red-600 rounded-lg px-5 py-2 text-gray-50 font-semibold">Delete</a>
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
    )
}
export default IsAuth(Events);
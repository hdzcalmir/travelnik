"use client"

import Footer from '@/components/panel/layout/footer/footer';
import Sidebar from '@/components/panel/layout/sidebar/sidebar';
import IsAuth from '@/hooks/isAuth';
import { NextPage } from 'next';
import Map from '@/components/map/map';

const Dashboard: NextPage = () => {


    return (
        <div>
            <Sidebar></Sidebar>
            <div className="p-4 sm:ml-64 h-full">
                <div className="border-b-2 border-teal-500">
                    <h1 className="text-teal-500 font-bold text-2xl">Dashboard</h1>
                </div>
                <div className="p-4 border-gray-200 h-full dark:border-gray-700">
                    <div className="h-96">
                        <Map></Map>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50">
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28">
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default IsAuth(Dashboard)
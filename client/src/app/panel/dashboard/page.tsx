"use client"

import Footer from '@/components/panel/layout/footer/footer';
import Sidebar from '@/components/panel/layout/sidebar/sidebar';
import IsAuth from '@/hooks/isAuth';
import { NextPage } from 'next';
import Map from '@/components/map/map';
import VenturesNumber from '@/components/panel/dashboardNumbers/DashboardNumbers';

const Dashboard: NextPage = () => {

    return (
        <div className="h-[100vh]">
            <Sidebar></Sidebar>
            <div className="p-4 sm:ml-64 h-full">
                <div className="border-b-2 border-primaryColor">
                    <h1 className="text-primaryColor font-bold text-2xl">Dashboard</h1>
                </div>
                <div className="p-4 space-y-4 border-gray-200 h-full dark:border-gray-700">
                    <VenturesNumber></VenturesNumber>
                    <div className="h-2/3 mb-10">
                        <Map></Map>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default IsAuth(Dashboard)
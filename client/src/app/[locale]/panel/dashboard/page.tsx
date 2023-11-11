"use client";

import IsAuth from "@/hooks/isAuth";
import { NextPage } from "next";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import Map from "@/components/map/map";
import VenturesNumber from "@/components/panel/dashboardNumbers/DashboardNumbers";
import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";

const Dashboard: NextPage = () => {
  return (
    <div className="h-[100vh] bg-panelBg">
      <Sidebar></Sidebar>
      <div className="sm:ml-64 p-4 h-full">
        <Breadcrumb homeElement={"Home"}></Breadcrumb>
        <div className="space-y-4 border-gray-200 h-full dark:border-gray-700">
          <VenturesNumber></VenturesNumber>
          <div className="h-3/4 mb-10">
            <Map></Map>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default IsAuth(Dashboard);

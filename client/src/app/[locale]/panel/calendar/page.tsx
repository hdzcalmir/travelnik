"use client";

import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";
import IsAuth from "@/hooks/isAuth";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import useEvents from "@/hooks/useEvents";
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function Calendar() {
  const { eventsLoading } = useEvents();


  return (
    <div>
      <Sidebar></Sidebar>
      <div className="p-2 sm:p-4 sm:ml-64 h-full bg-panelBg">
        <Breadcrumb homeElement={"Home"}></Breadcrumb>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
      </div>
      <Footer></Footer>
    </div>
  );
}
export default IsAuth(Calendar);

"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/panel/layout/sidebar/Sidebar";
import Footer from "@/components/panel/layout/footer/Footer";
import IsAuth from "@/hooks/isAuth";
import Breadcrumb from "@/components/panel/layout/breadcrumb/Breadcrumb";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import useEvents from '@/hooks/useEvents';
import TableSkeleton from '@/components/panel/tableSkeleton/TableSkeleton';
import { convertDateMapFormat } from '@/value-converters/date';

class EventMap {
  title: string;
  start: string;
  end: string;

  constructor(title: string, start: string, end: string) {
    this.title = title;
    this.start = convertDateMapFormat(start);
    this.end = convertDateMapFormat(end);
  }
}

function Calendar() {

  const eventsMap: EventMap[] = [];
  const { events, eventsLoading } = useEvents();

  const [view, setView] = useState('dayGridMonth');

  if (eventsLoading) {
    const skeletonElements = Array.from({ length: 1 }, (_, index) => (
      <TableSkeleton key={index} />
    ));

    return (
      <div className="h-[90vh] w-full">
        <Sidebar></Sidebar>
        <div className="p-2 sm:p-4 sm:ml-64 h-full bg-gray-700">
          <Breadcrumb homeElement={"Home"}></Breadcrumb>
          {skeletonElements}
        </div>
        <Footer></Footer>
      </div>
    );
  } else {
    events?.map((event) => {
      let ev = new EventMap(event.name, event.start_date, event.end_date);
      eventsMap.push(ev);
    })
  }


  return (
    <div>
      <Sidebar></Sidebar>
      <div className="p-2 sm:p-4 sm:ml-64 h-2/3 bg-panelBg">
        <Breadcrumb homeElement={"Home"}></Breadcrumb>
        <div className="w-2/3 mx-auto">
          <div className="flex space-x-2 justify-end mb-2">
            <button onClick={() => { setView('dayGridMonth') }} className={`${view === 'dayGridMonth' ? 'bg-secondaryColor': 'bg-transparentBtn hover:bg-hoverBtn'} rounded-lg text-gray-50 p-2`}>Month</button>
            <button onClick={() => { setView('dayGridWeek') }} className={`${view === 'dayGridWeek' ? 'bg-secondaryColor': 'bg-transparentBtn hover:bg-hoverBtn'} rounded-lg text-gray-50 p-2`}>Week</button>
            <button onClick={() => { setView('listWeek') }} className={`${view === 'listWeek' ? 'bg-secondaryColor': 'bg-transparentBtn hover:bg-hoverBtn'} rounded-lg text-gray-50 p-2`}>Day</button>
          </div>
          <FullCalendar
            initialView={view}
            events={eventsMap}
            plugins={[dayGridPlugin, interactionPlugin]}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default IsAuth(Calendar);

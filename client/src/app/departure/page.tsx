"use client";

import { IActivity } from "@/common/interfaces/IActivity";
import { IEvent } from "@/common/interfaces/IEvent";
import AccommodationList from "@/components/home/accommodation/AccommodationList";
import Navbar from "@/components/home/navbar/Navbar";
import useAccommodations from "@/hooks/useAccommodations";
import ActivityAPI from "@/interceptor/Activity/Activity";
import EventAPI from "@/interceptor/Event/Event";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ActivityTable from "@/components/home/departure/ActivityTable";
import EventCalendar from "@/components/home/departure/EventCalendar/EventCalendar";
import Map from "@/components/map/map";

const AboutPage = () => {
  // >> React Hooks
  const params = useSearchParams();
  const router = useRouter();

  // >> States & Hooks
  const { accommodations, accommodationsLoading } = useAccommodations();
  const [activities, setActivities] = useState<IActivity[]>();
  const [events, setEvents] = useState<IEvent[]>();

  // >> Filters
  const interests = params.get("interests");
  const check_in = params.get("check_in");
  const check_out = params.get("check_out");
  const people = params.get("people");

  const startDate = check_in ? new Date(check_in) : undefined;
  const endDate = check_out ? new Date(check_out) : undefined;

  useEffect(() => {
    if (!interests || !check_in || !check_out || !people) {
      return router.push('/');
    }

    // >> Fetch relevant data from back-end API  
    const fetchActivities = async () => {
      const response = await ActivityAPI.fetchActivitiesWithFilters(
        interests,
        check_in,
        check_out,
        people
      );
      setActivities(response.data);
    };

    const fetchEvents = async () => {
      const response = await EventAPI.fetchEventsWithFilters(
        interests,
        check_in,
        check_out,
        people
      );
      setEvents(response.data);
    };

    fetchActivities();
    fetchEvents();
  }, [router, interests, check_in, check_out, people]);
  console.log(events);
  return (
    <>
      <Navbar />
      <div className="grid xl:grid-cols-3 grid-rows-1 grid-cols-1">
        <div className="col-span-2">
          <div className="h-[680px] w-full rounded-lg">
            <Map />
          </div>
          <ActivityTable activities={activities} />
        </div>
        <div className="pb-4 xs:w-full bg-gray-800 pt-4 xl:pt-0">
          <EventCalendar
            startDate={startDate}
            endDate={endDate}
            events={events}
          />
          <div className="mx-2 mt-4">
            <h2 className="text-3xl font-bold mx-2 text-white mb-2">
              Available apartments
            </h2>
            <div className="overflow-y-auto h-[68vh] px-2 scrollbar-hidden">
              <AccommodationList
                accommodations={accommodations}
                accommodationsLoading={accommodationsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

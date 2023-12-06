"use client";

import Navbar from "@/components/home/navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/home/footer/Footer";
import Map from "@/components/map/Map";
import ActivityAPI from "@/interceptor/Activity/Activity";
import { IActivity } from "@/common/interfaces/IActivity";
import { parseDurationToSeconds } from "@/value-converters/parseDuration";
import Timer from "@/components/home/departure/Timer/Timer";
import ActivityInfo from "@/components/home/departure/ActivityInfo/ActivityInfo";

const ActivityStartPage = () => {
  // >> React Hooks
  const params = useSearchParams();
  const router = useRouter();

  // >> States
  const [activities, setActivities] = useState<IActivity[]>();
  const [currentActivity, setCurrentActivity] = useState<IActivity>();

  const [time, setTime] = useState<Date>(new Date());

  // >> Filters
  const interests = params.get("interests");
  const check_in = params.get("check_in");
  const check_out = params.get("check_out");
  const people = params.get("people");
  const activityId = params.get("activity");


  useEffect(() => {
    const fetchData = async () => {
      if (!interests || !check_in || !check_out || !people) {
        return router.push("/");
      }

      try {
        const response = await ActivityAPI.fetchActivitiesWithFilters(
          interests,
          check_in,
          check_out,
          people
        );

        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchData();
  }, [router, interests, check_in, check_out, people]);

  useEffect(() => {
    if (activities && activityId && !currentActivity) {
      setActivities((prevActivities) => {
        const newActivity = prevActivities?.find(
          (activity) => activity.id == activityId
        );
        if (newActivity) {
          setCurrentActivity(newActivity);
          if (newActivity?.duration) {
            const seconds = parseDurationToSeconds(newActivity?.duration);

            let currentDate = new Date();
            currentDate.setSeconds(currentDate.getSeconds() + seconds);

            if (currentDate > new Date()) {
              setTime(currentDate);
            }
          }
        }
        return prevActivities;
      });
    }
  }, [activities, activityId, currentActivity]);



  return (
    <>
      <Navbar />
      <div className="relative h-[85vh] lg:h-[80vh] w-full">
        <Map />
        <div className="bg-gray-800/80 absolute bottom-0 z-10 w-full border-t-2 backdrop-blur-md border-t-gray-800">
          <div className="flex lg:justify-between flex-row-reverse lg:flex-row">
            <ActivityInfo currentActivity={currentActivity} />
            <Timer expiryTimestamp={time} currentActivity={currentActivity} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ActivityStartPage;

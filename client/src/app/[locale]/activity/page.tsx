"use client";

import Navbar from "@/components/home/navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/home/footer/Footer";
import { useTranslations } from "next-intl";
import Map from "@/components/map/Map";
import { MdAddLocationAlt, MdCategory } from "react-icons/md";
import { FaClock, FaMapMarkedAlt } from "react-icons/fa";
import ActivityAPI from "@/interceptor/Activity/Activity";
import { IActivity } from "@/common/interfaces/IActivity";
import { parseDuration } from "@/value-converters/parseDuration";
import { useDispatch } from "react-redux";
import Timer from "@/components/home/departure/Timer/Timer";

const ActivityStartPage = () => {
  // >> React Hooks
  const params = useSearchParams();
  const router = useRouter();
  const t = useTranslations("Reviews");

  // >> States
  const [activities, setActivities] = useState<IActivity[]>();
  const [currentActivity, setCurrentActivity] = useState<IActivity>();

  const [time, setTime] = useState<{
    miliSecond: number;
    second: number;
    minute: number;
    formattedHours?: string;
    formattedMinutes?: string;
    formattedSeconds?: string;
  }>({
    miliSecond: 0,
    second: 0,
    minute: 0,
    formattedHours: "00",
    formattedMinutes: "00",
    formattedSeconds: "00",
  });

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
            const { formattedHours, formattedMinutes, formattedSeconds } =
              parseDuration(newActivity?.duration);

            setTime((prevTime) => ({
              ...prevTime,
              formattedHours,
              formattedMinutes,
              formattedSeconds,
            }));
          }
        }
        return prevActivities;
      });
    }
  }, [activities, activityId, currentActivity]);

  return (
    <>
      <Navbar />
      <div className="relative h-screen lg:h-[80vh] w-full">
        <Map />
        <div className="bg-gray-800/80 absolute bottom-0 z-10 w-full border-t-2 backdrop-blur-md border-t-gray-800">
          <div className="flex lg:justify-between flex-col-reverse lg:flex-row">
            <div className="text-white">
              <div className="flex p-4 flex-col lg:flex-row">
                <div className="bg-secondaryColor rounded-lg w-min mx-auto lg:mx-0">
                  <FaMapMarkedAlt className="w-40 h-40 p-4 text-white" />
                </div>
                <div className="ml-4">
                  <div className="flex text-white text-xl justify-center lg:justify-normal">
                    {currentActivity?.name}
                  </div>
                  <p className="w-[70%] mx-auto lg:mx-0 text-gray-400">
                    {currentActivity?.description}
                  </p>
                  <p className="flex flex-col space-y-2 ">
                    <span className="text-gray-300 font-semibold flex items-center justify-center lg:justify-normal">
                      <MdCategory className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                      {t("Category")}:{" "}
                      <span className=" text-gray-400 ml-2 font-normal">
                        {currentActivity?.category}
                      </span>
                    </span>
                    <span className="text-gray-300 font-semibold flex items-center justify-center lg:justify-normal">
                      <MdAddLocationAlt className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                      {t("Address")}:{" "}
                      <span className=" text-gray-400 ml-2 font-normal">
                        {currentActivity?.address}
                      </span>
                    </span>
                    <span className="text-gray-300 font-semibold flex items-center justify-center lg:justify-normal">
                      <FaClock className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                      {t("Duration")}:{" "}
                      <span className=" text-gray-400 ml-2 font-normal">
                        {currentActivity?.duration}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <Timer expiryTimestamp={1000} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ActivityStartPage;

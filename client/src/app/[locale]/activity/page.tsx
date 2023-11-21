"use client";

import Navbar from "@/components/home/navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/home/footer/Footer";
import { useTranslations } from "next-intl";
import Map from "@/components/map/Map";
import { MdAddLocationAlt, MdCategory } from "react-icons/md";
import { FaClock, FaMapMarkedAlt } from "react-icons/fa";

const DeparturePage = () => {
    // >> React Hooks
    const params = useSearchParams();
    const router = useRouter();
    const t = useTranslations("Reviews");
    const [time, setTime] = useState({ miliSecond: 0, second: 0, minute: 0 });

    // >> Filters
    const interests = params.get("interests");
    const check_in = params.get("check_in");
    const check_out = params.get("check_out");
    const people = params.get("people");
    const activity = params.get("activity");

    const startDate = check_in ? new Date(check_in) : undefined;
    const endDate = check_out ? new Date(check_out) : undefined;

    useEffect(() => {
        if (!interests || !check_in || !check_out || !people) {
            return router.push("/");
        }
    }, [router, interests, check_in, check_out, people]);

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
                                        Test
                                    </div>
                                    <p className="w-[70%] mx-auto lg:mx-0 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod hic laborum, quia at alias ex quidem maiores, nobis expedita, assumenda ad facere quaerat. Earum id dolorem minima, deleniti quidem ducimus?</p>
                                    <p className="flex flex-col space-y-2 ">
                                        <span className="text-gray-300 font-semibold flex items-center justify-center lg:justify-normal">
                                            <MdCategory className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                                            {t("Category")}:{" "}
                                            <span className=" text-gray-400 ml-2 font-normal">
                                                Hiking
                                            </span>
                                        </span>
                                        <span className="text-gray-300 font-semibold flex items-center justify-center lg:justify-normal">
                                            <MdAddLocationAlt className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                                            {t("Address")}:{" "}
                                            <span className=" text-gray-400 ml-2 font-normal">
                                                Test
                                            </span>
                                        </span>
                                        <span className="text-gray-300 font-semibold flex items-center justify-center lg:justify-normal">
                                            <FaClock className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                                            {t("Duration")}:{" "}
                                            <span className=" text-gray-400 ml-2 font-normal">
                                                00:00:00
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto lg:mr-10 bg-gray-200 dark:bg-primaryColor border-8 border-gray-600 dark:border-secondaryColor drop-shadow-lg m-4 p-2 rounded-full lg:w-40 lg:h-40 h-72 w-72 flex flex-col items-center justify-center shadow-lg">
                            <h1 className="mt-3 text-3xl lg:text-2xl text-primaryColor dark:text-gray-100">
                                {time.minute < 10 ? "0" + time.minute : time.minute}:
                                {time.second < 10 ? "0" + time.second : time.second}:
                                {time.miliSecond < 100
                                    ? "0" + (time.miliSecond / 10).toFixed(0)
                                    : (time.miliSecond / 10).toFixed(0)}
                            </h1>
                            <button className="text-white bg-red-400 rounded-lg px-4 py-2 text-lg lg:text-md">Stop</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DeparturePage;

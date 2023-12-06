"use client"

import { MdAddLocationAlt, MdCategory } from "react-icons/md";
import { FaClock, FaMapMarkedAlt } from "react-icons/fa";
import { IActivity } from "@/common/interfaces/IActivity";
import { useTranslations } from "next-intl";

interface ActivityInfoProps {
    currentActivity: IActivity | undefined;
}

const ActivityInfo = ({ currentActivity }: ActivityInfoProps) => {
    const t = useTranslations("Reviews");

    return (
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
    );
}

export default ActivityInfo;
"use client";

import { IActivity } from "@/common/interfaces/IActivity";
import { Utils } from "@/common/utils";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ActivityCardProps {
  activity: IActivity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const t = useTranslations("ActivityTable");
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const durationFromDatabase = activity.duration;

  const parts = durationFromDatabase.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}h`;
  const averageRate = Utils.calculateRate(activity.reviews as IReview[]);

  const openActivityModal = () => {
    router.push(path + "?" + searchParams + `&activity=${activity.id}`);
  };

  return (
    <tr
      className="border-b dark:border-gray-700 hover:bg-gray-700 transition duration-500 cursor-pointer"
      onClick={() => openActivityModal()}
    >
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {activity.name}
      </th>
      <td className="px-4 py-3">{activity.category}</td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="text-gray-400 font-bold text-sm ml-1">
            {averageRate}
            <span className="text-gray-400 font-normal">
              ({activity.reviews?.length > 0 ? activity.reviews?.length : 0}{" "}
              {t("reviews")})
            </span>
          </p>
        </div>
      </td>
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <p>{t(activity.difficulty)}</p>
        <div className="w-20 lg:w-48 h-1.5 bg-white overflow-hidden rounded-full">
          <div
            className={` ${
              activity.difficulty === "Easy"
                ? "w-1/4 bg-green-400"
                : activity.difficulty === "Medium"
                ? "w-2/3 bg-orange-400"
                : "w-full bg-red-400"
            } h-1.5`}
          ></div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="bg-red-400 rounded text-white justify-center flex text-sm">
          {t("Not completed")}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="px-1 flex items-center font-semibold bg-gray-700 rounded-lg border border-gray-600 justify-center py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            ></path>
          </svg>
          {formattedDuration}
          <button className="text-white bg-green-500 rounded-lg ml-2 p-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="#EDF3F0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
                fill="#EDF3F0"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ActivityCard;

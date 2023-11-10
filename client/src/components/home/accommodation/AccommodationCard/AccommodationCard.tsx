"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface IAccommodation {
  id: number;
  source: string;
  image: string;
  title: string;
  rating: number;
  price: number;
  distance_from_center: number;
  reviews: number;
  status: string;
  longitude: number;
  latitude: number;
  check_in_time: string;
  check_out_time: string;
  address: string;
}

const AccommodationCard = (data: IAccommodation) => {
  const t = useTranslations('Accommodations');

  return (
    <div className="md:max-w-2xl xs:max-w-sm sm:max-w-xs">
      <Link href={data.source} target="_blank" className="space-y-10">
        <div className="mb-4 cursor-pointer relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 xs:max-w-sm sm:max-w-xs md:max-w-2xl bg-gray-700">
          <div className="w-full md:w-1/3 bg-gray-700 grid place-items-center text-gray-800">
            <Image
              src={data.image.replace("square60", "square600")}
              alt={data.title}
              className="rounded-xl"
              width={400}
              height={400}
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-2/3 bg-gray-700 flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">
              <p className="text-gray-300 font-medium md:block">
                {data.status ? data.status : t("No reviews")}
              </p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-white font-bold text-sm ml-1">
                  {data.rating}
                  <span className="text-gray-300 font-normal">
                    ({data.reviews} {t('reviews')})
                  </span>
                </p>
              </div>
              <div className="bg-gray-500 px-3 py-1 rounded-full text-xs font-medium text-white hidden md:block">
                Booking.com
              </div>
            </div>
            <h3 className="font-bold text-white md:text-3xl text-xl">
              {data.title}
            </h3>
            <p className="md:text-md text-gray-300 text-base">
              <span className="text-white font-bold">{t('Address')}:</span>{" "}
              {data.address} <br></br>{" "}
              <span className="text-white font-bold">
                {t('Distance from center')}:
              </span>{" "}
              {data.distance_from_center}km <br></br>{" "}
              <span className="text-white font-bold">{t('Check-in time')}:</span>{" "}
              {data.check_in_time}h |{" "}
              <span className="text-white font-bold">{t('Check-out time')}:</span>{" "}
              {data.check_out_time}h
            </p>
            <p className="text-xl font-black text-white">
              €{data.price}
              <span className="font-normal text-gray-300 text-base">/{t('day')}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AccommodationCard;

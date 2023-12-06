"use client";

import ChatIcon from "@/components/home/chat/Icon";
import Footer from "@/components/home/footer/Footer";
import Navbar from "@/components/home/navbar/Navbar";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaSearchLocation } from "react-icons/fa";
import { Parallax } from "react-parallax";

const AboutPage = () => {
  const locale = useLocale();
  const t = useTranslations("About");
  return (
    <div className="bg-gray-800">
      <Navbar />
      <div className="bg-gray-800">
        <Parallax
          bgImage={`/images/travnik-14-${locale}.png`}
          className="object-cover"
          strength={500}
        >
          <div className="relative h-[50rem]">
            <Image
              src="/images/travnik-15.png"
              width={1900}
              height={400}
              className="absolute w-full h-full object-cover"
              alt="Travnik header picture"
            />
          </div>
        </Parallax>
      </div>
      <section className="text-white bg-gray-800 mt-12">
        <div className="mx-auto flex pb-4 md:flex-row flex-col sm:items-center">
          <div className="lg:max-w-3xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <Image
              src="/images/travelnik-phone.png"
              alt="Travelnik phone mock"
              height={400}
              width={1200}
            />
          </div>
          <div className="md:w-1/2 flex flex-col md:items-start md:text-left text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-white">
              <h2 className="text-xs text-secondaryColor tracking-widest font-medium title-font mb-1">
                {t("description")}
              </h2>
              {t("header_1")}
            </h1>
            <p className="mb-8 leading-relaxed text-gray-300">{t("text_1")}</p>
            <div className="space-y-4 space-x-4">
              <Link href="/">
                <button className="ml-4 xl:ml-0 bg-gray-600 transition duration-500 w-3/4 sm:w-auto inline-flex py-3 px-5 rounded-lg items-center md:mt-4 mt-0 lg:mt-0 hover:bg-gray-500 focus:outline-none">
                  <FaSearchLocation className="w-6 h-6" />
                  <span className="ml-4 flex items-start flex-col leading-none">
                    <span className="text-xs text-white mb-1">
                      {t("button_1")}
                    </span>
                    <span className="title-font font-medium">
                      {t("button_2")}
                    </span>
                  </span>
                </button>
              </Link>
              <button className="bg-gray-600 transition duration-500 w-3/4 sm:w-auto  inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-500 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                </svg>
                <span className="ml-4 flex items-start flex-col leading-none">
                  <span className="text-xs text-white mb-1">
                    {t("button_3")}
                  </span>
                  <span className="title-font font-medium">Google Play</span>
                </span>
              </button>
              <button className="bg-gray-600 transition duration-500 w-3/4 sm:w-auto  inline-flex py-3 px-5 rounded-lg items-center   md:ml-0 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-500 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 305 305"
                >
                  <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                  <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                </svg>
                <span className="ml-4 flex items-start flex-col leading-none">
                  <span className="text-xs text-white mb-1">
                    {t("button_4")}
                  </span>
                  <span className="title-font font-medium">App Store</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <Image
              src="/images/travnik-logo.png"
              className="h-96 dark:bg-gray-600 aspect-video"
              alt="Travelnik phone mock"
              height={400}
              width={400}
            />
            <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-700">
              <span className="text-xs uppercase text-secondaryColor">
                {t("description_2")}
              </span>
              <h3 className="text-3xl font-bold">{t("header_2")}</h3>
              <p className="my-6 dark:text-gray-400">{t("text_2")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-800 mt-16">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-secondaryColor tracking-widest font-medium title-font mb-1">
              {t("description_3")}
            </h2>
            <h1 className="text-2xl font-tiny mb-4 text-gray-300">
              {t("text_3")}
            </h1>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              {t("contact_us_header")}
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-400">
              {t("contact_us_description")}
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-400"
                  >
                    {t("namex")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t("name_text")}
                    className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-700 focus:border-secondaryColor focus:ring-2 focus:ring-gray-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("email_text")}
                    className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-700 focus:border-secondaryColor focus:ring-2 focus:ring-gray-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-400"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t("message_text")}
                    className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-700 focus:border-secondaryColor focus:ring-2 focus:ring-gray-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-secondaryColor/80 border-0 py-2 px-8 focus:outline-none hover:bg-secondaryColor transition duration-500 rounded text-lg">
                  {t("button_send")}
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-secondaryColor">info@travelnik.ba</a>
                <p className="leading-normal my-5 text-gray-400">
                  Slana Dolina
                  <br></br>Travnik, 72270
                </p>
                <span className="inline-flex">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-4 text-gray-500">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChatIcon />
      <Footer />
    </div>
  );
};

export default AboutPage;

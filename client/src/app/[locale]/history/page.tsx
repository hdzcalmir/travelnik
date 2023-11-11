"use client";

import Navbar from "@/components/home/navbar/Navbar";
import Footer from "@/components/home/footer/Footer";
import Image from "next/image";
import { Parallax } from "react-parallax";
import { useTranslations } from "next-intl";

const HistoryPage = () => {
  const t = useTranslations("History");

  return (
    <>
      <Navbar />
      <div className="bg-gray-800">
        <Parallax
          bgImage="/images/history-parallax-3.png"
          className="object-cover"
          strength={500}
        >
          <div className="relative h-[50rem]">
            <Image
              src="/images/history-parallax-2.png"
              width={1900}
              height={400}
              className="absolute w-full h-full object-cover"
              alt="Travnik header picture"
            />
          </div>
        </Parallax>
        <section className="text-white bg-gray-800">
          <div className="container px-5 pt-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h2 className="text-xs text-secondaryColor tracking-widest font-medium title-font mb-1">
                {t("description")}
              </h2>
              <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-white">
                {t("header_1")}
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">
                {t("text_1")}
              </p>
            </div>
          </div>
        </section>
        <section className="text-gray-600 overflow-hidden bg-gray-800">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <Image
                src="/images/travnik-12.png"
                alt="Travnik image"
                width={1200}
                height={200}
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-secondaryColor tracking-widest">
                  {t("description")}
                </h2>
                <h1 className="text-white text-3xl title-font font-medium mb-1">
                  {t("header_2")}
                </h1>
                <p className="leading-relaxed text-white text-lg">
                  {t("text_2")}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 pt-14 pb-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-secondaryColor tracking-widest">
                  {t("description")}
                </h2>
                <h1 className="text-white text-3xl title-font font-medium mb-1">
                  {t("header_3")}
                </h1>
                <p className="leading-relaxed text-white text-lg">
                  {t("text_3")}
                </p>
              </div>
              <Image
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src="/images/travnik-11.png"
                alt="Travnik castle picture"
                width={1000}
                height={500}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;

"use client";

import Navbar from "@/components/home/navbar/Navbar";
import Footer from "@/components/home/footer/Footer";
import { useTranslations } from "next-intl";
import Map from "@/components/map/Map";

const HistoryPage = () => {
    const t = useTranslations("Map");

    return (
        <>
            <Navbar />
            <div className="h-screen w-full">
                <Map />
            </div>
            <Footer />
        </>
    );
};

export default HistoryPage;

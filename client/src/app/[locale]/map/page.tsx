"use client";

import Navbar from "@/components/home/navbar/Navbar";
import Footer from "@/components/home/footer/Footer";
import Map from "@/components/map/Map";

const HistoryPage = () => {

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

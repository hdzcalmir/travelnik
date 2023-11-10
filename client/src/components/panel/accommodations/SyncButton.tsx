"use client"

import AccommodationAPI from "@/interceptor/Accommodation/Accommodation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSync } from "react-icons/fa";

const AccommodationsSyncButton = () => {
    const [syncInProgress, setSyncInProgress] = useState<boolean>(false);


    const handleAccommodationSync = async () => {
        if (syncInProgress) return;
        try {
            setSyncInProgress(true);
            toast.success("Synchronization is successfully started.");
            const response = await AccommodationAPI.updateAccommodations();

            if (response.status === 200) {
                setSyncInProgress(false);
                toast.success("Accommodations successfully updated.");
            }
        } catch (error) {
            setSyncInProgress(false);
            toast.error("Accommodations synchronization failed.");
        }
    }

    return (
        <button onClick={handleAccommodationSync} className="mt-8 rounded-lg transition duration-500 hover:bg-secondaryColor text-white py-2 px-4 flex items-center mx-auto bg-secondaryColor/80"><FaSync className={`mr-1 ${syncInProgress ? "animate-spin" : ""}`} /> Sync Apartments</button>
    );
}


export default AccommodationsSyncButton;
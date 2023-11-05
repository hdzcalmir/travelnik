"use client"

import { IActivity } from "@/common/interfaces/IActivity";
import { IEvent } from "@/common/interfaces/IEvent";
import { IVenture } from "@/common/interfaces/IVenture";
import AccommodationList from "@/components/home/accommodation/AccommodationList";
import Navbar from "@/components/home/navbar/Navbar"
import useAccommodations from "@/hooks/useAccommodations";
import ActivityAPI from "@/interceptor/Activity/Activity";
import BusinessAPI from "@/interceptor/Business/Business";
import EventAPI from "@/interceptor/Event/Event";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AboutPage = () => {
    // >> React Hooks
    const params = useSearchParams();
    const router = useRouter();

    // >> States & Hooks
    const { accommodations, accommodationsLoading } = useAccommodations();
    const [businesses, setBusinesses] = useState<IVenture[]>();
    const [activities, setActivities] = useState<IActivity[]>();
    const [events, setEvents] = useState<IEvent[]>();

    // >> Filters
    const interests = params.get('interests');
    const check_in = params.get('check_in');
    const check_out = params.get('check_out');
    const people = params.get('people');

    useEffect(() => {
        if (interests?.length === 0 || check_in?.length === 0 || check_out?.length === 0 || people?.length === 0) {
            router.push('/');
        }
        // >> Fetch relevant data from back-end API
        const fetchBusinesses = async () => {
            const response = await BusinessAPI.fetchBusinessesWithFilters(interests, check_in, check_out, people);
            setBusinesses(response.data);
        }

        const fetchActivities = async () => {
            const response = await ActivityAPI.fetchActivitiesWithFilters(interests, check_in, check_out, people);
            setActivities(response.data);
        }

        const fetchEvents = async () => {
            const response = await EventAPI.fetchEventsWithFilters(interests, check_in, check_out, people);
            setEvents(response.data);
        }

        fetchBusinesses();
        fetchActivities();
        fetchEvents();
    }, [router, interests, check_in, check_out, people])

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-3 grid-rows-1 mt-6 mx-4">
                <div></div>
                <div></div>
                <div className=" rounded-xl py-4">
                    <h2 className="text-3xl font-bold mb-2 mx-2">Available apartments:</h2>
                    <div className="overflow-y-auto h-[84vh]">
                        <AccommodationList accommodations={accommodations} accommodationsLoading={accommodationsLoading} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;
"use client"

import useAccommodations from "@/hooks/useAccommodations";
import AccommodationCard, { IAccommodation } from "./AccommodationCard/AccommodationCard";

interface AccommodationListProps {
    accommodations: IAccommodation[] | undefined;
    accommodationsLoading: boolean;
}

const AccommodationList = ({ accommodations, accommodationsLoading }: AccommodationListProps) => {
    if (accommodationsLoading) return <div>Loading</div>;
    return (
        <>
            {accommodations &&
                accommodations.map((accommodation) => (
                    <AccommodationCard key={accommodation.id} {...accommodation} />
                ))
            }

        </>
    );
}

export default AccommodationList;
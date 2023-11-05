"use client"

import AccommodationCard, { IAccommodation } from "./AccommodationCard/AccommodationCard";
import AccommodationSkeleton from "./AccommodationCard/AccommodationSkeleton";

interface AccommodationListProps {
    accommodations: IAccommodation[] | undefined;
    accommodationsLoading: boolean;
}

const AccommodationList = ({ accommodations, accommodationsLoading }: AccommodationListProps) => {
    if (accommodationsLoading) {

        const skeletonElements = Array.from({ length: 10 }, (_, index) => (
            <AccommodationSkeleton key={index} />
        ));

        return (
            <>
                {skeletonElements}
            </>
        )
    }
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
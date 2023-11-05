"use client"

import AccommodationList from "@/components/home/accommodation/AccommodationList";
import useAccommodations from "@/hooks/useAccommodations";

export default function Home() {
  const { accommodations, accommodationsLoading } = useAccommodations();

  return (
    <>
      <AccommodationList accommodations={accommodations} accommodationsLoading={accommodationsLoading} />
    </>
  )
}

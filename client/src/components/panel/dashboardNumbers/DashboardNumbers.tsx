"use client"
import React from "react";
import useVentures from "@/hooks/useVentures";
import DashboardSkeleton from "./DashboardSkeleton";
import useEvents from "@/hooks/useEvents";
import useActivities from "@/hooks/useActivities";

export default function VenturesNumber() {

  const { ventures, venturesLoading } = useVentures();
  const { events, eventsLoading } = useEvents();
  const { activities, activitiesLoading } = useActivities();

  if (venturesLoading || eventsLoading || activitiesLoading) {

    const skeletonElements = Array.from({ length: 1 }, (_, index) => (
      <DashboardSkeleton key={index} />
    ));

    return (
      <>
        {skeletonElements}
      </>
    )

  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="w-full px-4 bg-gray-600 py-5 rounded-lg shadow-lg">
        <div className="text-sm font-medium text-gray-100 truncate">
          Ventures
        </div>
        {ventures && (
          <div className="mt-1 text-3xl font-semibold text-gray-50">
            {ventures.length}
          </div>
        )}
      </div>
      <div className="w-full px-4 py-5 bg-gray-600 rounded-lg shadow-lg">
        <div className="text-sm font-medium text-gray-100 truncate">
          Activities
        </div>
        {activities && (
          <div className="mt-1 text-3xl font-semibold text-gray-50">
            {activities.length}
          </div>
        )}
      </div>
      <div className="w-full px-4 py-5 bg-gray-600 rounded-lg shadow-lg">
        <div className="text-sm font-medium text-gray-100 truncate">
          Events
        </div>
        {events && (
          <div className="mt-1 text-3xl font-semibold text-gray-50">
            {events.length}
          </div>
        )}
      </div>
    </div>
  )
}

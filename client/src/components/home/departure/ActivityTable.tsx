"use client";

import { IActivity } from "@/common/interfaces/IActivity";
import ActivityCard from "./ActivityCard/ActivityCard";
import { useState } from "react";
import ActivityFilter from "./ActivityCard/ActivityFilter";
import { Utils } from "@/common/utils";

interface ActivityTableProps {
  activities: IActivity[] | undefined;
}

const ActivityTable = ({ activities }: ActivityTableProps) => {
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [searchFIlter, setSearchFIlter] = useState<string>("");

  const sortedActivities = Utils.sortActivities(
    activities || [],
    activeFilter,
    searchFIlter
  );

  console.log(searchFIlter);
  return (
    <section className="bg-gray-800">
      <div>
        <ActivityFilter
          setActiveFilter={setActiveFilter}
          filterDropdown={filterDropdown}
          setFilterDropdown={setFilterDropdown}
          searchFilter={searchFIlter}
          setSearchFilter={setSearchFIlter}
        />
        <div className="bg-gray-800 relative shadow-md overflow-y-auto h-[17.5rem]">
          <div className="overflow-x-auto scrollbar-hidden">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Activity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Rating
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Difficulty
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedActivities &&
                  sortedActivities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityTable;

"use client";

import { IActivity } from "@/common/interfaces/IActivity";
import ActivityCard from "./ActivityCard/ActivityCard";
import { useState } from "react";
import ActivityFilter from "./ActivityCard/ActivityFilter";
import { Utils } from "@/common/utils";
import { useTranslations } from "next-intl";

interface ActivityTableProps {
  activities: IActivity[] | undefined;
}

const ActivityTable = ({ activities }: ActivityTableProps) => {
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [searchFIlter, setSearchFIlter] = useState<string>("");
  const t = useTranslations('ActivityTable');

  const sortedActivities = Utils.sortActivities(
    activities || [],
    activeFilter,
    searchFIlter
  );

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
        <div className="bg-gray-800 relative shadow-md overflow-y-auto">
          <div className="overflow-x-auto scrollbar-hidden">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    {t('activity')}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t('category')}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t('rating')}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t('difficulty')}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t('status')}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {t('duration')}
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

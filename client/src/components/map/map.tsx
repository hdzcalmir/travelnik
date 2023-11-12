import mapboxgl, { Popup } from 'mapbox-gl';
import { LOAD, TOKEN } from '@/common/consts';
import useVentures from '@/hooks/useVentures';
import useEvents from '@/hooks/useEvents';
import useActivities from '@/hooks/useActivities';
import { Utils } from '@/common/utils';
import { useEffect } from 'react';

export default function Map() {

    const { ventures, venturesLoading } = useVentures();
    const { events, eventsLoading } = useEvents();
    const { activities, activitiesLoading } = useActivities();

    useEffect(() => {
        if (locationsAreLoaded()) {

            mapboxgl.accessToken = TOKEN;
            const map = Utils.getMap(mapboxgl.accessToken);

            const venturePopups: Array<Popup> = Utils.getPopups(ventures);
            const eventPopups: Array<Popup> = Utils.getPopups(events);
            const activityPopups: Array<Popup> = Utils.getPopups(activities);

            map.on(LOAD, () => {
                Utils.getLocations(ventures, venturePopups, map);
                Utils.getLocations(events, eventPopups, map);
                Utils.getLocations(activities, activityPopups, map);
            })

        }
    }, [activities, events, activitiesLoading, ventures, venturesLoading, eventsLoading]);
    return (
        <div className="rounded-lg h-full mb-4 shadow-lg" id="map">
        </div>
    )

    function locationsAreLoaded() {
        return !venturesLoading && !eventsLoading && !activitiesLoading;
    }
}
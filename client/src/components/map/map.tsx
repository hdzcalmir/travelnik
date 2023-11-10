import mapboxgl, { Popup } from 'mapbox-gl';
import { COORDS, LOAD, MAP, TOKEN } from '@/common/consts';
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
        if (!venturesLoading && !eventsLoading && !activitiesLoading) {

            mapboxgl.accessToken = TOKEN;
            const map = new mapboxgl.Map({
                container: MAP,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [COORDS[0], COORDS[1]],
                zoom: 14
            });

            console.log(activities);

            const venturePopup: Array<Popup> = [];
            const eventPopups: Array<Popup> = [];
            const activityPopups: Array<Popup> = [];

            ventures?.forEach((venture) => {
                const popup = new mapboxgl.Popup({ offset: 30 }).setText(
                    venture.description
                );
                venturePopup.push(popup);
            })

            events?.forEach((event) => {
                const popup = new mapboxgl.Popup({ offset: 30 }).setText(
                    event.description
                );
                eventPopups.push(popup);
            })

            activities?.forEach((activity) => {
                const popup = new mapboxgl.Popup({ offset: 30 }).setText(
                    activity.description
                );
                activityPopups.push(popup);
            })

            map.on(LOAD, () => {
                ventures?.forEach((venture, index) => {
                    let el = document.createElement('div');
                    el.className = Utils.getMarker(Number(venture.category));
                    new mapboxgl.Marker(el)
                        .setLngLat([venture.longitude, venture.latitude])
                        .setPopup(venturePopup[index])
                        .addTo(map);
                })

                events?.forEach((event, index) => {
                    let el = document.createElement('div');
                    el.className = Utils.getMarker(Number(event.category));
                    new mapboxgl.Marker(el)
                        .setLngLat([event.longitude, event.latitude])
                        .setPopup(eventPopups[index])
                        .addTo(map);
                })

                activities?.forEach((activity, index) => {
                    let el = document.createElement('div');
                    el.className = Utils.getMarker(Number(activity.category));
                    new mapboxgl.Marker(el)
                        .setLngLat([activity.longitude, activity.latitude])
                        .setPopup(activityPopups[index])
                        .addTo(map);
                })
            })

        }
    }, [activities, events, activitiesLoading, ventures, venturesLoading, eventsLoading]);
    return (
        <div className="rounded-lg h-full mb-4 shadow-lg" id="map">
        </div>
    )
}
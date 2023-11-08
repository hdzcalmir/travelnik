import mapboxgl, { Popup } from 'mapbox-gl';
import { COORDS, LOAD, MAP, TOKEN } from '@/common/consts';
import useVentures from '@/hooks/useVentures';
import useEvents from '@/hooks/useEvents';
import useActivities from '@/hooks/useActivities';
import { Utils } from '@/common/utils';

export default function Map() {

    const { ventures, venturesLoading } = useVentures();
    const { events, eventsLoading } = useEvents();
    const { activities, activitiesLoading } = useActivities();

    if (venturesLoading || eventsLoading || activitiesLoading) {

        return (
            <div className="rounded-lg h-full mb-4" id="map">
            </div>
        )

    } else {
        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: MAP,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [COORDS[0], COORDS[1]],
            zoom: 13
        });

        const popups: Array<Popup> = [];

        ventures?.forEach((venture)=>{
            const popup = new mapboxgl.Popup({ offset: 30 }).setText(
                venture.description
            );
            popups.push(popup);
        })

        map.on(LOAD, () => {
          ventures?.forEach((venture, index) => {
                let el = document.createElement('div');
                el.className = Utils.getMarker(Number(venture.category));
                new mapboxgl.Marker(el)
                    .setLngLat([venture.longitude, venture.latitude])
                    .setPopup(popups[index])
                    .addTo(map);
            })
        })

        return (
            <div className="rounded-lg h-full mb-4" id="map">
            </div>
        )
    }
}
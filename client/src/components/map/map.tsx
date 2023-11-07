import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { GEO_LOC, LOAD, MAP, TOKEN } from '@/common/consts';
import { ventures } from './mockData';

export default function Map() {

    useEffect(() => {

        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: MAP,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [GEO_LOC[0], GEO_LOC[1]],
            zoom: 13
        });

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            'Dobrodošli u Travnik!'
        );

        map.on('click', (data) => {
            const venture = new mapboxgl.Marker({
            }).setLngLat(data.lngLat)
                .setPopup(popup)
                .addTo(map);
        })

        map.on(LOAD, () => {
            ventures.forEach((addr) => {
                let el = document.createElement('div');
                el.className = 'marker';
                new mapboxgl.Marker(el)
                    .setLngLat(addr)
                    .setPopup(popup)
                    .addTo(map);
            })
        })

    }, [])


    return (
        <div className="rounded-lg h-full mb-4" id="map">
        </div>
    )
}
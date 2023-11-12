import { ADDRESS, CITY, CLICK, COUNTRY, DEFAULT_MARKER, LAT, LNG, POST_CODE } from "./consts";
import { mapboxApi } from "@/interceptor/mapboxApi";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { IActivityState, IEventState, IVentureState } from "./interfaces/IStates";


export class GeoLocationFactory {
    static geoLocation(map: Map, markerExists: boolean, geoLocation: IVentureState | IActivityState | IEventState, setGeoLocation: any, marker: Marker) {

        map.on(CLICK, async (data) => {

            if (markerExists)
                marker?.remove();

            const resp = await mapboxApi.reverseGeocode(data.lngLat);

            if (GeoLocationFactory.locationHasStreet(resp)) {
                marker = GeoLocationFactory.makeMarker(marker, data, map);
                GeoLocationFactory.updateGeoLocation(setGeoLocation, geoLocation, resp, data);
                markerExists = true;
            } else
                GeoLocationFactory.cleanGeoLocation(setGeoLocation, geoLocation);
        });
    }

        private static makeMarker(marker: mapboxgl.Marker, data: mapboxgl.MapMouseEvent & mapboxgl.EventData, map: mapboxgl.Map) {
            let icon = document.createElement("div");
            icon.className = DEFAULT_MARKER;
            marker = new mapboxgl.Marker(icon).setLngLat(data.lngLat).addTo(map);
            return marker;
        }

        private static locationHasStreet(resp: any) {
            return resp?.features[4]?.text;
        }

        private static updateGeoLocation(setGeoLocation: any, geoLocation: IVentureState | IActivityState | IEventState, resp: any, data: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
            setGeoLocation({
                ...geoLocation, [COUNTRY]: resp.features[4].text, [CITY]: resp.features[2].text, [POST_CODE]: resp.features[1].text, [ADDRESS]: resp.features[0].text, [LAT]: data.lngLat.lat, [LNG]: data.lngLat.lng,
            });
        }

        private static cleanGeoLocation(geoLocation: IVentureState | IActivityState | IEventState, setGeoLocation: any,) {
            setGeoLocation({
                ...geoLocation, [COUNTRY]: "", [CITY]: "", [POST_CODE]: "", [ADDRESS]: "", [LAT]: 0, [LNG]: 0,
            });
        }
}
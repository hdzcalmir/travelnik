import { TOKEN } from "@/common/consts";
import { IGeoLocation } from "@/common/interfaces/IGeoLocation";

export class Api {

    static reverseGeocode = async (geo: IGeoLocation) => {
        try {
            const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${geo.lng},${geo.lat}.json?access_token=${TOKEN}`);
            return await resp.json();
        } catch (e) {
            console.log(e)
        }
    }
}
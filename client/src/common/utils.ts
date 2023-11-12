import mapboxgl, { Popup } from "mapbox-gl";
import { BUSSTATION_MARKER, CINEMA_MARKER, DEFAULT_MARKER, DISCO_MARKER, GASSTATION_MARKER, GYM_MARKER, HOSPITAL_MARKER, HOTEL_MARKER, LAT_COORD, LNG_COORD, MAP, MUSEUM_MARKER, RESTAURANT_MARKER, SHOPPINGCENTER_MARKER, STORE_MARKER, TAXI_MARKER } from "./consts";
import { difficulties } from "./difficulties";
import { VentureCategory } from "./enums";
import { IActivity } from "./interfaces/IActivity";
import { IEvent } from "./interfaces/IEvent";
import { IVenture } from "./interfaces/IVenture";

export class Utils {

  static calculateRate(reviews: IReview[]): number {
    if (!reviews || reviews?.length === 0) {
      return 0;
    }

    const totalRates = reviews?.reduce((acc, review) => acc + review?.rate, 0);
    const averageRate = totalRates / reviews?.length;

    return averageRate;
  }

  static sortActivities = (activities: IActivity[], activeFilter: string, searchFilter: string) => {
    let filteredActivities = activities;

    if (searchFilter) {
      const lowerCaseSearchFilter = searchFilter.toLowerCase();
      filteredActivities = filteredActivities.filter(activity => {
        return activity.name.toLowerCase().includes(lowerCaseSearchFilter);
      });
    }

    if (activeFilter === "category") {
      return filteredActivities.sort((a, b) => a.category.localeCompare(b.category));
    } else if (activeFilter === "rating") {
      return filteredActivities.sort(
        (a, b) =>
          Utils.calculateRate(a.reviews) - Utils.calculateRate(b.reviews)
      );
    } else if (activeFilter === "difficulty") {
      return filteredActivities.sort((a, b) => {
        return difficulties[a.difficulty] - difficulties[b.difficulty];
      });
    } else if (activeFilter === "duration") {
      return filteredActivities.sort((a, b) => {
        const durationA = Utils.convertDurationToSeconds(a.duration);
        const durationB = Utils.convertDurationToSeconds(b.duration);
        return durationA - durationB;
      });
    } else {
      return filteredActivities;
    }
  };


  static convertDurationToSeconds(duration: string): number {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }


  static getMarker(category: number): string {
    switch (category) {
      case VentureCategory.Restaurant:
        return RESTAURANT_MARKER;
      case VentureCategory.GasStation:
        return GASSTATION_MARKER;
      case VentureCategory.Hotel:
        return HOTEL_MARKER;
      case VentureCategory.BusStation:
        return BUSSTATION_MARKER;
      case VentureCategory.Gym:
        return GYM_MARKER;
      case VentureCategory.Hospital:
        return HOSPITAL_MARKER;
      case VentureCategory.Taxi:
        return TAXI_MARKER;
      case VentureCategory.Cinema:
        return CINEMA_MARKER;
      case VentureCategory.Store:
        return STORE_MARKER;
      case VentureCategory.Museum:
        return MUSEUM_MARKER;
      case VentureCategory.Disco:
        return DISCO_MARKER;
      case VentureCategory.ShoppingCenter:
        return SHOPPINGCENTER_MARKER;
      default:
        return DEFAULT_MARKER;
    }
  }

  static getPopups(locations: Array<IVenture | IEvent | IActivity> | undefined): Array<Popup> {
    const popups: Array<Popup> = [];
    locations?.forEach((location) => {
      const popup = new mapboxgl.Popup({ offset: 30 })
        .setHTML(
          `<div class="flex flex-col justify-center items-center">
          <h3 class="font-bold text-[16px]">${location?.name}</h3>
          <p class="font-semibold text-left mt-2">Opis:</p>
          <p class="w-full text-center">${location?.description}</p>
          <p class="font-semibold text-left mt-2">Ocjena:</p>
          <p class="w-full text-center">⭐⭐⭐⭐⭐</p>
          </div>
          `
        )
      popups.push(popup);
    })
    return popups;
  }

  static getLocations(locations: Array<IVenture | IEvent | IActivity> | undefined, popups: mapboxgl.Popup[], map: mapboxgl.Map) {
    locations?.forEach((location, index) => {
      let el = document.createElement('div');
      el.className = Utils.getMarker(Number(location?.category));
      new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popups[index])
        .addTo(map);
    });
  }

  static getMap(token: string) {
    const map = new mapboxgl.Map({
      container: MAP,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [LAT_COORD, LNG_COORD],
      zoom: 14
    });
    return map;
  }

}
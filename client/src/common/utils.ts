import mapboxgl, { Popup } from "mapbox-gl";
import { ACTIVITY_MARKER, BUSSTATION_MARKER, CINEMA_MARKER, DEFAULT_MARKER, DISCO_MARKER, EVENT_MARKER, GASSTATION_MARKER, GYM_MARKER, HOSPITAL_MARKER, HOTEL_MARKER, LAT_COORD, LNG_COORD, MAP, MUSEUM_MARKER, RESTAURANT_MARKER, SHOPPINGCENTER_MARKER, STORE_MARKER, TAXI_MARKER } from "./consts";
import { difficulties } from "./difficulties";
import { Category } from "./enums";
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
      case Category.Restaurant:
        return RESTAURANT_MARKER;
      case Category.GasStation:
        return GASSTATION_MARKER;
      case Category.Hotel:
        return HOTEL_MARKER;
      case Category.BusStation:
        return BUSSTATION_MARKER;
      case Category.Gym:
        return GYM_MARKER;
      case Category.Hospital:
        return HOSPITAL_MARKER;
      case Category.Taxi:
        return TAXI_MARKER;
      case Category.Cinema:
        return CINEMA_MARKER;
      case Category.Store:
        return STORE_MARKER;
      case Category.Museum:
        return MUSEUM_MARKER;
      case Category.Disco:
        return DISCO_MARKER;
      case Category.ShoppingCenter:
        return SHOPPINGCENTER_MARKER;
      case Category.Event:
        return EVENT_MARKER;
      case Category.Activity:
        return ACTIVITY_MARKER;
      default:
        return DEFAULT_MARKER;
    }
  }

  static getPopups(locations: Array<IVenture | IEvent | IActivity> | undefined): Array<Popup> {
    const popups: Array<Popup> = [];
    locations?.forEach((location) => {
      const popup = new mapboxgl.Popup({ offset: 30 })
        .setHTML(Utils.getPopupUI( location))

      popups.push(popup);
    })
    return popups;
  }

  private static getPopupUI(location: IActivity | IVenture | IEvent): string {
    if (this.isIVenture(location)) {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">${location?.name}</h3>
      <p class="font-semibold text-left mt-2">Opis:</p>
      <p class="w-full text-center">${location?.description}</p>
      <p class="font-semibold text-left mt-2">Ocjena:</p>
      <p class="w-full text-center">⭐⭐⭐⭐⭐</p>
      </div>`;
    } else if (this.isIEvent(location)) {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">${location?.name}</h3>
      <p class="font-semibold text-left mt-2">Opis:</p>
      <p class="w-full text-center">${location?.description}</p>
      </div>`;
    } else if (this.isIActivity(location)) {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">${location?.name}</h3>
      <p class="font-semibold text-left mt-2">Opis:</p>
      <p class="w-full text-center">${location?.description}</p>
      </div>`;
    } else {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">Error!</h3>
      <p class="font-semibold text-left mt-2">Opis:</p>
      <p class="w-full text-center">Error!</p>
      </div>`;
    }
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

  static getMap() {
    const map = new mapboxgl.Map({
      container: MAP,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [LAT_COORD, LNG_COORD],
      zoom: 14
    });
    return map;
  }

  private static isIVenture(obj: any): obj is IVenture {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'name' in obj &&
      'category' in obj &&
      'latitude' in obj &&
      'longitude' in obj &&
      'address' in obj &&
      'city' in obj &&
      'country' in obj &&
      'postal_code' in obj &&
      'description' in obj &&
      'opening_time' in obj &&
      'closing_time' in obj
    );
  }

  private static isIEvent(obj: any): obj is IEvent {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'location_id' in obj &&
      'name' in obj &&
      'category' in obj &&
      'latitude' in obj &&
      'longitude' in obj &&
      'address' in obj &&
      'city' in obj &&
      'country' in obj &&
      'postal_code' in obj &&
      'description' in obj &&
      'start_date' in obj &&
      'end_date' in obj
    );
  }

  private static isIActivity(obj: any): obj is IActivity {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'location_id' in obj &&
      'reviews' in obj &&
      'name' in obj &&
      'category' in obj &&
      'latitude' in obj &&
      'longitude' in obj &&
      'address' in obj &&
      'city' in obj &&
      'country' in obj &&
      'postal_code' in obj &&
      'description' in obj &&
      'duration' in obj &&
      'difficulty' in obj
    );
  }


}
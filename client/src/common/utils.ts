import mapboxgl, { Popup } from "mapbox-gl";
import { ACTIVITY_MARKER, BUSSTATION_MARKER, CHURCH_MARKER, CINEMA_MARKER, COFFEE_MARKER, DEFAULT_MARKER, DISCO_MARKER, EVENT_MARKER, GASSTATION_MARKER, GYM_MARKER, HOSPITAL_MARKER, HOTEL_MARKER, LAT_COORD, LNG_COORD, MAP, MOSQUE_MARKER, MUSEUM_MARKER, RESTAURANT_MARKER, SHOPPINGCENTER_MARKER, STORE_MARKER, TAXI_MARKER } from "./consts";
import { difficulties } from "./difficulties";
import { Category } from "./enums";
import { IActivity } from "./interfaces/IActivity";
import { IEvent } from "./interfaces/IEvent";
import { IVenture } from "./interfaces/IVenture";
import { IReview } from "./interfaces/IReview";

export class Utils {

  static calculatePercentageOfGradeReviews = (grade: number, reviews: IReview[]) => {
    const totalReviews = reviews.length;
    const grade5Reviews = Utils.calculateNumberOfGradeReviews(grade, reviews);

    if (totalReviews === 0)
      return 0;

    return (grade5Reviews / totalReviews) * 100;
  };

  static calculateNumberOfGradeReviews = (grade: number, reviews: IReview[]) => {
    return reviews.filter((review) => review.rate === grade).length;
  };

  static calculateRate(reviews: IReview[]): number {
    if (!Array.isArray(reviews) || reviews.length === 0)
      return 0;

    const reviewsSum = reviews.reduce((acc, review) => acc + (review?.rate || 0), 0);
    const overallReview = reviewsSum / reviews.length;

    return overallReview;
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
      return filteredActivities.sort((a, b) =>
        Utils.calculateRate(a.reviews) - Utils.calculateRate(b.reviews)
      );
    } else if (activeFilter === "difficulty") {
      return filteredActivities.sort((a, b) => {
        return difficulties[a.difficulty] - difficulties[b.difficulty];
      });
    } else if (activeFilter === "duration") {
      return filteredActivities.sort((a, b) => {
        return Utils.convertDurationToSeconds(a.duration) - Utils.convertDurationToSeconds(b.duration);
      });
    } else
      return filteredActivities;
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
      case Category.Mosque:
        return MOSQUE_MARKER;
      case Category.Church:
        return CHURCH_MARKER;
      case Category.Caffe:
        return COFFEE_MARKER;
      case Category.Event:
        return EVENT_MARKER;
      case Category.Activity:
        return ACTIVITY_MARKER;
      default:
        return DEFAULT_MARKER;
    }
  }

  static getCategory(category: number): string {
    switch (category) {
      case Category.Restaurant:
        return "Restaurant";
      case Category.GasStation:
        return "Gas Station";
      case Category.Hotel:
        return "Hotel";
      case Category.BusStation:
        return "Bus Station";
      case Category.Gym:
        return "Gym";
      case Category.Hospital:
        return "Hospital";
      case Category.Taxi:
        return "Taxi";
      case Category.Cinema:
        return "Cinema";
      case Category.Store:
        return "Store";
      case Category.Museum:
        return "Museum";
      case Category.Church:
        return "Church";
      case Category.Mosque:
        return "Mosque";
      case Category.Disco:
        return "Disco";
      case Category.Caffe:
        return "Caffe";
      case Category.ShoppingCenter:
      default:
        return "Shopping Center";
    }
  }

  static getPopups(locations: Array<IVenture | IEvent | IActivity> | undefined): Array<Popup> {
    const popups: Array<Popup> = [];
    locations?.forEach((location) => {
      const popup = new mapboxgl.Popup({ offset: 30 })
        .setHTML(Utils.getPopupUI(location))

      popups.push(popup);
    })
    return popups;
  }

  private static getPopupUI(location: IActivity | IVenture | IEvent): string {
    if (this.isIVenture(location)) {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">${location?.name}</h3>
      <p class="font-semibold text-left mt-2">Description:</p>
      <p class="w-full text-center">${location?.description}</p>
      <p class="font-semibold text-left mt-2">Reviews:</p>
      <p class="w-full text-center">⭐${Utils.calculateRate(location.reviews).toFixed(2)} <span class="text-gray-500">(${location.reviews.length} reviews)</span></p>
      </div>`;
    } else if (this.isIEvent(location)) {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">${location?.name}</h3>
      <p class="font-semibold text-left mt-2">Description:</p>
      <p class="w-full text-center">${location?.description}</p>
      </div>`;
    } else if (this.isIActivity(location)) {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">${location?.name}</h3>
      <p class="font-semibold text-left mt-2">Description:</p>
      <p class="w-full text-center">${location?.description}</p>
      <p class="font-semibold text-left mt-2">Reviews:</p>
      <p class="w-full text-center">⭐${Utils.calculateRate(location.reviews).toFixed(2)} <span class="text-gray-500">(${location.reviews.length} reviews)</span></p>
      </div>`;
    } else {
      return `<div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-[16px]">Error!</h3>
      <p class="font-semibold text-left mt-2">Description:</p>
      <p class="w-full text-center">Error!</p>
      </div>`;
    }
  }

  static getLocations(locations: Array<IVenture | IEvent | IActivity> | undefined, popups: mapboxgl.Popup[], map: mapboxgl.Map, type = 0) {
    locations?.forEach((location, index) => {
      let el = document.createElement('div');
      el.className = Utils.getMarker(type === 0 ? Number(location?.category) : type);
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
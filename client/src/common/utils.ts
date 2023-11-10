import { BUSSTATION_MARKER, CINEMA_MARKER, DEFAULT_MARKER, DISCO_MARKER, GASSTATION_MARKER, GYM_MARKER, HOSPITAL_MARKER, HOTEL_MARKER, MUSEUM_MARKER, RESTAURANT_MARKER, SHOPPINGCENTER_MARKER, STORE_MARKER, TAXI_MARKER } from "./consts";
import { VentureCategory } from "./enums";
import { IActivity } from "./interfaces/IActivity";

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
      const difficultiesOrder: { [key: string]: number } = {
        "Easy": 1,
        "Medium": 2,
        "Hard": 3
      };

      return filteredActivities.sort((a, b) => {
        return difficultiesOrder[a.difficulty] - difficultiesOrder[b.difficulty];
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
}
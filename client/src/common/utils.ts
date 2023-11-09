import { BUSSTATION_MARKER, CINEMA_MARKER, DEFAULT_MARKER, DISCO_MARKER, GASSTATION_MARKER, GYM_MARKER, HOSPITAL_MARKER, HOTEL_MARKER, MUSEUM_MARKER, RESTAURANT_MARKER, SHOPPINGCENTER_MARKER, STORE_MARKER, TAXI_MARKER } from "./consts";
import { Category } from "./enums";
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
      default:
        return DEFAULT_MARKER;
    }
  }
}
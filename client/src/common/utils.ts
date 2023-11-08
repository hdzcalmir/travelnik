import { IActivity } from "./interfaces/IActivity";

export class Utils {

    calculateRate(reviews: IReview[]): number {
        if (!reviews || reviews?.length === 0) {
            return 0;
        }

        const totalRates = reviews?.reduce((acc, review) => acc + review?.rate, 0);
        const averageRate = totalRates / reviews?.length;

        return averageRate;
    }

     sortActivities = (activities: IActivity[], activeFilter: string) => {
        if (activeFilter === "category") {
          return activities.sort((a, b) => a.category.localeCompare(b.category));
        } else if (activeFilter === "rating") {
          return activities.sort(
            (a, b) =>
              this.calculateRate(a.reviews) - this.calculateRate(b.reviews)
          );
        } else {
          return activities;
        }
      };
}
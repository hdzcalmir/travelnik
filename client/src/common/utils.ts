export class Utils {

    calculateRate(reviews: IReview[]): number {
        if (!reviews || reviews?.length === 0) {
            return 0;
        }

        const totalRates = reviews?.reduce((acc, review) => acc + review?.rate, 0);
        const averageRate = totalRates / reviews?.length;

        return averageRate;
    }
}
import { IReview } from "@/common/interfaces/IReview";
import ReviewAPI from "@/interceptor/Review/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useReviews = () => {
    const queryClient = useQueryClient();

    const { data: reviews, isLoading: reviewsLoading } = useQuery<Array<IReview>, Error>({
        queryKey: ["ventures"],
        queryFn: async () => {
            const { data } = await ReviewAPI.fetchReviews();
            return data;
        }
    });

    return {
        reviews,
        reviewsLoading,
    }
}

export default useReviews;
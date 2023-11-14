import { IReview } from "@/common/interfaces/IReview";
import ReviewAPI from "@/interceptor/Review/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useReviews = () => {
    const queryClient = useQueryClient();

    const { data: reviews, isLoading: reviewsLoading } = useQuery<Array<IReview>, Error>({
        queryKey: ["reviews"],
        queryFn: async () => {
            const { data } = await ReviewAPI.fetchReviews();
            return data;
        }
    });

    const deleteReview = async ({ id }: { id: string }) => {
        await ReviewAPI.deleteReview(id);
    }

    const deleteReviewMutation = useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });

    return {
        reviews,
        reviewsLoading,
        deleteReviewMutation
    }
}

export default useReviews;
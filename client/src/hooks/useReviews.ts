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

    const { data: unapprovedReviews, isLoading: unapprovedReviewsLoading } = useQuery<Array<IReview>, Error>({
        queryKey: ["unapproved_reviews"],
        queryFn: async () => {
            const { data } = await ReviewAPI.fetchUnapprovedReviews();
            return data;
        }
    });

    const deleteUnapprovedReview = async ({ id }: { id: string }) => {
        await ReviewAPI.deleteUnapprovedReview(id);
    }

    const deleteUnapprovedReviewMutation = useMutation({
        mutationFn: deleteUnapprovedReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["unapproved_reviews"] });
        },
    });

    const updateUnapprovedReview = async ({ id, status }: { id: number | undefined, status: boolean }) => {
        await ReviewAPI.updateUnapprovedReview(id, status);
    }

    const updateUnapprovedReviewMutation = useMutation({
        mutationFn: updateUnapprovedReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["unapproved_reviews"] });
        },
    });

    return {
        reviews,
        reviewsLoading,
        unapprovedReviews,
        unapprovedReviewsLoading,
        deleteUnapprovedReviewMutation,
        updateUnapprovedReview,
        updateUnapprovedReviewMutation
    }
}

export default useReviews;
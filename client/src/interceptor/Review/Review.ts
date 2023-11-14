import http from "../http";
const ReviewAPI = {
    fetchReviews: async () => {
        const response = await http.get('/review');
        return response;
    },

    fetchUnapprovedReviews: async () => {
        const response = await http.get('/review/unapproved');
        return response;
    },

    deleteUnapprovedReview: async (id: string) => {
        const response = await http.delete(`/review/${id}`);
        return response;
    },

    updateUnapprovedReview: async (id: number | undefined, status: boolean) => {
        const response = await http.patch(`/review`, { id, status });
        return response;
    },
};
export default ReviewAPI;
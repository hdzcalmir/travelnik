import http from "../http";
const ReviewAPI = {
    fetchReviews: async () => {
        const response = await http.get('/review');
        return response;
    },
    deleteReview: async (id: string) => {
        const response = await http.delete(`/review/${id}`);
        return response;
    },
};
export default ReviewAPI;
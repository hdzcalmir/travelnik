import http from "../http";
const ReviewAPI = {
    fetchReviews: async () => {
        const response = await http.get('/review');
        return response;
    },
};
export default ReviewAPI;
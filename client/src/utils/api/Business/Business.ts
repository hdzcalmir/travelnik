import http from "../http";

const BusinessAPI = {
    fetchBusinesses: async () => {
        const response = await http.get('/business');
        return response;
    },
};

export default BusinessAPI;

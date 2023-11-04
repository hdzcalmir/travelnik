import http from "../http";

const BusinessAPI = {
    fetchBusinesses: async () => {
        const response = await http.get('/business');
        return response;
    },
    addVenture: async (venture: any) => {
        const response = await http.post('/business', venture);
        return response;
    },
};

export default BusinessAPI;

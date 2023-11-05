import http from "../http";

const BusinessAPI = {
    fetchBusinesses: async () => {
        const response = await http.get('/business');
        return response;
    },
    fetchBusinessesWithFilters: async (interests: string | null, check_in: string | null, check_out: string | null, people: string | null) => {
        const response = await http.get(`/business?interests=${interests}&check_in=${check_in}&check_out=${check_out}&people=${people}`);
        return response;
    },
    addVenture: async (venture: any) => {
        const response = await http.post('/business', venture);
        return response;
    },
};

export default BusinessAPI;

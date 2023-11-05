import http from "../http";

const AccommodationAPI = {
    fetchAccommodations: async () => {
        const response = await http.get('/accommodation');
        return response;
    },
    updateAccommodations: async () => {
        const response = await http.patch('/accommodation');
        return response;
    },
};

export default AccommodationAPI;

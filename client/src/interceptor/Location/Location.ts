import http from "../http";

const LocationAPI = {
    fetchLocations: async () => {
        const response = await http.get('/location');
        return response;
    }
};

export default LocationAPI;
import http from "../http";

const EventAPI = {
    fetchEvents: async () => {
        const response = await http.get('/event');
        return response;
    },
    fetchEventsWithFilters: async (interests: string | null, check_in: string | null, check_out: string | null, people: string | null) => {
        const response = await http.get(`/event?interests=${interests}&check_in=${check_in}&check_out=${check_out}&people=${people}`);
        return response;
    },
};

export default EventAPI;

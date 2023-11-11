import toast from "react-hot-toast";
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
    addEvent: async (event: any) => {
        try {
            const response = await http.post('/event', event);
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    },
    deleteEvent: async (id: string) => {
        try {
            const response = await http.delete(`/event/${id}`);
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    }
};

export default EventAPI;

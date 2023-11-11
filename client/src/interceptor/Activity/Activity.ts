import toast from "react-hot-toast";
import http from "../http";

const ActivityAPI = {
    fetchActivities: async () => {
        const response = await http.get('/activity');
        return response;
    },
    fetchActivitiesWithFilters: async (interests: string | null, check_in: string | null, check_out: string | null, people: string | null) => {
        const response = await http.get(`/activity?interests=${interests}&check_in=${check_in}&check_out=${check_out}&people=${people}`);
        return response;
    },
    addActivtiy: async (activity: any) => {
        try {
            const response = await http.post('/activity', activity);
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    },
    deleteActivity: async (id: string) => {
        try {
            const response = await http.post(`/activity/${id}`);
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    }
};

export default ActivityAPI;

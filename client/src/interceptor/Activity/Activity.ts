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
};

export default ActivityAPI;

import toast from "react-hot-toast";
import http from "../http";
import { swalWithBootstrapButtons } from "@/common/sweetAlert";
import { IActivityState } from "@/common/interfaces/IStates";
import { convertMinutesToTime } from "@/value-converters/minutesToHours";

const ActivityAPI = {
    fetchActivities: async () => {
        const response = await http.get('/activity');
        return response;
    },
    fetchActivitiesWithFilters: async (interests: string | null, check_in: string | null, check_out: string | null, people: string | null) => {
        const response = await http.get(`/activity?interests=${interests}&check_in=${check_in}&check_out=${check_out}&people=${people}`);
        return response;
    },
    addActivtiy: async (activity: IActivityState) => {
        try {
            activity.duration = convertMinutesToTime(activity.duration);
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
        const result = await swalWithBootstrapButtons.fire({
            text: 'Are you sure you want to delete this activity?',
            showCancelButton: true,
            showConfirmButton: true,
            icon: 'warning',
            confirmButtonText: '<b>Yes, delete it!</b>',
            cancelButtonText: '<b>No, return</b>'
        })

        if (result.isConfirmed) {
            try {
                const response = await http.delete(`/activity/${id}`);
                if (response.status === 201) {
                    toast.success(response.data);
                }
            } catch (error: any) {
                toast.error(error.response.data);
            }
        }
    }
};

export default ActivityAPI;

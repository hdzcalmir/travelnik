import toast from "react-hot-toast";
import http from "../http";
import { swalWithBootstrapButtons } from "@/common/sweetAlert";
import { IActivityState } from "@/common/interfaces/IStates";
import { convertMinutesToTime } from "@/value-converters/minutesToHours";
import { IActivityUpdate } from "@/components/panel/modals/EditActivtyModal";

const ActivityAPI = {
    fetchActivities: async () => {
        const response = await http.get('/activity');
        return response;
    },
    fetchActivitiesWithFilters: async (interests: string | null | undefined, check_in: string | null | undefined, check_out: string | null | undefined, people: string | null | undefined) => {
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
    },

    updateActivity: async (id: string | undefined, activity: IActivityUpdate) => {
        try {
            activity.duration = convertMinutesToTime(activity.duration);
            const response = await http.patch(`/activity/${id}`, activity);
            if (response.status === 200) {
                toast.success(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    }
};

export default ActivityAPI;

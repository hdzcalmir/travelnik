import toast from "react-hot-toast";
import http from "../http";
import { swalWithBootstrapButtons } from "@/common/sweetAlert";

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
        const result = await swalWithBootstrapButtons.fire({
            text: 'Are you sure you want to delete this event?',
            showCancelButton: true,
            showConfirmButton: true,
            icon: 'warning',
            confirmButtonText: '<b>Yes, delete it!</b>',
            cancelButtonText: '<b>No, return</b>'
        })

        if (result.isConfirmed) {
            try {
                const response = await http.delete(`/event/${id}`);
                if (response.status === 201) {
                    toast.success(response.data);
                }
            } catch (error: any) {
                toast.error(error.response.data);
            }
        }
    }
};

export default EventAPI;

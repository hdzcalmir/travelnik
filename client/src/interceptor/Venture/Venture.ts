import toast from "react-hot-toast";
import http from "../http";
import Swal from 'sweetalert2'
import { swalWithBootstrapButtons } from "@/common/sweetAlert";

const VentureAPI = {
    fetchVentures: async () => {
        const response = await http.get('/business');
        return response;
    },
    fetchVenturesWithFilters: async (interests: string | null, check_in: string | null, check_out: string | null, people: string | null) => {
        const response = await http.get(`/business?interests=${interests}&check_in=${check_in}&check_out=${check_out}&people=${people}`);
        return response;
    },
    addVenture: async (venture: any) => {
        try {
            const response = await http.post('/business', venture);
            console.log(response);
            if (response.status === 201) {
                toast.success(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    },
    deleteVenture: async (id: string) => {
        const result = await swalWithBootstrapButtons.fire({
            text: 'Are you sure you want to delete this venture?',
            showCancelButton: true,
            showConfirmButton: true,
            icon: 'warning',
            confirmButtonText: '<b>Yes, delete it!</b>',
            cancelButtonText: '<b>No, return</b>'
        })

        if (result.isConfirmed) {
            try {
                const response = await http.delete(`/business/${id}`);
                console.log(response);
                if (response.status === 201) {
                    toast.success(response.data);
                }
            } catch (error: any) {
                console.log(error);
                toast.error(error.response.data);
            }
        }
    }
};

export default VentureAPI;

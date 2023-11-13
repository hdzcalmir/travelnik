import { IVenture } from "@/common/interfaces/IVenture";
import { IVentureUpdate } from "@/components/panel/modals/EditVentureModal";
import VentureAPI from "@/interceptor/Venture/Venture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useVentures = () => {
    const queryClient = useQueryClient();

    const { data: ventures, isLoading: venturesLoading } = useQuery<Array<IVenture>, Error>({
        queryKey: ["ventures"],
        queryFn: async () => {
            const { data } = await VentureAPI.fetchVentures();
            return data;
        }
    });

    const deleteVenture = async ({ id }: { id: string }) => {
        await VentureAPI.deleteVenture(id);
    }

    const deleteVentureMutation = useMutation({
        mutationFn: deleteVenture,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ventures"] });
        },
    });

    const updateVenture = async ({ id, venture}: { id: string | undefined, venture: IVentureUpdate }) => {
        await VentureAPI.updateVenture(id, venture);
    }

    const updateVentureMutation = useMutation({
        mutationFn: updateVenture,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ventures"] });
        },
    });


    return {
        ventures,
        venturesLoading,
        deleteVentureMutation,
        updateVentureMutation
    }
}

export default useVentures;
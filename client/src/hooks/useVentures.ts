import { IVenture } from "@/common/interfaces/IVenture";
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


    return {
        ventures,
        venturesLoading,
        deleteVentureMutation
    }
}

export default useVentures;
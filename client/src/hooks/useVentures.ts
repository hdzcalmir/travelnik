import { IVenture } from "@/common/interfaces/IVenture";
import VentureAPI from "@/interceptor/Venture/Venture";
import { useQuery } from "@tanstack/react-query";

const useVentures = () => {
    const { data: ventures, isLoading: venturesLoading } = useQuery<Array<IVenture>, Error>({
        queryKey: ["ventures"],
        queryFn: async () => {
            const { data } = await VentureAPI.fetchVentures();
            return data;
        }
    });

    return {
        ventures,
        venturesLoading
    }
}

export default useVentures;
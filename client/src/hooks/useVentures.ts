import { IVenture } from "@/common/interfaces/IVenture";
import BusinessAPI from "@/interceptor/Business/Business";
import { useQuery } from "@tanstack/react-query";

const useVentures = () => {
    const { data: ventures, isLoading: venturesLoading } = useQuery<Array<IVenture>, Error>({
        queryKey: ["ventures"],
        queryFn: async () => {
            const { data } = await BusinessAPI.fetchBusinesses();
            return data;
        }
    });

    return {
        ventures,
        venturesLoading
    }
}

export default useVentures;
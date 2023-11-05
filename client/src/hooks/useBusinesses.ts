import BusinessAPI from "@/interceptor/Business/Business";
import { useQuery } from "@tanstack/react-query";

const useBusinesses = () => {
    const { data: bussinesses, isLoading: businessesLoading } = useQuery<[], Error>({
        queryKey: ["businesses"],
        queryFn: async () => {
            const { data } = await BusinessAPI.fetchBusinesses();
            return data;
        }
    });

    return {
        bussinesses,
        businessesLoading
    }
}

export default useBusinesses;
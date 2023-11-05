import { IAccommodation } from "@/components/home/accommodation/AccommodationCard/AccommodationCard";
import AccommodationAPI from "@/interceptor/Accommodation/Accommodation";
import { useQuery } from "@tanstack/react-query";

const useAccommodations = () => {
    const { data: accommodations, isLoading: accommodationsLoading } = useQuery<IAccommodation[], Error>({
        queryKey: ["accommodations"],
        queryFn: async () => {
            const { data } = await AccommodationAPI.fetchAccommodations();
            return data;
        }
    });

    return {
        accommodations,
        accommodationsLoading
    }
}

export default useAccommodations;
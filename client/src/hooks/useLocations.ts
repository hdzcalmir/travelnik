import { ILocation } from "@/common/interfaces/ILocation";
import LocationAPI from "@/interceptor/Location/Location";
import { useQuery } from "@tanstack/react-query";

const useLocations = () => {
    const { data: locations, isLoading: locationsLoading } = useQuery<ILocation, Error>({
        queryKey: ["locations"],
        queryFn: async () => {
            const { data } = await LocationAPI.fetchLocations();
            return data;
        }
    });

    return {
        locations,
        locationsLoading
    }
}

export default useLocations;
import { IActivity } from "@/common/interfaces/IActivity";
import ActivityAPI from "@/interceptor/Activity/Activity";
import { useQuery } from "@tanstack/react-query";

const useActivities = () => {
    const { data: activities, isLoading: activitiesLoading } = useQuery<Array<IActivity>, Error>({
        queryKey: ["activities"],
        queryFn: async () => {
            const { data } = await ActivityAPI.fetchActivities();
            return data;
        }
    });

    return {
        activities,
        activitiesLoading
    }
}

export default useActivities;
import { IActivity } from "@/common/interfaces/IActivity";
import ActivityAPI from "@/interceptor/Activity/Activity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useActivities = () => {
    const queryClient = useQueryClient();

    const { data: activities, isLoading: activitiesLoading } = useQuery<Array<IActivity>, Error>({
        queryKey: ["activities"],
        queryFn: async () => {
            const { data } = await ActivityAPI.fetchActivities();
            return data;
        }
    });

    const deleteActivity = async ({ id }: { id: string }) => {
        await ActivityAPI.deleteActivity(id);
    }

    const deleteVentureMutation = useMutation({
        mutationFn: deleteActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });


    return {
        activities,
        activitiesLoading,
        deleteVentureMutation
    }
}

export default useActivities;
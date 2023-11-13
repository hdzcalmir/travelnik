import { IActivity } from "@/common/interfaces/IActivity";
import { IActivityUpdate } from "@/components/panel/modals/EditActivtyModal";
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

    const deleteActivityMutation = useMutation({
        mutationFn: deleteActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });

    const updateActivity = async ({ id, activity}: { id: string | undefined, activity: IActivityUpdate }) => {
        await ActivityAPI.updateActivity(id, activity);
    }

    const updateActivityMutation = useMutation({
        mutationFn: updateActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
    });


    return {
        activities,
        activitiesLoading,
        deleteActivityMutation,
        updateActivityMutation
    }
}

export default useActivities;
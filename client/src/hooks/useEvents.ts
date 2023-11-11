import { IEvent } from "@/common/interfaces/IEvent";
import EventAPI from "@/interceptor/Event/Event";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useEvents = () => {
    const queryClient = useQueryClient();

    const { data: events, isLoading: eventsLoading } = useQuery<Array<IEvent>, Error>({
        queryKey: ["events"],
        queryFn: async () => {
            const { data } = await EventAPI.fetchEvents();
            return data;
        }
    });

    const deleteEvent = async ({ id }: { id: string }) => {
        await EventAPI.deleteEvent(id);
    }

    const deleteEventMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return {
        events,
        eventsLoading,
        deleteEventMutation
    }
}

export default useEvents;
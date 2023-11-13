import { IEvent } from "@/common/interfaces/IEvent";
import { IEventUpdate } from "@/components/panel/modals/EditEventModal";
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

    const updateEvent = async ({ id, event }: { id: string | undefined, event: IEventUpdate }) => {
        await EventAPI.updateEvent(id, event);
    }

    const updateEventMutation = useMutation({
        mutationFn: updateEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    return {
        events,
        eventsLoading,
        deleteEventMutation,
        updateEventMutation
    }
}

export default useEvents;
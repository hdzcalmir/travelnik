import { IEvent } from "@/common/interfaces/IEvent";
import EventAPI from "@/interceptor/Event/Event";
import { useQuery } from "@tanstack/react-query";

const useEvents = () => {
    const { data: events, isLoading: eventsLoading } = useQuery<Array<IEvent>, Error>({
        queryKey: ["events"],
        queryFn: async () => {
            const { data } = await EventAPI.fetchEvents();
            return data;
        }
    });

    return {
        events,
        eventsLoading
    }
}

export default useEvents;
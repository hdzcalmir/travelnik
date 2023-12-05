import ChatAPI from "@/interceptor/Chat/Chat";
import { useQuery } from "@tanstack/react-query";
import { IChat } from "@/common/interfaces/IChat";

const useChat = () => {

    const { data: messages, isLoading: messagesLoading } = useQuery<Array<IChat>, Error>({
        queryKey: ["messages"],
        queryFn: async () => {
            const { data } = await ChatAPI.fetchMessages();
            return data;
        }
    });

    return {
        messages,
        messagesLoading,
    }
}

export default useChat;
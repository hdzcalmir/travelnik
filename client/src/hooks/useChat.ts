import ChatAPI from "@/interceptor/Chat/Chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IChat } from "@/common/interfaces/IChat";

const useChat = () => {
    const queryClient = useQueryClient();

    const { data: messages, isLoading: messagesLoading } = useQuery<Array<IChat>, Error>({
        queryKey: ["messages"],
        queryFn: async () => {
            const { data } = await ChatAPI.fetchMessages();
            return data;
        }
    });

    const sendMessage = async ({ message }: { message: string }) => {
        await ChatAPI.sendMessage(message);
    }

    const updateChatMutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
    });

    return {
        messages,
        messagesLoading,
        updateChatMutation
    }
}

export default useChat;
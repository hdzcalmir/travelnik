import http from "../http";

const ChatAPI = {
    fetchMessages: async () => {
        const response = await http.get('/chat');
        return response;
    },
    sendMessage: async (message: string) => {
        const response = await http.post('/chat', { message });
        return response;
    },
};

export default ChatAPI;

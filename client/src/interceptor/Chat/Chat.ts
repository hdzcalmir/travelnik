import http from "../http";

const ChatAPI = {
    fetchMessages: async () => {
        const response = await http.get('/chat');
        return response;
    },
};

export default ChatAPI;

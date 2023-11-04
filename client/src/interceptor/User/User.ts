import http from "../http";
const UserAPI = {
    login: async (email: string, password: string) => {
        const response = await http.post('/user/login', { email, password });
        return response;
    },
    protectedRoute: async () => {
        const response = await http.get('/user/auth');
        return response;
    },
};
export default UserAPI;
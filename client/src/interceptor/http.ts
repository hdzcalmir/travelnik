import axios from 'axios';
import toast from 'react-hot-toast';

const http = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
});

http.interceptors.request.use(
    (config) => {
        return {
            ...config,
            url: `${http.defaults.baseURL}${config.url}`,
        };
    },
    (error) => {
        toast.error("test");
        return Promise.reject(error);
    }
);

export default http;

import axios from 'axios';
import { QueryClient } from 'react-query';

const axiosInstance = axios.create({
    baseURL: `http://localhost:8000/api`,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_CANCELED') {
            return Promise.resolve({ status: 499 });
        } else {
            return Promise.reject(
                (error.response && error.response.data) || 'Error'
            );
        }
    }
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 0,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            retry: 0,
        },
    },
});

export { axiosInstance as api, queryClient };

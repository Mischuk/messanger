import axios from 'axios';

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

export { axiosInstance as api };

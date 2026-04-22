import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1.0';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,

    headers: {
        'Content-Type': 'application/json',
        'x-tenant-domain': typeof window !== 'undefined' ? window.location.origin : '',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY || ''}`
    },
});

// Global error toast handler
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("BACKEND ERROR:", error.response.data);
            return Promise.reject(error.response.data);
        }
        
        if (!error.response) {
            console.error(`AXIOS ERROR: ${error.message}`);
            // Don’t use APIResponseHandler here, just reject
            return Promise.reject(new Error(`Service is unreachable. Please wait a few minutes and try again.`));
        }
        return Promise.reject(`Service is unreachable. Please wait a few minutes and try again.`);
    }
);

export default axiosInstance;
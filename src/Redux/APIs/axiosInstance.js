import axios from 'axios';

// export const BASE_URL = "http://localhost:8080/";
// export const BASE_URL= "https://skart-backend-6.onrender.com/";
export const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
import axios from "axios";
import axiosInstance from "./axiosInstance";

const AuthApi = {
    Register: (payload) => {
        return axiosInstance.post("/api/accounts/register", payload);
    },

    VerifyEmail: (payload) => {
        return axiosInstance.post("/api/accounts/verify-otp", payload);
    },

    Login: (payload) => {
        return axiosInstance.post("/api/accounts/login", payload);
    },

    GetAllUsers: () => {
        return axiosInstance.get("/api/accounts/all-users");
    },
}

export default AuthApi;
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

    ArtistRegister: (payload, registerId) => {
        return axiosInstance.post(`/api/accounts/artist/register/${registerId}`, payload);
    },

    //get Artist Details
    FetchProfile: (userId) => {
        return axiosInstance.get(`/api/accounts/profile/${userId}`);
    },

    //update user details
    UpdateProfile: (payload, userId) => {
        return axiosInstance.put(`/api/accounts/profile/${userId}`, payload);
    },

    //update profile image
    UpdateProfileImage: (image, userId) => {
        return axiosInstance.put(`/api/accounts/profile/${userId}`, {
            profileImage: image
        });
    },

    //get Artist Profile
    FetchArtistProfile: (artistId) => {
        return axiosInstance.get(`/api/accounts/artist-profile/${artistId}`);
    },

}

export default AuthApi;
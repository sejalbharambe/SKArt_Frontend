import axios from "axios";
import axiosInstance from "./axiosInstance";

const ArtworkApi = {
    AddArtwork: (payload) => {
        return axiosInstance.post("/api/artworks/upload", payload,{
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    },

    GetArtworks: () => {
        return axiosInstance.get("/api/artworks");
    },

    AddSelectedArtwork: (payload) => {
        return axiosInstance.post("/api/selected-artworks", payload);
    },

    GetSelectedArtworks: () => {
        return axiosInstance.get("/api/selected-artworks");
    },

    //add selected artwork
    PostSelectedArtwork: (payload) => {
        return axiosInstance.post("/api/selected-artworks", payload);
    },

    //get selected artworks
    GetSelectedArtworks: () => {
        return axiosInstance.get("/api/selected-artworks");
    },

    // get active selected artwork
    GetActiveArtworks: () => {
        return axiosInstance.get("/api/selected-artworks/active");
    },

    //edit active selected artwork
    EditActiveArtwork: (id, payload) => {
        return axiosInstance.put(`/api/selected-artworks/active/${id}`, payload);
    },
}

export default ArtworkApi;
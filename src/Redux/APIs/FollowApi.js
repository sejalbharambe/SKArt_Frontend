import axiosInstance from './axiosInstance';

const FollowApi = {
    // ---------------- Follow a user ----------------
    FollowUser: (followerId, followingId) => {
        return axiosInstance.post(`/api/follow/${followingId}?followerId=${followerId}`);
    },

    // ---------------- Unfollow a user ----------------
    UnfollowUser: (followerId, followingId) => {
        return axiosInstance.delete(`/api/follow/${followingId}?followerId=${followerId}`);
    },

    // ---------------- Get followers of a user ----------------
    GetFollowers: (userId) => {
        return axiosInstance.get(`/api/follow/followers/${userId}`);
    },

    // ---------------- Get following of a user ----------------
    GetFollowing: (userId) => {
        return axiosInstance.get(`/api/follow/following/${userId}`);
    }
};

export default FollowApi;

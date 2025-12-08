import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAllUsers } from "../Redux/Slices/AuthSlice";
import {
    followUser,
    unfollowUser,
    getFollowing
} from "../Redux/Slices/FollowSlice";

import { BASE_URL } from "../Redux/APIs/axiosInstance";

const Artists = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);
    const [followStatus, setFollowStatus] = useState({});

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const currentUserId = loggedInUser?.userId;

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1️⃣ Fetch all users
                const users = await dispatch(fetchAllUsers()).unwrap();
                const onlyArtists = users.filter(u => u.role === "artist");
                setArtists(onlyArtists);

                // 2️⃣ Fetch following list (NO FollowApi)
                const following = await dispatch(
                    getFollowing({ userId: currentUserId })
                ).unwrap();

                // 3️⃣ Build follow status map
                const status = {};
                onlyArtists.forEach(artist => {
                    status[artist.id] = following.some(f => f.id === artist.id);
                });

                setFollowStatus(status);
            } catch (error) {
                console.log("Error loading:", error);
            }
        };

        loadData();
    }, [dispatch, currentUserId]);

    // FOLLOW
    const handleFollow = async (artistId) => {
        try {
            await dispatch(
                followUser({ followerId: currentUserId, followingId: artistId })
            ).unwrap();

            setFollowStatus(prev => ({ ...prev, [artistId]: true }));
        } catch (error) {
            console.log("Follow failed:", error);
        }
    };

    // UNFOLLOW
    const handleUnfollow = async (artistId) => {
        try {
            await dispatch(
                unfollowUser({ followerId: currentUserId, followingId: artistId })
            ).unwrap();

            setFollowStatus(prev => ({ ...prev, [artistId]: false }));
        } catch (error) {
            console.log("Unfollow failed:", error);
        }
    };

    const getProfileImage = (img) => {
        if (!img) return "/default.png";
        if (img.startsWith("http") || img.startsWith("/")) return img;
        return `${BASE_URL}uploads/profile-images/${img}`;
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
            {artists.map(artist => (
                <div
                    key={artist.id}
                    style={{
                        width: "220px",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "10px"
                    }}
                >
                    <div onClick={() => navigate(`/artist/${artist.id}`)} style={{ cursor: "pointer" }}>
                        <img
                            src={getProfileImage(artist.profileImage)}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                        />

                        <h3>{artist.artistSignature}</h3>
                        <p>@{artist.username}</p>
                    </div>

                    {currentUserId !== artist.id &&
                        (followStatus[artist.id] ? (
                            <button
                                onClick={() => handleUnfollow(artist.id)}
                                style={{
                                    width: "100%",
                                    background: "#ff4c4c",
                                    color: "white",
                                    padding: "8px",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    marginTop: "10px"
                                }}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                onClick={() => handleFollow(artist.id)}
                                style={{
                                    width: "100%",
                                    background: "#007bff",
                                    color: "white",
                                    padding: "8px",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    marginTop: "10px"
                                }}
                            >
                                Follow
                            </button>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default Artists;

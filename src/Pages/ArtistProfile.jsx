import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../Redux/APIs/axiosInstance";

const ArtistProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        dispatch(fetchArtistProfile(id))
            .unwrap()
            .then((data) => {
                setProfile(data);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [dispatch, id]);

    if (!profile) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

    return (
        <div style={{ padding: "20px" }}>
            {/* HEADER */}
            <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                <img
                    // src={profile.user.profileImage || "/default.png"}
                    src = {profile.user.profileImage
                        ? profile.user.profileImage.startsWith("/")
                            ? profile.user.profileImage
                        : profile.user.profileImage.startsWith("http")
                            ? profile.user.profileImage
                        : `${BASE_URL}uploads/profile-images/${profile.user.profileImage}`
                        : "/default.png"}
                    style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                />

                <div>
                    <h1>{profile.user.artistSignature}</h1>
                    <p>@{profile.user.username}</p>

                    <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                        <span><b>{profile.followersCount}</b> Followers</span>
                        <span><b>{profile.followingCount}</b> Following</span>
                        <span><b>{profile.artworksCount}</b> Artworks</span>
                        <span><b>{profile.totalLikes}</b> Total Likes</span>
                    </div>
                </div>
            </div>

            {/* ARTWORKS GRID */}
            <h2 style={{ marginTop: "30px" }}>Artworks</h2>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px"
            }}>
                {profile.artworks.map((art) => (
                    <div
                        key={art.id}
                        style={{
                            width: "240px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "10px"
                        }}
                    >
                        <img
                            src={`${BASE_URL}${art.imagePath}`}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                        />
                        <h4>{art.artName}</h4>
                        <p>{art.category}</p>
                        <p>Likes: {art.likes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtistProfile;

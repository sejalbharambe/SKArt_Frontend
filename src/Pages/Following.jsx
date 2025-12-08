import react from "react";
import { getFollowing } from "../Redux/Slices/FollowSlice";
import { useDispatch } from "react-redux";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Redux/APIs/axiosInstance";

const Following = ({userId}) => {
    const dispatch = useDispatch();
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            const res = await dispatch(getFollowing({ userId }));

            if (res.payload && Array.isArray(res.payload)) {
                setFollowing(res.payload);
            }
        };

        fetchFollowing();
    }, [dispatch, userId]);

    return (
        <div style={{ padding: "20px" }}>
            {following.map((following) => (
                <div
                    key={following.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        padding: "12px",
                        marginBottom: "10px",
                        background: "#f5f5f5",
                        borderRadius: "10px",
                    }}
                >
                    <Avatar
                        size={60}
                        src={
                            following.profileImage
                                ? `${BASE_URL}/uploads/profile-images/${following.profileImage}`
                                : null
                        }
                    >
                        {!following.profileImage && following.name[0].toUpperCase()}
                    </Avatar>

                    <div>
                        <div style={{ fontSize: "18px", fontWeight: "600" }}>
                            {following.name}
                        </div>
                        <div style={{ fontSize: "14px", color: "#666" }}>
                            @{following.username}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Following;
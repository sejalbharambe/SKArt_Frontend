import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFollowers } from "../Redux/Slices/FollowSlice";
import { Avatar } from "antd";
import { BASE_URL } from "../Redux/APIs/axiosInstance";

const Followers = ({ userId }) => {
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const res = await dispatch(getFollowers({ userId }));

      if (res.payload && Array.isArray(res.payload)) {
        setFollowers(res.payload);
      }
    };

    fetchFollowers();
  }, [dispatch, userId]);

  return (
    <div style={{ padding: "20px" }}>
      {followers.map((follower) => (
        <div
          key={follower.id}
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
          {/* Avatar */}
          <Avatar
            size={60}
            src={
              follower.profileImage
                ? `${BASE_URL}/uploads/profile-images/${follower.profileImage}`
                : null
            }
          >
            {!follower.profileImage && follower.name[0].toUpperCase()}
          </Avatar>

          {/* Text Section */}
          <div>
            <div style={{ fontSize: "18px", fontWeight: "600" }}>
              {follower.name}
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              @{follower.username}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Followers;

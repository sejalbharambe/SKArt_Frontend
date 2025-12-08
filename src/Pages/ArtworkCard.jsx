import React from "react";
import { Card, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import { BASE_URL } from "../Redux/APIs/axiosInstance";

const ArtworkCard = ({ art, userReactions, handleLike, handleDislike }) => {
  const navigate = useNavigate();

  // Navigate to artwork details page
  const handleCardClick = () => {
    navigate(`/artwork/${art.id}`);
  };

  // Stop propagation so clicking like/dislike doesn't trigger card click
  const handleLikeClick = (e) => {
    e.stopPropagation();
    handleLike(art.id);
  };

  const handleDislikeClick = (e) => {
    e.stopPropagation();
    handleDislike(art.id);
  };

  // Determine current reaction for this artwork
  const reaction = userReactions[art.id] || "none";

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      cover={
        <img
          alt={art.artName}
          src={`${BASE_URL}${art.imagePath}`}
          style={{
            height: "260px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px 10px 0 0",
          }}
        />
      }
      style={{
        borderRadius: "10px",
        boxShadow: "0 4px 8px #FFBDC5",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "1px",
      }}
    >
      {/* ---------- TEXT SECTION ---------- */}
      <div style={{ marginTop: "1px" }}>
        {/* Art Name + Price */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ color: "#333", marginBottom: "5px" }}>{art.artName}</h3>
          <span style={{ color: "green", fontWeight: "bold", fontSize: "18px" }}>
            ₹{art.price}
          </span>
        </div>

        {/* Artist */}
        <p style={{ fontStyle: "italic", color: "#555", margin: 0 }}>
          By: {art.artistName || "Unknown"}
        </p>

        {/* Painted On */}
        <p style={{ margin: "3px 0", color: "#333" }}>
          Painted On: <b>{art.paintedOn}</b>
        </p>

        {/* Size */}
        <p style={{ margin: "3px 0", color: "#333" }}>
          Size: <b>{art.size} inches</b>
        </p>
      </div>

      {/* ---------- LIKE / DISLIKE SECTION ---------- */}
      <Space style={{ marginTop: "10px", justifyContent: "center" }}>
        <Button
          type="text"
          icon={
            reaction === "like" ? (
              <LikeFilled style={{ color: "green", fontSize: "22px" }} />
            ) : (
              <LikeOutlined style={{ fontSize: "22px" }} />
            )
          }
          onClick={handleLikeClick}
        >
          {art.likes}
        </Button>

        <Button
          type="text"
          icon={
            reaction === "dislike" ? (
              <DislikeFilled style={{ color: "red", fontSize: "22px" }} />
            ) : (
              <DislikeOutlined style={{ fontSize: "22px" }} />
            )
          }
          onClick={handleDislikeClick}
        >
          {art.dislikes}
        </Button>
      </Space>
    </Card>
  );
};

export default ArtworkCard;

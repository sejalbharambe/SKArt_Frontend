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

  const handleCardClick = () => {
    navigate(`/artwork/${art.id}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation(); // prevents card click
    handleLike(art.id);
  };

  const handleDislikeClick = (e) => {
    e.stopPropagation(); // prevents card click
    handleDislike(art.id);
  };

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      cover={
        <img
          alt={art.artName}
          src={`${BASE_URL}${art.imagePath}`}
          style={{
            height: "250px",
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
      }}
    >
      <div>
        <h3 style={{ color: "#333", marginBottom: "5px" }}>{art.artName}</h3>
        <p style={{ fontStyle: "italic", color: "#555", marginBottom: "5px" }}>
          {art.artistName}
        </p>
        <p style={{ color: "#670626", fontWeight: "bold" }}>{art.category}</p>
      </div>

      <Space style={{ marginTop: "10px", justifyContent: "center" }}>
        <Button
          type="text"
          icon={
            userReactions[art.id] === "like" ? (
              <LikeFilled style={{ color: "green" }} />
            ) : (
              <LikeOutlined />
            )
          }
          onClick={handleLikeClick}
        >
          {art.likes}
        </Button>

        <Button
          type="text"
          icon={
            userReactions[art.id] === "dislike" ? (
              <DislikeFilled style={{ color: "red" }} />
            ) : (
              <DislikeOutlined />
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

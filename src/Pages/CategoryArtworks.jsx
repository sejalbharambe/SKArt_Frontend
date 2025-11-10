import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Empty, message, Spin } from "antd";
import {
  fetchArtworksByCategory,
  likeArtworkById,
  dislikeArtworkById,
} from "../Redux/Slices/ArtworkSlice";
import ArtworkCard from "../Pages/ArtworkCard";

const CategoryArtworks = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userReactions, setUserReactions] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch artworks by category
  useEffect(() => {
    if (!category) return;
    setLoading(true);

    dispatch(fetchArtworksByCategory(category))
      .unwrap()
      .then((data) => {
        setArtworks(data || []);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to load artworks for this category");
        setLoading(false);
      });
  }, [category, dispatch]);

  // LIKE
  const handleLike = async (id) => {
    if (!id) return message.error("Invalid artwork ID");
    try {
      await dispatch(likeArtworkById(id)).unwrap();
      message.success("You liked this artwork!");

      const updated = await dispatch(fetchArtworksByCategory(category)).unwrap();
      setArtworks(updated || []);
      setUserReactions((prev) => ({ ...prev, [id]: "like" }));
    } catch {
      message.error("Error liking artwork");
    }
  };

  // DISLIKE
  const handleDislike = async (id) => {
    if (!id) return message.error("Invalid artwork ID");
    try {
      await dispatch(dislikeArtworkById(id)).unwrap();
      message.success("You disliked this artwork!");

      const updated = await dispatch(fetchArtworksByCategory(category)).unwrap();
      setArtworks(updated || []);
      setUserReactions((prev) => ({ ...prev, [id]: "dislike" }));
    } catch {
      message.error("Error disliking artwork");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#670626", textAlign: "center", marginBottom: 20 }}>
        {category} Artworks
      </h2>

      {artworks && artworks.length > 0 ? (
        <Row gutter={[16, 16]}>
          {artworks.map((art) => (
            <Col xs={24} sm={12} md={8} lg={6} key={art.id}>
              <ArtworkCard
                art={art}
                userReactions={userReactions}
                handleLike={handleLike}
                handleDislike={handleDislike}
                userId={user?.id}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={`No artworks found in ${category}`} />
      )}
    </div>
  );
};

export default CategoryArtworks;

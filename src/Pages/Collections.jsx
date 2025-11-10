import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Spin, Empty, message } from "antd";
import ArtworkCard from "../Pages/ArtworkCard";
import { fetchArtworksByUserId } from "../Redux/Slices/ArtworkSlice";

const Collections = () => {
  const dispatch = useDispatch();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userReactions, setUserReactions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.userId) {
          setLoading(true);
          const response = await dispatch(fetchArtworksByUserId(storedUser.userId));
          if (response.payload) {
            setArtworks(response.payload);
          } else {
            setArtworks([]);
          }
        } else {
          message.error("User not found in local storage");
        }
      } catch (error) {
        message.error("Failed to fetch artworks");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLike = (artId) => {
    setUserReactions((prev) => ({
      ...prev,
      [artId]: prev[artId] === "like" ? null : "like",
    }));
  };

  const handleDislike = (artId) => {
    setUserReactions((prev) => ({
      ...prev,
      [artId]: prev[artId] === "dislike" ? null : "dislike",
    }));
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!artworks || artworks.length === 0) {
    return <Empty description="No artworks found" style={{ marginTop: "100px" }} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          color: "#670626",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        My Art Collections
      </h2>

      <Row gutter={[24, 24]}>
        {artworks.map((art) => (
          <Col key={art.id} xs={24} sm={12} md={8} lg={6}>
            <ArtworkCard
              art={art}
              userReactions={userReactions}
              handleLike={handleLike}
              handleDislike={handleDislike}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Collections;

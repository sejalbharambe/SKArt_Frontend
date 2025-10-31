import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Typography, Row, Col, message } from "antd";
import { BASE_URL } from "../Redux/APIs/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchArtworks } from "../Redux/Slices/ArtworkSlice";

const { Title, Paragraph } = Typography;

const ArtworkDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchArtworks())
      .unwrap()
      .then((data) => {
        const found = data.find((a) => a.id.toString() === id);
        if (found) setArtwork(found);
        else message.error("Artwork not found");
      })
      .finally(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!artwork) {
    return <h2 style={{ textAlign: "center" }}>No Artwork Found</h2>;
  }

  return (
    <Row justify="center" style={{ padding: "40px" }}>
      <Col xs={24} md={18} lg={14}>
        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <img
            src={`${BASE_URL}${artwork.imagePath}`}
            alt={artwork.artName}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          />
          <Title level={2} style={{ color: "#670626" }}>
            {artwork.artName}
          </Title>
          <Paragraph strong>Artist: {artwork.artistName}</Paragraph>
          <Paragraph>Category: {artwork.category}</Paragraph>
          <Paragraph>Likes: {artwork.likes}</Paragraph>
          <Paragraph>Dislikes: {artwork.dislikes}</Paragraph>
          <Paragraph style={{ marginTop: 20 }}>
            Description: {artwork.description || "No description provided."}
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default ArtworkDetail;

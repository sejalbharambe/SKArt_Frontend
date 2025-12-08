import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Spin,
  Typography,
  Row,
  Col,
  message,
  Button,
  Modal,
} from "antd";
import { BASE_URL } from "../Redux/APIs/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchArtworks } from "../Redux/Slices/ArtworkSlice";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ArtworkDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openImage, setOpenImage] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showView, setShowView] = useState(false);

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
    <>
      {/* --- IMAGE FULL VIEW MODAL --- */}
      <Modal
        open={openImage}
        footer={null}
        centered
        onCancel={() => setOpenImage(false)}
      >
        <img
          src={`${BASE_URL}${artwork.imagePath}`}
          alt={artwork.artName}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Modal>

      <Row
        justify="start"
        style={{
          padding: "90px 20px",
          background: "white",
        }}
      >
        {/* LEFT SIDE IMAGE BLOCK */}
        <Col
          xs={24}
          md={12}
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <img
            src={`${BASE_URL}${artwork.imagePath}`}
            alt={artwork.artName}
            onClick={() => setOpenImage(true)}
            style={{
              width: "100%",
              height: "450px",
              objectFit: "contain",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#670626",
            }}
          />
        </Col>

        {/* RIGHT SIDE DETAILS BLOCK */}
        <Col
          xs={24}
          md={12}
          style={{ paddingLeft: "20px" }}   // ⭐ 20px space between image and text
        >
          <Title level={2} style={{ color: "#670626" }}>
            {artwork.artName}
          </Title>

          <Paragraph style={{ marginBottom: "5px" }}>{artwork.description}</Paragraph>
          <Paragraph style={{ marginBottom: "5px" }}>
            Artist: <i>{artwork.artistName || "Unknown Artist"}</i>
          </Paragraph>

          <Paragraph style={{ marginBottom: "5px" }}>
            <b>Category:</b> {artwork.category}
          </Paragraph>

          <Paragraph style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <LikeOutlined />
              {artwork.likes}
            </span>

            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <DislikeOutlined />
              {artwork.dislikes}
            </span>
          </Paragraph>
          <hr />

          <Paragraph
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "40px",
            }}
          >
            {/* SIZE SECTION */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <b style={{ fontSize: "16px" }}>Size</b>
              <span style={{ marginTop: "4px" }}>{artwork.size}</span>
            </div>

            {/* BIG LINE DIVIDER */}
            <div
              style={{
                height: "50px",
                width: "2px",
                backgroundColor: "#ccc",
                margin: "0 10px",
              }}
            />

            {/* MEDIUM SECTION */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <b style={{ fontSize: "16px" }}>Medium</b>
              <span style={{ marginTop: "4px" }}>{artwork.paintedOn}</span>
            </div>
          </Paragraph>

          <hr />

          <Button
            type="primary"
            style={{
              background: "#670626",
              marginBottom: 10,
              width: "100%",
            }}
            onClick={() => setShowOffer(!showOffer)}
          >
            Make an Offer +
          </Button>

          {showOffer && (
            <div
              style={{
                background: "#f7e6ec",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Paragraph style={{ margin: 0, color: "#670626" }}>
                Please send us your offer. Our team will contact you shortly.
              </Paragraph>
            </div>
          )}

          <Button
            type="primary"
            style={{
              background: "#670626",
              marginBottom: 10,
              width: "100%",
            }}
            onClick={() => setShowView(!showView)}
          >
            Schedule for Viewing
          </Button>

          {showView && (
            <div
              style={{
                background: "#f7e6ec",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Paragraph style={{ margin: 0, color: "#670626" }}>
                Please provide your contact details. Our team will reach out to schedule a viewing.
              </Paragraph>
            </div>
          )}

          <Button
            type="default"
            style={{ width: "100%" }}
            onClick={() => setShowHelp(!showHelp)}
          >
            Need Help?
          </Button>

          {showHelp && (
            <div
              style={{
                background: "#f7e6ec",
                padding: "12px",
                borderRadius: "6px",
                marginTop: "10px",
              }}
            >
              <Paragraph style={{ margin: 0, color: "#670626" }}>
                <b>How to buy?</b>
                <br />1. Click "Make an Offer"
                <br />2. Send your price
                <br />3. Our team will assist you with payment & delivery
                <br />4. Artwork ships securely to your address
              </Paragraph>
            </div>
          )}

        </Col>
      </Row>

    </>
  );
};

export default ArtworkDetail;

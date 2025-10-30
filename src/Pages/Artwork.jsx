import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Card,
  Row,
  Col,
  Empty,
  message,
  Space,
} from "antd";
import {
  LikeOutlined, 
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  fetchArtworks,
  likeArtworkById,
  dislikeArtworkById,
} from "../Redux/Slices/ArtworkSlice";
import AddArtworkModal from "../Modals/AddArtworkModal";
import { BASE_URL } from "../Redux/APIs/axiosInstance";

const { Search } = Input;
const { Option } = Select;

const Artwork = () => {
  const dispatch = useDispatch();

  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userReactions, setUserReactions] = useState({}); // {id: "like" | "dislike"}

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "guest";

  const categories = [
    "Portrait",
    "Landscape",
    "Abstract",
    "Modern Art",
    "Surrealism",
    "Realism",
    "Pop Art",
    "Impressionism",
  ];

  // Fetch artworks
  useEffect(() => {
    dispatch(fetchArtworks())
      .unwrap()
      .then((data) => {
        setArtworks(data);
        setFilteredArtworks(data);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  // Filter logic
  useEffect(() => {
    const filtered = artworks.filter((art) => {
      const matchesSearch =
        art.artName.toLowerCase().includes(searchText.toLowerCase()) ||
        art.artistName.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategory
        ? art.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredArtworks(filtered);
  }, [searchText, selectedCategory, artworks]);

  //  Like handler
  const handleLike = (id) => {
    dispatch(likeArtworkById(id))
      .unwrap()
      .then((updated) => {
        message.success("You liked this artwork!");
        setArtworks((prev) =>
          prev.map((art) => (art.id === id ? updated : art))
        );
        setUserReactions((prev) => ({ ...prev, [id]: "like" }));
      })
      .catch(() => message.error("Error liking artwork"));
  };

  // Dislike handler
  const handleDislike = (id) => {
    dispatch(dislikeArtworkById(id))
      .unwrap()
      .then((updated) => {
        message.success("You disliked this artwork!");
        setArtworks((prev) =>
          prev.map((art) => (art.id === id ? updated : art))
        );
        setUserReactions((prev) => ({ ...prev, [id]: "dislike" }));
      })
      .catch(() => message.error("Error disliking artwork"));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: "20px" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Search + Filter */}
        <div style={{ display: "flex", gap: "10px", flex: 1, minWidth: "300px" }}>
          <Search
            placeholder="Search by Art Name or Artist Name"
            allowClear
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ flex: 2 }}
          />
          <Select
            placeholder="Filter by Category"
            allowClear
            value={selectedCategory || undefined}
            onChange={(value) => setSelectedCategory(value || "")}
            style={{ flex: 1 }}
          >
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </div>

        {/* Add Artwork Button (artist/admin only) */}
        {(userRole === "artist" || userRole === "admin") && (
          <Button
            type="primary"
            onClick={openModal}
            style={{
              backgroundColor: "#670626",
              borderColor: "#670626",
              color: "white",
              fontWeight: "bold",
            }}
          >
            + Add Artwork
          </Button>
        )}
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredArtworks.map((art) => (
            <Col xs={24} sm={12} md={8} lg={6} key={art.id}>
              <Card
                hoverable
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
                  <h3 style={{ color: "#333", marginBottom: "5px" }}>
                    {art.artName}
                  </h3>
                  <p
                    style={{ fontStyle: "italic", color: "#555", marginBottom: "5px" }}
                  >
                    {art.artistName}
                  </p>
                  <p style={{ color: "#670626", fontWeight: "bold" }}>
                    {art.category}
                  </p>
                </div>

                {/* 👍 Like / 👎 Dislike Buttons */}
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
                    onClick={() => handleLike(art.id)}
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
                    onClick={() => handleDislike(art.id)}
                  >
                    {art.dislikes}
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No artworks found" />
      )}

      {/* Modal */}
      <AddArtworkModal visible={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Artwork;

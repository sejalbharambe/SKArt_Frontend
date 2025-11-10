import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Row,
  Col,
  Empty,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import {
  fetchArtworks,
  likeArtworkById,
  dislikeArtworkById,
} from "../Redux/Slices/ArtworkSlice";
import AddArtworkModal from "../Modals/AddArtworkModal";
import ArtworkCard from "./ArtworkCard";

const { Search } = Input;
const { Option } = Select;

const Artwork = () => {
  const dispatch = useDispatch();

  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userReactions, setUserReactions] = useState({}); // { id: "like" | "dislike" }

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

  // Fetch artworks once
  useEffect(() => {
    dispatch(fetchArtworks())
      .unwrap()
      .then((data) => {
        setArtworks(data || []);
        setFilteredArtworks(data || []);
      })
      .catch(() => message.error("Failed to load artworks"));
  }, [dispatch]);

  // Filter artworks dynamically
  useEffect(() => {
    const filtered = artworks.filter((art) => {
      const artName = art?.artName?.toLowerCase() || "";
      const artistName = art?.artistName?.toLowerCase() || "";
      const category = art?.category || "";

      const matchesSearch =
        artName.includes(searchText.toLowerCase()) ||
        artistName.includes(searchText.toLowerCase());

      const matchesCategory = selectedCategory
        ? category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });

    setFilteredArtworks(filtered);
  }, [searchText, selectedCategory, artworks]);

  // LIKE handler
  const handleLike = async (id) => {
    if (!id) return message.error("Invalid artwork ID");

    try {
      await dispatch(likeArtworkById(id)).unwrap();
      message.success("You liked this artwork!");

      // re-fetch artworks to get updated counts
      const data = await dispatch(fetchArtworks()).unwrap();
      setArtworks(data || []);
      setFilteredArtworks(data || []);
      setUserReactions((prev) => ({ ...prev, [id]: "like" }));
    } catch {
      message.error("Error liking artwork");
    }
  };

  // DISLIKE handler
  const handleDislike = async (id) => {
    if (!id) return message.error("Invalid artwork ID");

    try {
      await dispatch(dislikeArtworkById(id)).unwrap();
      message.success("You disliked this artwork!");

      // re-fetch artworks to get updated counts
      const data = await dispatch(fetchArtworks()).unwrap();
      setArtworks(data || []);
      setFilteredArtworks(data || []);
      setUserReactions((prev) => ({ ...prev, [id]: "dislike" }));
    } catch {
      message.error("Error disliking artwork");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: 20 }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {/* Search & Filter */}
        <div style={{ display: "flex", gap: 10, flex: 1, minWidth: 300 }}>
          <Search
            placeholder="Search by Art or Artist"
            allowClear
            value={searchText}
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

        {/* Add Button */}
        {/* {(userRole === "artist" || userRole === "admin") && (
          <Button
            type="primary"
            onClick={openModal}
            style={{
              backgroundColor: "#670626",
              borderColor: "#670626",
              fontWeight: "bold",
            }}
          >
            + Add Artwork
          </Button>
        )} */}
      </div>

      {/* Artwork Grid */}
      {filteredArtworks && filteredArtworks.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredArtworks.map((art) => (
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
        <Empty description="No artworks found" />
      )}

      {/* Add Artwork Modal */}
      <AddArtworkModal visible={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Artwork;

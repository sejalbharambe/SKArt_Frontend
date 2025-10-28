import React, { useState, useEffect } from "react";
import { Button, Input, Select, Card, Row, Col, Empty, message } from "antd";
import { useDispatch } from "react-redux";
import { fetchArtworks } from "../Redux/Slices/ArtworkSlice";
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

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "guest"; // default fallback

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

  // 🔄 Fetch artworks
  useEffect(() => {
    dispatch(fetchArtworks())
      .unwrap()
      .then((data) => {
        setArtworks(data);
        setFilteredArtworks(data);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  // 🔍 Filter logic
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

        {/* ✅ Add Artwork Button (only for artist/admin) */}
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
                }}
              >
                <h3 style={{ color: "#333", marginBottom: "5px" }}>{art.artName}</h3>
                <p style={{ fontStyle: "italic", color: "#555", marginBottom: "5px" }}>
                  {art.artistName}
                </p>
                <p style={{ color: "#670626", fontWeight: "bold" }}>{art.category}</p>
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

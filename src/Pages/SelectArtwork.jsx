import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Row, Col, Card, Tag, Modal } from "antd";
import { fetchSelectedArtworks, editActiveArtwork } from "../Redux/Slices/ArtworkSlice";
import { BASE_URL } from "../Redux/APIs/axiosInstance";
import AddSelectedArtModal from "../Modals/AddSelectedArtModal";

const SelectArtwork = () => {
    const dispatch = useDispatch();
    const [artworksData, setArtworksData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedSet, setSelectedSet] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch selected artworks
    useEffect(() => {
        const fetchData = async () => {
            const resultAction = await dispatch(fetchSelectedArtworks());
            if (fetchSelectedArtworks.fulfilled.match(resultAction)) {
                setArtworksData(resultAction.payload);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleEdit = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        await dispatch(editActiveArtwork({ id, payload: { active: newStatus } }));
        const resultAction = await dispatch(fetchSelectedArtworks());
        if (fetchSelectedArtworks.fulfilled.match(resultAction)) {
            setArtworksData(resultAction.payload);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#d0006f", textAlign: "center", marginBottom: "25px" }}>
                Selected Artworks
            </h2>

            {/* ✅ Search and Button Row */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 25 }}>
                <Col xs={24} sm={12} md={8}>
                    <Input
                        placeholder="Search by Set ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="large"
                        allowClear
                    />
                </Col>
                <Col xs={24} sm={12} md="auto" style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            backgroundColor: "#d0006f",
                            borderColor: "#d0006f",
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}
                        onClick={() => setShowModal(true)}
                    >
                        Create List
                    </Button>
                </Col>
            </Row>

            {/* ✅ Card Grid (4 per row on large screens) */}
            <Row gutter={[24, 24]}>
                {artworksData
                    .filter((item) => item.id.toString().includes(searchTerm))
                    .map((item) => (
                        <Col key={item.id} xs={24} sm={12} md={12} lg={6}>
                            <Card
                                hoverable
                                bordered
                                style={{
                                    borderColor: item.active ? "#d0006f" : "#ffb6c1",
                                    borderWidth: 3,
                                    borderRadius: 15,
                                    textAlign: "center",
                                    backgroundColor: "#fff0f5",
                                }}
                                onClick={() => {
                                    setSelectedSet(item);
                                    setShowImageModal(true);
                                }}
                                cover={
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(2, 1fr)",
                                            gap: 10,
                                            padding: 10,
                                        }}
                                    >
                                        {item.artworks.slice(0, 4).map((art) => (
                                            <img
                                                key={art.id}
                                                src={`${BASE_URL}${art.imagePath}`}
                                                alt={art.artName}
                                                style={{
                                                    width: "100%",
                                                    height: "120px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                    border: "2px solid #ffb6c1",
                                                }}
                                            />
                                        ))}
                                    </div>
                                }
                            >
                                <Tag color={item.active ? "green" : "red"} style={{ fontWeight: "bold" }}>
                                    {item.active ? "Active" : "Inactive"}
                                </Tag>
                                <h3 style={{ color: "#d0006f" }}>Selected Set #{item.id}</h3>
                                <Button
                                    type="primary"
                                    block
                                    size="middle"
                                    style={{
                                        backgroundColor: "#d0006f",
                                        borderColor: "#d0006f",
                                        marginTop: 10,
                                        borderRadius: 8,
                                        fontWeight: "bold",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(item.id, item.active);
                                    }}
                                >
                                    {item.active ? "Deactivate" : "Activate"}
                                </Button>
                            </Card>
                        </Col>
                    ))}
            </Row>

            {/* ✅ Create List Modal */}
            <Modal
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
                width={900}
                centered
                destroyOnClose
                title={<span style={{ color: "#d0006f" }}>Create New List</span>}
            >
                <AddSelectedArtModal />
            </Modal>

            {/* ✅ Image Preview Modal */}
            <Modal
                open={showImageModal}
                onCancel={() => setShowImageModal(false)}
                footer={null}
                width={950}
                centered
                destroyOnClose
                title={
                    <span style={{ color: "#d0006f" }}>
                        Selected Set #{selectedSet?.id}
                    </span>
                }
            >
                {selectedSet && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: "15px",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}
                    >
                        {selectedSet.artworks.map((art) => (
                            <img
                                key={art.id}
                                src={`${BASE_URL}${art.imagePath}`}
                                alt={art.artName}
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    border: "2px solid #ffb6c1",
                                }}
                            />
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SelectArtwork;

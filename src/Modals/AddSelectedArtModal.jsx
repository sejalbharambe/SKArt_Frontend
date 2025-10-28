import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchArtworks, postSelectedArtwork } from "../Redux/Slices/ArtworkSlice";
import { BASE_URL } from "../Redux/APIs/axiosInstance";

const AddSelectedArtModal = () => {
    const dispatch = useDispatch();
    const [artworks, setArtworks] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resultAction = await dispatch(fetchArtworks());
            if (fetchArtworks.fulfilled.match(resultAction)) {
                setArtworks(resultAction.payload);
            }
        };
        fetchData();
    }, [dispatch]);

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleSubmit = async () => {
        if (selectedIds.length === 0) return alert("Select at least one artwork!");
        const resultAction = await dispatch(postSelectedArtwork(selectedIds));
        if (postSelectedArtwork.fulfilled.match(resultAction)) {
            alert("Selected artworks saved successfully!");
            setSelectedIds([]);
        }
    };

    const modalStyle = { padding: "20px", maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif" };
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 150px)", // 3 fixed-size images per row
        gap: "15px",
        marginTop: "20px",
        justifyContent: "center",
    };
    const cardStyle = (isSelected) => ({
        position: "relative",
        width: "150px",
        height: "150px",
        cursor: "pointer",
        perspective: "1000px",
        border: isSelected ? "3px solid #d0006f" : "2px solid #ffb6c1",
        borderRadius: "10px",
    });
    const flipInnerStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
    };
    const flipFrontBackStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        borderRadius: "10px",
        overflow: "hidden",
    };
    const flipFrontStyle = { ...flipFrontBackStyle };
    const flipBackStyle = {
        ...flipFrontBackStyle,
        backgroundColor: "#d0006f",
        color: "#fff",
        transform: "rotateY(180deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "10px",
        fontSize: "14px",
    };
    const checkmarkStyle = {
        position: "absolute",
        top: "5px",
        right: "5px",
        background: "#ffb6c1",
        color: "#d0006f",
        fontWeight: "bold",
        borderRadius: "50%",
        width: "22px",
        height: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
    };
    const submitBtnStyle = {
        marginTop: "20px",
        padding: "12px 25px",
        backgroundColor: "#d0006f",
        border: "none",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
    };

    return (
        <div style={modalStyle}>
            <h2 style={{ color: "#d0006f" }}>Select Artworks</h2>
            <div style={gridStyle}>
                {artworks.map((art) => (
                    <div
                        key={art.id}
                        style={cardStyle(selectedIds.includes(art.id))}
                        onClick={() => toggleSelect(art.id)}
                        onMouseEnter={(e) => (e.currentTarget.firstChild.style.transform = "rotateY(180deg)")}
                        onMouseLeave={(e) => (e.currentTarget.firstChild.style.transform = "rotateY(0deg)")}
                    >
                        <div style={flipInnerStyle}>
                            <div style={flipFrontStyle}>
                                <img
                                    src={`${BASE_URL}${art.imagePath}`}
                                    alt={art.artName}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div style={flipBackStyle}>
                                <div>
                                    <p><strong>{art.artName}</strong></p>
                                    <p>{art.artistName}</p>
                                </div>
                            </div>
                        </div>
                        {selectedIds.includes(art.id) && <div style={checkmarkStyle}>✔</div>}
                    </div>
                ))}
            </div>
            <button style={submitBtnStyle} onClick={handleSubmit}>
                Save Selection
            </button>
        </div>
    );
};

export default AddSelectedArtModal;

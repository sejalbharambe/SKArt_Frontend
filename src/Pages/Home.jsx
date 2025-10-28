import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchActiveArtworks } from "../Redux/Slices/ArtworkSlice";
import { BASE_URL } from "../Redux/APIs/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../Styling/CubicGallery.css";

const Home = () => {
  const dispatch = useDispatch();
  const [activeArtworks, setActiveArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchActiveArtworks());
      if (fetchActiveArtworks.fulfilled.match(resultAction)) {
        setActiveArtworks(resultAction.payload.artworks || []);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (activeArtworks.length > 0) {
      initCubicGallery(activeArtworks.map(a => `${BASE_URL}${a.imagePath}`));
    }
  }, [activeArtworks]);

  return (
    <div className="home-container">
      {/* <div id="back-btn">SK Art Gallery</div> */}

      <div className="content">
        <h1 style={{
          fontSize: "2.5rem",
          color: "#ff80ab", // soft pink
          marginBottom: "0.5rem",
          fontWeight: "700"
        }}>
          Welcome to SK Art Gallery
        </h1>
        <p style={{
          color: "#f8bbd0", // light pink
          fontSize: "1.1rem",
          marginBottom: "1.5rem"
        }}>
          Where imagination meets canvas. Discover stunning artworks by talented artists around the world.
        </p>
        <div
          className="button"
          onClick={() => navigate("/artwork")}
          style={{
            backgroundColor: "#8b0000", // claret
            color: "#fff",
            padding: "12px 30px",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            display: "inline-block"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#a00016"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#8b0000"}
        >
          Explore Artworks
        </div>
      </div>

      <section className="inf-grid-hero-container">
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="top"></div>
      </section>
    </div>
  );
};

export default Home;

/* ---------- cubic gallery logic (ported to React) ---------- */
function initCubicGallery(images) {
  const directions = ["top", "right", "bottom", "left"];
  let density = 5;
  let distance = 0;
  let speed = 200;
  let isPaused = false;
  let allGridElements = [];
  let intervalId;

  const gridContainer = document.querySelector(".inf-grid-hero-container");

  const renderWalls = () => {
    gridContainer.style.setProperty("--grid-sz", density);
    gridContainer.style.setProperty("--rev-dis", distance);
    allGridElements = [];

    directions.forEach((dir) => {
      const parent = document.querySelector(`.${dir}`);
      if (!parent) return;
      parent.innerHTML = "";
      const total = density * density;
      for (let i = 0; i < total; i++) {
        const div = document.createElement("div");
        parent.appendChild(div);
        allGridElements.push(div);
      }
    });
    startImageInterval();
  };

  const startImageInterval = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (isPaused) return;
      const unloaded = allGridElements.filter(
        (el) => !el.classList.contains("loaded")
      );
      if (unloaded.length === 0) return;
      const random = unloaded[Math.floor(Math.random() * unloaded.length)];
      const randomImage = images[Math.floor(Math.random() * images.length)];
      random.style.background = `url('${randomImage}') center/cover`;
      random.classList.add("loaded");
      random.addEventListener("click", () => {
        random.classList.add("selected");
        random.parentNode.classList.add("selectedPane");
        pauseInterval();
      });
    }, speed);
  };

  const pauseInterval = () => {
    isPaused = true;
  };

  document.querySelector(".button").addEventListener("click", () => {
    distance = distance === 100 ? 0 : 100;
    gridContainer.style.setProperty("--rev-dis", distance);
  });

  renderWalls();
}

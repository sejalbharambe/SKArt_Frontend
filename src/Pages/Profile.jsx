import React, { useEffect, useState } from "react";
import { Button, Card, Avatar, Typography, Space, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, updateUserProfileImage } from "../Redux/Slices/AuthSlice";
import AddArtworkModal from "../Modals/AddArtworkModal";
import { getFollowers, getFollowing } from "../Redux/Slices/FollowSlice";
import Collections from "../Pages/Collections";
import EditProfileModal from "../Modals/EditProfileModal";
import Banner from "./Banner";
import SelectProfileImage from "./SelectProfileImage";
import { BASE_URL } from "../Redux/APIs/axiosInstance";
import Followers from "./Followers";
import Following from "./Following";

const { Text, Title } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.auth);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);

  // Fetch live profile from backend
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const userId = parsed.userId;

    if (userId) {
      dispatch(fetchUserDetails(userId));

      dispatch(getFollowers({ userId })).then((res) => {
        if (res.payload) {
          setFollowersCount(res.payload.length);
          setFollowersList(res.payload);
        }
      });

      dispatch(getFollowing({ userId })).then((res) => {
        if (res.payload) {
          setFollowingCount(res.payload.length);
          setFollowingList(res.payload);
        }
      });
    }
  }, [dispatch]);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const handleToggleCollections = () => setShowCollections((prev) => !prev);

  if (loading || !currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading profile…
      </div>
    );
  }

  const user = currentUser;

  // --- Handle default image choosing ---
  const handleDefaultImageSelect = (imgUrl) => {
    dispatch(updateUserProfileImage({
      userId: currentUser.userId,
      image: imgUrl
    }));
  };

  const profileSrc =
    user.profileImage
      ? user.profileImage.startsWith("http")
        ? user.profileImage
        : user.profileImage.startsWith("/")
          ? `${BASE_URL}${user.profileImage}`
          : `${BASE_URL}uploads/profile-images/${user.profileImage}`
      : user.selectedDefaultedImage
        ? `/default-icons/${user.selectedDefaultedImage}`
        : "/default-icons/default-profile.png";

  return (
    <div>
      {/* Banner  */}

      {/* banner image change when refreshed */}
      {/* <Banner  bannerImage={user.bannerImage}>
        <Button type="primary" shape="round" onClick={handleOpenModal}>
          Add Work
        </Button>
        <Button shape="round">Wishlist</Button>
      </Banner> */}

      {/* banner image one user one image  */}
      <Banner userId={user.userId}>
        <Button type="primary" shape="round" onClick={handleOpenModal}>
          Add Work
        </Button>
        {/* <Button shape="round">Wishlist</Button> */}
      </Banner>

      {/* ===== Main Layout ===== */}
      <div style={{ marginTop: "-80px", padding: "0 40px" }}>
        <Row gutter={24}>
          {/* ---- Left Profile Card ---- */}
          <Col xs={24} sm={8} md={6}>
            <Card
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "30px 25px",
                textAlign: "left",
                boxShadow: "0 4px 18px rgba(255, 182, 193, 0.35)",
                border: "1px solid #f7d1dc",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  cursor: "pointer"
                }}
                onClick={() => setShowSelectModal(true)}
              >
                <Avatar
                  size={120}
                  src={
                    !user.profileImage
                      ? user.selectedDefaultImage
                      : user.profileImage.startsWith("http")
                        ? user.profileImage
                        : user.profileImage.includes("icon") ||
                          user.profileImage.includes("images") ||
                          user.profileImage.startsWith("/")
                          ? `${user.profileImage}`
                          : `${BASE_URL}uploads/profile-images/${user.profileImage}`
                  }
                  style={{
                    border: "4px solid #f7a9b8",
                    transition: "0.2s",
                  }}
                />

              </div>

              {/* Name */}
              <Title
                level={4}
                style={{
                  textAlign: "center",
                  marginBottom: "0px",
                  color: "#c2125a",
                }}> {user.name} </Title>

              {/* Username */}
              <Text
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#8a4553",
                }}
              > @{user.username} </Text>

              {/* Following + Followers */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "25px",
                }}
              >
                <div>
                  <Text strong style={{ color: "#c2125a" }}> Following </Text><br /><Text>{followingCount}</Text>
                </div>

                <div>
                  <Text strong style={{ color: "#c2125a" }}>
                    Followers
                  </Text>
                  <br />
                  <Text>{followersCount}</Text>
                </div>
              </div>

              {/* About */}
              <div style={{ marginBottom: "20px" }}>
                <Text strong style={{ color: "#c2125a" }}>About</Text>
                <p style={{ marginTop: "5px", color: "#5a3e44" }}>
                  {user.about || "—"}
                </p>
              </div>

              {/* Links */}
              {user.links && (
                <div style={{ marginBottom: "20px" }}>
                  <Text strong style={{ color: "#c2125a" }}>Links</Text>
                  <div style={{ marginTop: "10px", display: "flex", gap: "12px" }}>
                    <i className="ri-global-line" style={{ fontSize: 20 }}></i>
                    <i className="ri-instagram-line" style={{ fontSize: 20 }}></i>
                    <i className="ri-twitter-line" style={{ fontSize: 20 }}></i>
                  </div>
                </div>
              )}

              {/* Location */}
              <div style={{ marginBottom: "25px" }}>
                <Text strong style={{ color: "#c2125a" }}>Location</Text>
                <p style={{ marginTop: "5px", color: "#5a3e44" }}>
                  {user.location || "—"}
                </p>
              </div>

              {/* Edit Button */}
              <Button
                block
                shape="round"
                style={{
                  borderColor: "#c2125a",
                  color: "#c2125a",
                  fontWeight: 600,
                  height: 45,
                }}
                onClick={() => setIsEditModalVisible(true)}
              >
                Edit Profile
              </Button>
            </Card>
          </Col>

          {/* ---- Right Section ---- */}
          <Col xs={24} sm={16} md={18}>
            <div style={{ marginTop: "100px", marginBottom: "20px" }}>
              <Space wrap>
                <Button shape="round" onClick={() => {
                  setShowCollections(true);
                  setShowFollowers(false);
                  setShowFollowing(false);
                }}>
                  Collections
                </Button>

                {/* <Button shape="round">Liked Works</Button> */}
                <Button shape="round" onClick={() => {
                  setShowFollowers(true);
                  setShowCollections(false);
                  setShowFollowing(false);
                }}>
                  Followers
                </Button>
                <Button shape="round"
                  onClick={() => {
                    setShowFollowing(true);
                    setShowCollections(false);
                    setShowFollowers(false);
                  }}
                >Following</Button>
                {/* <Button shape="round">Sold Works</Button> */}
              </Space>
            </div>

            {showCollections && <Collections />}
            {showFollowers && <Followers userId={user.userId} />}
            {showFollowing && <Following userId={user.userId} />}

          </Col>
        </Row>
      </div>

      <AddArtworkModal visible={isModalVisible} onClose={handleCloseModal} />

      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        user={user}
      />

      {/* ---- Profile Image Selector Modal ---- */}
      <SelectProfileImage
        visible={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSelect={handleDefaultImageSelect}
      />
    </div>
  );
};

export default Profile;

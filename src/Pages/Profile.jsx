import { Button, Card, Descriptions, Space } from "antd";
import React, { useEffect, useState } from "react";
import AddArtworkModal from "../Modals/AddArtworkModal";
import Collections from "../Pages/Collections";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const handleToggleCollections = () =>
    setShowCollections((prev) => !prev);

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        No user data found
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <Card
        title="User Profile"
        bordered
        extra={
          <Space>
            <Button type="default" onClick={handleToggleCollections}>
              {showCollections ? "Hide Collections" : "View Collections"}
            </Button>
            <Button type="primary" onClick={handleOpenModal}>
              Add Work
            </Button>
          </Space>
        }
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {user.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        </Descriptions>
      </Card>

      <AddArtworkModal visible={isModalVisible} onClose={handleCloseModal} />

      {showCollections && (
        <div style={{ marginTop: "2rem" }}>
          <Collections />
        </div>
      )}
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { UpdateUserDetails, fetchUserDetails } from "../Redux/Slices/AuthSlice";

const EditProfileModal = ({ visible, onClose, user }) => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    about: "",
    location: "",
    artistSignature: "",
    links: {
      instagram: "",
      portfolio: "",
    },
    profileImage: "",
  });

  // Pre-fill form with user details
useEffect(() => {
  if (user) {
    setFormState((prev) => ({
      ...prev,
      name: user.name ?? prev.name,
      username: user.username ?? prev.username,
      phoneNumber: user.phoneNumber ?? prev.phoneNumber,
      about: user.about ?? prev.about,
      location: user.location ?? prev.location,
      artistSignature: user.artistSignature ?? prev.artistSignature,
      links: {
        instagram: user.links?.instagram ?? prev.links.instagram,
        portfolio: user.links?.portfolio ?? prev.links.portfolio,
      },
      profileImage: user.profileImage ?? prev.profileImage,
    }));
  }
}, [user]);

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleLinkChange = (key, value) => {
    setFormState((prev) => ({
      ...prev,
      links: { ...prev.links, [key]: value },
    }));
  };

  const handleSubmit = async () => {
    const userId = user.userId;

    await dispatch(
      UpdateUserDetails({
        payload: formState,
        userId,
      })
    );

    await dispatch(fetchUserDetails(userId)); // Refresh state

    onClose();
  };

  return (
    <Modal
      title="Edit Profile"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          <Input
            value={formState.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Username">
          <Input
            value={formState.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            value={formState.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="About">
          <Input.TextArea
            rows={3}
            value={formState.about}
            onChange={(e) => handleChange("about", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Location">
          <Input
            value={formState.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Artist Signature">
          <Input
            value={formState.artistSignature}
            onChange={(e) => handleChange("artistSignature", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Instagram Link">
          <Input
            value={formState.links.instagram}
            onChange={(e) => handleLinkChange("instagram", e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Portfolio Link">
          <Input
            value={formState.links.portfolio}
            onChange={(e) => handleLinkChange("portfolio", e.target.value)}
          />
        </Form.Item>

        <Button type="primary" block onClick={handleSubmit}>
          Update Profile
        </Button>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;

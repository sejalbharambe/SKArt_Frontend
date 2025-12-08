import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { artistRegister } from "../Redux/Slices/AuthSlice";
import { useParams, useNavigate } from "react-router-dom";

const ArtistRegistration = () => {
  const { registerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageBase64, setImageBase64] = useState("");

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
    return false;
  };

  const onFinish = (values) => {
    if (!imageBase64) {
      message.error("Please upload a profile image.");
      return;
    }

    const payload = {
      artistSignature: values.artistSignature,
      about: values.about,
      location: values.location,
      links: {
        instagram: values.instagram,
        website: values.website,
      },
      profileImage: imageBase64,
    };

    dispatch(artistRegister({ payload, registerId }))
      .unwrap()
      .then(() => {
        message.success("Artist registered successfully.");
        navigate("/login"); // ✅ redirect to login after success
      })
      .catch(() => message.error("Registration failed."));
  };

  return (
    <Card
      title="Artist Registration"
      style={{
        maxWidth: 600,
        margin: "60px auto",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Artist Signature"
          name="artistSignature"
          rules={[{ required: true, message: "Enter your artist signature" }]}
        >
          <Input placeholder="e.g. S.C." />
        </Form.Item>

        <Form.Item
          label="About"
          name="about"
          rules={[{ required: true, message: "Tell us about yourself" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Enter your location" }]}
        >
          <Input placeholder="e.g. Pune" />
        </Form.Item>

        <Form.Item label="Instagram" name="instagram">
          <Input placeholder="https://instagram.com/yourhandle" />
        </Form.Item>

        <Form.Item label="Website" name="website">
          <Input placeholder="https://yourportfolio.com" />
        </Form.Item>

        <Form.Item label="Profile Image" required>
          <Upload beforeUpload={handleImageUpload} maxCount={1} accept="image/*">
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Preview"
              style={{
                marginTop: 10,
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register Artist
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ArtistRegistration;

import React, { useState } from "react";
import { Form, Input, Button, Select, Typography, message, Card, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { registerUser, verifyEmail } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom"; //  added import

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialize navigate
  const [loading, setLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user",
    artistSignature: "",
  });

  const [otp, setOtp] = useState("");

  // Handle OTP Request (registerUser)
  const handleSendOtp = async () => {
    if (!formData.email) {
      message.warning("Enter your email first");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      if (payload.role !== "artist") delete payload.artistSignature;

      const result = await dispatch(registerUser(payload)).unwrap();
      message.success(result.message || "OTP sent successfully to your email.");
      if (result.userId) {
        setUserId(result.userId);
        setOtpVisible(true);
      }
    } catch (err) {
      message.error(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle Final Registration (verifyEmail)
  const handleRegister = async () => {
    if (!otpVisible) {
      message.warning("Please verify your email first");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(verifyEmail({ userId, otp })).unwrap();

      message.success(result.message || "Registration successful!");
      navigate("/login"); // ✅ redirect after successful verification
    } catch (err) {
      message.error(err?.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f6fa",
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          User Registration
        </Title>

        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
            <Input
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
            <Input
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter valid email" }]}>
            <Row gutter={8}>
              <Col span={16}>
                <Input
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Col>
              <Col span={8}>
                <Button type="primary" onClick={handleSendOtp} loading={loading} block>
                  Verify OTP
                </Button>
              </Col>
            </Row>
          </Form.Item>

          {otpVisible && (
            <Form.Item label="OTP" name="otp" rules={[{ required: true, message: "Enter the OTP sent to email" }]}>
              <Input
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Phone number is required" }]}>
            <Input
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
            >
              <Option value="user">Normal User</Option>
              <Option value="artist">Artist</Option>
              {/* <Option value="admin">Admin</Option> */}
            </Select>
          </Form.Item>

          {formData.role === "artist" && (
            <Form.Item label="Artist Signature" name="artistSignature">
              <Input
                placeholder="Enter your artist signature"
                value={formData.artistSignature}
                onChange={(e) => setFormData({ ...formData, artistSignature: e.target.value })}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>

          {/*  Redirect link to Login */}
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span>Already have an account?{" "}
              <a onClick={() => navigate("/login")} style={{ color: "#670626", fontWeight: 500 }}>
                Login
              </a>
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;

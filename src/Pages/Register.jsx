import React, { useState } from "react";
import { Form, Input, Button, Select, Typography, message, Card, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { registerUser, verifyEmail } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  });
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!formData.email) {
      message.warning("Enter your email first");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
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

  const handleRegister = async () => {
    if (!otpVisible) {
      message.warning("Please verify your email first");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(verifyEmail({ userId, otp })).unwrap();
      message.success(result.message || "Registration successful!");

      //  Redirect logic
      if (formData.role === "artist") {
        navigate(`/artist-register/${userId}`);
      } else {
        navigate("/login");
      }
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
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Row gutter={8}>
              <Col span={16}>
                <Input
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
            <Form.Item label="OTP" name="otp" rules={[{ required: true }]}>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
            <Input
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
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            Already have an account?{" "}
            <a onClick={() => navigate("/login")} style={{ color: "#670626" }}>
              Login
            </a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      message.success(result.message || "Login successful");
      navigate("/"); // redirect after successful login
    } catch (err) {
      message.error(err?.message || "Invalid email or password");
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
          width: 400,
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          User Login
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
          >
            <Input
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* Register Text Below */}
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Text>
            Don’t have an account?{" "}
            <a
              onClick={() => navigate("/register")}
              style={{ color: "#670626", fontWeight: 500 }}
            >
              Register
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;

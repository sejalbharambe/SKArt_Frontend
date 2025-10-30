import React, { useEffect, useState } from "react";
import { Table, message, Spin, Card } from "antd";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../Redux/Slices/AuthSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await dispatch(fetchAllUsers()).unwrap();
        setUsers(response || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        message.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [dispatch]);

  // Define table structure
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (verified) => (verified ? "✅ Yes" : "❌ No"),
    },
  ];

  return (
    <div style={{ padding: "80px 20px" }}>
      <Card
        title="All Registered Users"
        bordered={false}
        style={{ maxWidth: 1200, margin: "0 auto", border: "1px solid #eee", borderRadius: "12px" }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={users}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </Card>
    </div>
  );
};

export default AllUsers;

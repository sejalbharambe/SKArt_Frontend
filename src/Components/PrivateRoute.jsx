import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const PrivateRoute = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  const handleLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate("/");
  };

  // show modal if unauthenticated
  if (!user) {
    return (
      <Modal
        open={showModal}
        title="Login Required"
        onOk={handleLogin}
        onCancel={handleCancel}
        okText="Login"
        cancelText="Cancel"
        centered
        maskClosable={false}
        okButtonProps={{
          style: { backgroundColor: "#670626", borderColor: "#670626" },
        }}
      >
        <p>You need to log in to access this page.</p>
      </Modal>
    );
  }

  return children;
};

export default PrivateRoute;

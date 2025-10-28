import React, { useEffect, useState } from "react";
import { Menu, Drawer, Button, message } from "antd";
import {
  HomeOutlined,
  PictureOutlined,
  MenuOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "guest"; // fallback for not logged-in users

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  message.config({
    top: 80,
    duration: 2,
    maxCount: 1,
  });

  const getSelectedKey = () => {
    if (location.pathname === "/") return "1";
    if (location.pathname.startsWith("/artwork")) return "2";
    if (location.pathname.startsWith("/selectartwork")) return "3";
    return "";
  };

  const handleProtectedNav = (path) => navigate(path);

  const renderMenu = (mode = "horizontal") => {
    const menuItems = [
      {
        key: "1",
        icon: <HomeOutlined />,
        label: "Home",
      },
      {
        key: "2",
        icon: <PictureOutlined />,
        label: "Artwork",
      },
    ];

    // ✅ Only admins can see “Select Artwork”
    if (userRole === "admin") {
      menuItems.push({
        key: "3",
        label: "Select Artwork",
      });
    }

    return (
      <Menu
        mode={mode}
        selectedKeys={[getSelectedKey()]}
        style={{
          background: "transparent",
          borderBottom: "none",
          flex: 1,
          justifyContent: mode === "horizontal" ? "flex-end" : "flex-start",
        }}
        onClick={({ key }) => {
          if (isMobile) setDrawerVisible(false);
          switch (key) {
            case "1":
              navigate("/");
              break;
            case "2":
              handleProtectedNav("/artwork");
              break;
            case "3":
              handleProtectedNav("/selectartwork");
              break;
            default:
              break;
          }
        }}
        items={menuItems}
      />
    );
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        height: "66px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        borderBottom: "3px solid #ffbdc5",
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: "20px", fontWeight: "bold", marginRight: "30px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          SKArt
        </Link>
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <>
          <div style={{ flex: 1 }}>{renderMenu("horizontal")}</div>

          <div style={{ display: "flex", gap: "10px" }}>
            {!user ? (
              <Button
                icon={<LoginOutlined />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : (
              <Button
                danger
                onClick={() => {
                  localStorage.removeItem("user");
                  message.success("Logged out successfully");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: "22px" }} />}
            onClick={() => setDrawerVisible(true)}
            style={{ marginLeft: "auto" }}
          />
          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            {renderMenu("inline")}
            <div style={{ padding: "10px" }}>
              {!user ? (
                <Button
                  block
                  icon={<LoginOutlined />}
                  onClick={() => {
                    setDrawerVisible(false);
                    navigate("/login");
                  }}
                  style={{ marginBottom: "8px" }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  block
                  danger
                  onClick={() => {
                    localStorage.removeItem("user");
                    message.success("Logged out successfully");
                    setDrawerVisible(false);
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </Drawer>
        </>
      )}

      {/* Custom Styles */}
      <style>
        {`
          .ant-menu-horizontal {
            border-bottom: none !important;
          }
          .ant-menu-horizontal .ant-menu-item::after {
            display: none !important;
          }
          .ant-menu-horizontal .ant-menu-item-selected {
            color: #670626 !important;
            border-bottom: 3px solid #670626 !important;
          }
          .ant-menu-horizontal .ant-menu-item-selected .anticon {
            color: #670626 !important;
          }
          .ant-menu-horizontal .ant-menu-item:hover {
            color: #ffbdc5 !important;
            border-bottom: 3px solid #ffbdc5;
          }
          .ant-menu-horizontal .ant-menu-item:hover .anticon {
            color: #ffbdc5 !important;
          }
          .ant-menu-inline .ant-menu-item-selected,
          .ant-menu-inline .ant-menu-item:hover {
            color: #670626 !important;
          }
          .ant-menu-inline .ant-menu-item-selected .anticon,
          .ant-menu-inline .ant-menu-item:hover .anticon {
            color: #670626 !important;
          }
          .ant-menu-horizontal .ant-menu-item:hover, 
          .ant-menu-inline .ant-menu-item:hover {
            background-color: transparent !important;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;

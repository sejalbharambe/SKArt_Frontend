import React, { useEffect, useState } from "react";
import { Menu, Drawer, Button, message } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  CameraOutlined,
  PictureOutlined,
  AppstoreOutlined,
  BgColorsOutlined,
  ExperimentOutlined,
  SkinOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const userRole = user?.role || "guest";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const syncUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("userChange", syncUser);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userChange", syncUser);
    };
  }, []);

  message.config({
    top: 80,
    duration: 2,
    maxCount: 1,
  });

  const getSelectedKey = () => {
    if (location.pathname === "/") return "1";
    if (location.pathname.startsWith("/category/Fine Arts")) return "2";
    if (location.pathname.startsWith("/selectartwork")) return "3";
    if (location.pathname.startsWith("/masterpieces")) return "8";
    if (location.pathname.startsWith("/artists")) return "4";
    if (location.pathname.startsWith("/category/Digital and Media Art")) return "5";
    if (location.pathname.startsWith("/allusers")) return "6";
    if (location.pathname.startsWith("/profile")) return "7";
    if (location.pathname.startsWith("/category/Craft and Design")) return "9";
    if (location.pathname.startsWith("/category/Cultural and Traditional Art")) return "10";
    if (location.pathname.startsWith("/category/Decorative and Lifestyle Art")) return "11";
    if (location.pathname.startsWith("/artwork")) return "12";
    return "";
  };

  const handleLogout = () => {
    sessionStorage.removeItem("current_login_banner");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    setUser(null);
    message.success("Logged out successfully");
    navigate("/");
  };

  const handleNav = (path) => {
    if (isMobile) setDrawerVisible(false);
    navigate(path);
  };

  const renderMenu = (mode = "horizontal") => (
    <Menu
      mode={mode}
      selectedKeys={[getSelectedKey()]}
      style={{
        background: "transparent",
        borderBottom: "none",
        flex: 1,
        justifyContent: mode === "horizontal" ? "flex-end" : "flex-start",
      }}
    >
      <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => handleNav("/")}>
        Home
      </Menu.Item>

      <Menu.SubMenu key="work" icon={<PictureOutlined />} title="Work">
        <Menu.Item
          key="12"
          icon={<AppstoreOutlined />}
          onClick={() => handleNav("/artwork")}
        >
          All Artworks
        </Menu.Item>

        <Menu.Item
          key="2"
          icon={<BgColorsOutlined />}
          onClick={() => handleNav("/category/Fine Arts")}
        >
          Fine Arts
        </Menu.Item>

        <Menu.Item
          key="9"
          icon={<SkinOutlined />}
          onClick={() => handleNav("/category/Craft and Design")}
        >
          Craft & Design
        </Menu.Item>

        <Menu.Item
          key="5"
          icon={<CameraOutlined />}
          onClick={() => handleNav("/category/Digital and Media Art")}
        >
          Digital & Media Art
        </Menu.Item>

        <Menu.Item
          key="10"
          icon={<ExperimentOutlined />}
          onClick={() => handleNav("/category/Cultural and Traditional Art")}
        >
          Cultural & Traditional Art
        </Menu.Item>

        <Menu.Item
          key="11"
          icon={<HighlightOutlined />}
          onClick={() => handleNav("/category/Decorative and Lifestyle Art")}
        >
          Decorative & Lifestyle Art
        </Menu.Item>

      </Menu.SubMenu>

      {/* <Menu.Item key="8" icon={<StarOutlined />} onClick={() => handleNav("/masterpieces")}>
        Masterpieces
      </Menu.Item> */}

      <Menu.Item key="4" icon={<TeamOutlined />} onClick={() => handleNav("/artists")}>
        Artists
      </Menu.Item>

      {userRole === "admin" && (
        <Menu.Item key="3" icon={<PictureOutlined />} onClick={() => handleNav("/selectartwork")}>
          Select Artwork
        </Menu.Item>
      )}

      {userRole === "admin" && (
        <Menu.Item key="6" icon={<UserOutlined />} onClick={() => handleNav("/allusers")}>
          All Users
        </Menu.Item>
      )}

      <Menu.Item key="7" icon={<UserOutlined />} onClick={() => handleNav("/profile")}>
        Profile
      </Menu.Item>
    </Menu>
  );

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
      {/* <div style={{ fontSize: "20px", fontWeight: "bold", marginRight: "30px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          SKArt
        </Link>
      </div> */}

      <div style={{ marginRight: "30px", display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src="/Logo.png"
            alt="SKArt Logo"
            style={{
              height: "50px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <>
          <div style={{ flex: 1 }}>{renderMenu("horizontal")}</div>
          <div style={{ display: "flex", gap: "10px" }}>
            {!user ? (
              <Button icon={<LoginOutlined />} onClick={() => navigate("/login")}>
                Login
              </Button>
            ) : (
              <Button icon={< LogoutOutlined />} danger onClick={handleLogout}>
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
                    handleLogout();
                    setDrawerVisible(false);
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
      border-bottom: 3px solid #ffbdc5 !important;
    }

    .ant-menu-horizontal .ant-menu-item:hover .anticon {
      color: #ffbdc5 !important;
    }

    /* Hover + open submenu title */
    .ant-menu-horizontal .ant-menu-submenu:hover > .ant-menu-submenu-title,
    .ant-menu-horizontal .ant-menu-submenu-active > .ant-menu-submenu-title {
      color: #ffbdc5 !important;
      border-bottom: 3px solid #ffbdc5 !important;
      background: transparent !important;
    }

    /* Active submenu title */
    .ant-menu-horizontal .ant-menu-submenu-selected > .ant-menu-submenu-title {
      color: #670626 !important;
      border-bottom: 3px solid #670626 !important;
    }

    .ant-menu-horizontal .ant-menu-submenu-title .anticon {
      color: inherit !important;
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

    /* Override submenu hover and selected colors */
    .ant-menu-sub .ant-menu-item:hover,
    .ant-menu-sub .ant-menu-item-active,
    .ant-menu-sub .ant-menu-item-selected {
      background-color: #fff0f3 !important;
      color: #670626 !important;
    }

    .ant-menu-sub .ant-menu-item:hover .anticon,
    .ant-menu-sub .ant-menu-item-active .anticon,
    .ant-menu-sub .ant-menu-item-selected .anticon {
      color: #670626 !important;
    }

    /* ✅ Themed underline behavior for submenu (Work) */
    .ant-menu-horizontal .ant-menu-submenu::after {
      border-bottom: none !important;
      transition: all 0.3s ease;
    }

    .ant-menu-horizontal .ant-menu-submenu:hover::after,
    .ant-menu-horizontal .ant-menu-submenu-active::after {
      border-bottom: 3px solid #ffbdc5 !important; /* soft pink on hover */
    }

    .ant-menu-horizontal .ant-menu-submenu-open::after,
    .ant-menu-horizontal .ant-menu-submenu-selected::after {
      border-bottom: 3px solid #670626 !important; /* dark pink when active */
    }
  `}
      </style>

    </div>
  );
};

export default Sidebar;

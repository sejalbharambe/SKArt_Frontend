import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Components/Sidebar";
import MainComponent from "./Components/MainComponent";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default layout with sidebar */}
        <Route
          path="*"
          element={
            <Layout style={{ minHeight: "100vh" }}>
              <Sidebar />
              <Layout style={{ marginLeft: 0, flex: 1 }}>
                <Content
                  style={{
                    marginTop: "66px",
                    padding: 0,
                    flex: 1,
                    width: "100%",
                    minHeight: "calc(100vh - 66px - 64px)",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <MainComponent />
                </Content>
                <Footer style={{ textAlign: "center" }}>SKArt ©2025</Footer>
              </Layout>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

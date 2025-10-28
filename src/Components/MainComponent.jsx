import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Artwork from "../Pages/Artwork";
import SelectArtwork from "../Pages/SelectArtwork";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";

const MainComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/artwork" element={<PrivateRoute><Artwork /></PrivateRoute>} />
            <Route path="/selectartwork" element={<PrivateRoute><SelectArtwork /></PrivateRoute>} />
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
    );
}   

export default MainComponent;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Artwork from "../Pages/Artwork";
import SelectArtwork from "../Pages/SelectArtwork";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import Artists from "../Pages/Artists";
import Masterpieces from "../Pages/Masterpeices";
import Photography from "../Pages/Photography";
import Profile from "../Pages/Profile";
import AllUsers from "../Pages/AllUsers";
import ArtworkDetail from "../Pages/ArtworkDetail";

const MainComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/artwork" element={<PrivateRoute><Artwork /></PrivateRoute>} />
            <Route path="/artwork/:id" element={<PrivateRoute><ArtworkDetail /></PrivateRoute>} />
            <Route path="/selectartwork" element={<PrivateRoute><SelectArtwork /></PrivateRoute>} />
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/artists" element={<PrivateRoute><Artists /></PrivateRoute>} />
            <Route path="/masterpieces" element={<PrivateRoute><Masterpieces /></PrivateRoute>} />
            <Route path="/photography" element={<PrivateRoute><Photography /></PrivateRoute>} />
            <Route path="/allusers" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
    );
}   

export default MainComponent;
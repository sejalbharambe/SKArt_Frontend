import { configureStore } from "@reduxjs/toolkit";
import ArtworkReducer from "./Slices/ArtworkSlice";
import AuthReducer from "./Slices/AuthSlice";
import FollowReducer from "./Slices/FollowSlice";

const store = configureStore({
    reducer: {
        artwork: ArtworkReducer,
        auth: AuthReducer,
        follow: FollowReducer,
    },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import ArtworkReducer from "./Slices/ArtworkSlice";
import AuthReducer from "./Slices/AuthSlice";

const store = configureStore({
    reducer: {
        artwork: ArtworkReducer,
        auth: AuthReducer,
    },
});

export default store;
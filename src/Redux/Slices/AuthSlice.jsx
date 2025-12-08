import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "../APIs/AuthApi";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await AuthApi.Register(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//verify email
export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await AuthApi.VerifyEmail(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//login user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await AuthApi.Login(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//fetch all users
export const fetchAllUsers = createAsyncThunk(
    "auth/fetchAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthApi.GetAllUsers();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//artist register
export const artistRegister = createAsyncThunk(
    "auth/artistRegister",
    async ({ payload, registerId }, { rejectWithValue }) => {
        try {
            const response = await AuthApi.ArtistRegister(payload, registerId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

//fetch user Details
export const fetchUserDetails = createAsyncThunk(
    "auth/fetchUserDetails",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await AuthApi.FetchProfile(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

//update user details
export const UpdateUserDetails = createAsyncThunk(
    "auth/UpdateUserDetails",
    async ({ payload, userId }, { rejectWithValue }) => {
        try {
            const response = await AuthApi.UpdateProfile(payload, userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

//update user profile image
export const updateUserProfileImage = createAsyncThunk(
    "auth/updateUserProfileImage",
    async ({ userId, image }, { rejectWithValue }) => {
        try {
            const response = await AuthApi.UpdateProfileImage(image, userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

//fetch artist profile
export const fetchArtistProfile = createAsyncThunk (
    "auth/fetchArtistProfile",
    async (artistId, { rejectWithValue }) => {
        try {
            const response = await AuthApi.FetchArtistProfile(artistId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        users: [],
        loading: false,
        error: null,
        currentUser: null,
    },
    extraReducers: (builder) => {
        builder
            //register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user || action.payload;

                const u = action.payload.user || action.payload;

                const sanitized = {
                    userId: u.id || u.userId,
                    role: u.role,
                    email: u.email
                };

                localStorage.setItem("user", JSON.stringify(sanitized));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch all users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //verify email  
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //artist register
            .addCase(artistRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(artistRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(artistRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch user details
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = {
                    ...action.payload.user,
                    userId: action.payload.user.userId || action.payload.user.id // <-- FIX
                };

            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update user details
            .addCase(UpdateUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = {
                    ...action.payload.user,
                    userId: action.payload.user.userId || action.payload.user.id
                };

            })
            .addCase(UpdateUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update user profile image
            .addCase(updateUserProfileImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateUserProfileImage.fulfilled, (state, action) => {
                state.loading = false;

                // CASE 1 — Backend returns: { updatedUser: {...} }
                if (action.payload.updatedUser) {
                    state.currentUser = {
                        ...state.currentUser,
                        ...action.payload.updatedUser
                    };
                    return;
                }

                // CASE 2 — Backend returns: { user: {...} }
                if (action.payload.user) {
                    state.currentUser = {
                        ...state.currentUser,
                        ...action.payload.user
                    };
                    return;
                }

                // CASE 3 — Backend returns: { image: "..." }
                if (action.payload.image) {
                    state.currentUser = {
                        ...state.currentUser,
                        profileImage: action.payload.image,
                        selectedDefaultImage: action.payload.image
                    };
                }
            })

            .addCase(updateUserProfileImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch artist profile
            .addCase(fetchArtistProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtistProfile.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchArtistProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});
export default AuthSlice.reducer;
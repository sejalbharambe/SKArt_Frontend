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
            console.log("Fetched Users:", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
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
                state.currentUser = action.payload;

                const payload = action.payload;
                const userData = payload.user || payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
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
            });
    },
});
export default AuthSlice.reducer;
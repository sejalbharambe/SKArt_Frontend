import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FollowApi from "../APIs/FollowApi";

/* ----------------------  THUNKS  ---------------------- */

// FOLLOW
export const followUser = createAsyncThunk(
  "follow/followUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const res = await FollowApi.FollowUser(followerId, followingId);
      return { followerId, followingId }; // clean payload
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// UNFOLLOW
export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const res = await FollowApi.UnfollowUser(followerId, followingId);
      return { followerId, followingId };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// GET FOLLOWERS
export const getFollowers = createAsyncThunk(
  "follow/getFollowers",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await FollowApi.GetFollowers(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// GET FOLLOWING
export const getFollowing = createAsyncThunk(
  "follow/getFollowing",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await FollowApi.GetFollowing(userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* ----------------------  SLICE  ---------------------- */

const FollowSlice = createSlice({
  name: "follow",
  initialState: {
    loading: false,
    followers: [],
    following: [],   // << IMPORTANT: holds list of users I am following
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ------- FOLLOW ------ */
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.following.push({ id: action.payload.followingId });
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ------- UNFOLLOW ------ */
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.following = state.following.filter(
          (u) => u.id !== action.payload.followingId
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ------- GET FOLLOWERS ------ */
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ------- GET FOLLOWING ------ */
      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload; // <-- LIST OF ARTISTS USER FOLLOWS
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default FollowSlice.reducer;

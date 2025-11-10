import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ArtworkApi from '../APIs/ArtworkApi';
import { data } from 'react-router-dom';

export const postArtwork = createAsyncThunk(
    'artwork/postArtwork',
    async (payload, {rejectWithValue}) => {
        try {
            const response = await ArtworkApi.AddArtwork(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }   
);

export const fetchArtworks = createAsyncThunk(
    'artwork/fetchArtworks',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ArtworkApi.GetArtworks();
            // console.log("Fetched Artworks:", response.data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//fetch artworks by category 
export const fetchArtworksByCategory = createAsyncThunk(
    'artwork/fetchArtworksByCategory',
    async (category, {rejectWithValue}) => {
        try{
            const response = await ArtworkApi.FetchArtworksByCategory(category);
            console.log("fetched artworks by category: ", response.data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//fetch artworks by user id
export const fetchArtworksByUserId = createAsyncThunk(
    'artwork/fetchArtworkByUserId',
    async (userId, {rejectWithValue}) => {
        try{
            const response = await ArtworkApi.FetchArtworksByUserId(userId);
            console.log("fetched artworks by userid: ", response.data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// like artwork by id
export const likeArtworkById = createAsyncThunk(
  'artwork/likeArtworkById',
  async (id, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
      const response = await ArtworkApi.LikeById(id, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error liking artwork");
    }
  }
);

// dislike artwork by id
export const dislikeArtworkById = createAsyncThunk(
  'artwork/dislikeArtworkById',
  async (id, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
      const response = await ArtworkApi.DislikeById(id, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error disliking artwork");
    }
  }
);

//post selected artwork
export const postSelectedArtwork = createAsyncThunk(
    'artwork/postSelectedArtwork',
    async (payload, {rejectWithValue}) => {
        try {
            const response = await ArtworkApi.PostSelectedArtwork(payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//fetch selected artworks
export const fetchSelectedArtworks = createAsyncThunk(
    'artwork/fetchSelectedArtworks',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ArtworkApi.GetSelectedArtworks();
            console.log("Fetched Selected Artworks:", response.data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//get active selected artwork
export const fetchActiveArtworks = createAsyncThunk(
    'artwork/fetchActiveArtworks',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ArtworkApi.GetActiveArtworks();
            console.log("Fetched Active Artworks:", response.data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }   
    }
);

//edit active selected artwork
export const editActiveArtwork = createAsyncThunk(
    'artwork/editActiveArtwork',
    async ({id, payload}, {rejectWithValue}) => {
        try {
            const response = await ArtworkApi.EditActiveArtwork(id, payload);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const ArtworkSlice = createSlice({
    name: 'artwork',
    initialState: {
        loading: false,
        data: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //add artwork
            .addCase(postArtwork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })  
            .addCase(postArtwork.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(postArtwork.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;
            })

            //fetch artworks
            .addCase(fetchArtworks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtworks.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchArtworks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch artworks by category
            .addCase(fetchArtworksByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtworksByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchArtworksByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

             //fetch artworks by userID
            .addCase(fetchArtworksByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtworksByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchArtworksByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //like artwork by id
            .addCase(likeArtworkById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(likeArtworkById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(artwork => artwork.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(likeArtworkById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //dislike artwork by id
            .addCase(dislikeArtworkById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dislikeArtworkById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(artwork => artwork.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(dislikeArtworkById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //add selected artwork 
            .addCase(postSelectedArtwork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postSelectedArtwork.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(postSelectedArtwork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch selected artworks
            .addCase(fetchSelectedArtworks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSelectedArtworks.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSelectedArtworks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch active selected artworks
            .addCase(fetchActiveArtworks.pending, (state) => {
                state.loading = true;
                state.error = null;
            }   )
            .addCase(fetchActiveArtworks.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchActiveArtworks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //edit active selected artwork
            .addCase(editActiveArtwork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editActiveArtwork.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(artwork => artwork.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }   
            })
            .addCase(editActiveArtwork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});

export default ArtworkSlice.reducer;
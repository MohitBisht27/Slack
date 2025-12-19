import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMediaComments as apiGetMediaComments,
  addMediaComment as apiAddMediaComment,
  updateMediaComment as apiUpdateMediaComment,
  deleteMediaComment as apiDeleteMediaComment,
  toggleMediaCommentLike as apiToggleLike,
} from "../api/MediaCommentApi";

// --- ASYNC THUNKS ---

export const fetchMediaComments = createAsyncThunk(
  "mediaComments/fetch",
  async ({ mediaId, page }, { rejectWithValue }) => {
    try {
      const response = await apiGetMediaComments(mediaId, page);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

export const addMediaComment = createAsyncThunk(
  "mediaComments/add",
  async ({ mediaId, content, parentId }, { dispatch, rejectWithValue }) => {
    try {
      await apiAddMediaComment(mediaId, content, parentId);
      dispatch(fetchMediaComments({ mediaId }));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add failed");
    }
  }
);

export const updateMediaComment = createAsyncThunk(
  "mediaComments/update",
  async ({ commentId, content, mediaId }, { dispatch, rejectWithValue }) => {
    try {
      await apiUpdateMediaComment(commentId, content);
      dispatch(fetchMediaComments({ mediaId }));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const deleteMediaComment = createAsyncThunk(
  "mediaComments/delete",
  async ({ commentId, mediaId }, { dispatch, rejectWithValue }) => {
    try {
      await apiDeleteMediaComment(commentId);
      dispatch(fetchMediaComments({ mediaId }));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

export const toggleMediaLike = createAsyncThunk(
  "mediaComments/toggleLike",
  async ({ commentId, mediaId }, { dispatch }) => {
    try {
      await apiToggleLike(commentId);
      dispatch(fetchMediaComments({ mediaId }));
    } catch (error) {
      console.error("Like toggle failed", error);
    }
  }
);

// --- SLICE ---

const mediaCommentSlice = createSlice({
  name: "mediaComments",
  initialState: {
    items: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearMediaComments: (state) => {
      state.items = [];
      state.pagination = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.docs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMediaComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMediaComments } = mediaCommentSlice.actions;
export default mediaCommentSlice.reducer;

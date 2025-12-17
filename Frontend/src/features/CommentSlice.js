import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommentsForArticle,
  addComment as apiAddComment,
  updateComment as apiUpdateComment,
  deleteComment as apiDeleteComment,
  toggleCommentLike as apiToggleLike,
} from "../api/CommentApi";

// --- ASYNC THUNKS ---

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await getCommentsForArticle(articleId);
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/add",
  async ({ articleId, content, parentId }, { dispatch, rejectWithValue }) => {
    try {
      await apiAddComment(articleId, content, parentId);
      dispatch(fetchComments(articleId));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add failed");
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, content, articleId }, { dispatch, rejectWithValue }) => {
    try {
      await apiUpdateComment(commentId, { content });
      dispatch(fetchComments(articleId));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async ({ commentId, articleId }, { dispatch, rejectWithValue }) => {
    try {
      await apiDeleteComment(commentId);
      dispatch(fetchComments(articleId));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

export const toggleLike = createAsyncThunk(
  "comments/toggleLike",
  async ({ commentId, articleId }, { dispatch }) => {
    await apiToggleLike(commentId);
    dispatch(fetchComments(articleId));
  }
);

// --- SLICE ---

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;

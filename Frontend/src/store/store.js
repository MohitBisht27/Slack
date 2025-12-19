import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/CommentSlice";
import mediaCommentReducer from "../features/MediaCommentSlice";
export const store = configureStore({
  reducer: {
    comments: commentReducer,
    mediaComments: mediaCommentReducer,
  },
});

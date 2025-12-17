import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/CommentSlice";

export const store = configureStore({
  reducer: {
    comments: commentReducer,
  },
});

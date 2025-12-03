import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    likeBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);

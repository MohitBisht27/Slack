import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    media: {
      type: Schema.Types.ObjectId,
      ref: "DoubtMedia",
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
likeSchema.index({ comment: 1, likeBy: 1 }, { unique: true });
export const Like = mongoose.model("Like", likeSchema);

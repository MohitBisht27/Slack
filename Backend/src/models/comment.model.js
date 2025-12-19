import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    doubtMedia: {
      type: Schema.Types.ObjectId,
      ref: "DoubtMedia",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema);

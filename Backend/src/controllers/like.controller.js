import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Invalid comment ID");
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError("Comment not found");
  const existingLike = await Like.findOne({
    comment: commentId,
    likeBy: userId,
  });
  if (existingLike) {
    await existingLike.deleteOne();
    return res
      .status(200)
      .json(
        new ApiResponse(200, { liked: false }, "Comment unLiked Successfully")
      );
  } else {
    await Like.create({
      comment: commentId,
      likeBy: userId,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, { liked: true }, "Comment liked successfully")
      );
  }
});

export { toggleCommentLike };

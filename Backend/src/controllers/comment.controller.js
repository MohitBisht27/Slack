import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createComment = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  console.log(articleId);
  const { content } = req.body;
  const userId = req.user._id;
  console.log(userId);
  if (!isValidObjectId(articleId))
    throw new ApiError(400, "Comment content is required");
  const comment = await Comment.create({
    content,
    article: articleId,
    owner: userId,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

const getCommentsForArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  if (!isValidObjectId(articleId)) {
    throw new ApiError(400, "Invalid article ID");
  }
  const aggregateQuery = Comment.aggregate([
    { $match: { article: new mongoose.Types.ObjectId(articleId) } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: { username: 1, avatar: 1 },
          },
        ],
      },
    },
    { $unwind: "$owner" },
    { $sort: { createdAt: -1 } },
  ]);
  const options = {
    page: pageNumber,
    limit: limitNumber,
  };
  const result = await Comment.aggregatePaginate(aggregateQuery, options);
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Comments fetched successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (comment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You can update only your own comment");
  }

  comment.content = content || comment.content;
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (comment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You can delete only your own comment");
  }

  await Like.deleteMany({ comment: commentId }); // optional: clean up likes
  await comment.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  const existingLike = await Like.findOne({ comment: commentId, user: userId });

  if (existingLike) {
    await existingLike.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, { liked: false }, "Comment unliked"));
  } else {
    await Like.create({ comment: commentId, user: userId });
    return res
      .status(200)
      .json(new ApiResponse(200, { liked: true }, "Comment liked"));
  }
});

export {
  createComment,
  updateComment,
  getCommentsForArticle,
  toggleCommentLike,
  deleteComment,
};

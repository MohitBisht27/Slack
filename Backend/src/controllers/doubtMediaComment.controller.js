import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import DoubtMedia from "../models/doubtMedia.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const buildCommentTree = (flatComments) => {
  const commentMap = {};
  const rootComments = [];

  flatComments.forEach((c) => {
    c.replies = [];
    commentMap[c._id.toString()] = c;
  });

  flatComments.forEach((c) => {
    if (c.parentComment) {
      const parentId = c.parentComment._id || c.parentComment;
      const parent = commentMap[parentId.toString()];
      if (parent) {
        parent.replies.push(c);
        parent.replies.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else {
        rootComments.push(c);
      }
    } else {
      rootComments.push(c);
    }
  });

  return rootComments;
};

const addCommentToMedia = asyncHandler(async (req, res) => {
  const { mediaId } = req.params;
  const { content, parentCommentId } = req.body;
  const userId = req.user._id;

  if (!content) throw new ApiError(400, "Comment content is required");
  if (!isValidObjectId(mediaId)) throw new ApiError(400, "Invalid Media ID");

  const media = await DoubtMedia.findById(mediaId);
  if (!media) throw new ApiError(404, "Media post not found");

  if (parentCommentId && !isValidObjectId(parentCommentId)) {
    throw new ApiError(400, "Invalid parent comment ID");
  }

  const comment = await Comment.create({
    content,
    doubtMedia: mediaId,
    owner: userId,
    parentComment: parentCommentId || null,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added to media successfully"));
});

const getMediaComments = asyncHandler(async (req, res) => {
  const { mediaId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user?._id
    ? new mongoose.Types.ObjectId(req.user._id)
    : null;

  if (!isValidObjectId(mediaId)) throw new ApiError(400, "Invalid Media ID");

  const aggregateQuery = Comment.aggregate([
    {
      $match: {
        doubtMedia: new mongoose.Types.ObjectId(mediaId),
        parentComment: null,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [{ $project: { username: 1, avatar: 1 } }],
      },
    },
    { $unwind: "$owner" },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        isLiked: {
          $cond: [
            { $eq: [userId, null] },
            false,
            { $in: [userId, "$likes.likeBy"] },
          ],
        },
      },
    },

    {
      $graphLookup: {
        from: "comments",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentComment",
        as: "flatReplies",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "flatReplies.owner",
        foreignField: "_id",
        as: "replyOwners",
        pipeline: [{ $project: { username: 1, avatar: 1 } }],
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  const result = await Comment.aggregatePaginate(aggregateQuery, {
    page: parseInt(page),
    limit: parseInt(limit),
  });

  const docs = result.docs.map((comment) => {
    const formattedReplies = comment.flatReplies.map((reply) => {
      const owner = comment.replyOwners.find(
        (u) => u._id.toString() === reply.owner.toString()
      );
      return {
        ...reply,
        owner: owner || { username: "Unknown", avatar: "" },
        replies: [],
      };
    });

    return {
      ...comment,
      replies: buildCommentTree(formattedReplies),
      flatReplies: undefined,
      replyOwners: undefined,
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...result, docs },
        "Media comments fetched successfully"
      )
    );
});

const updateMediaComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content) throw new ApiError(400, "Content is required to update");
  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Invalid Comment ID");

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  // Authorization check
  if (comment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only update your own comments");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { $set: { content } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteMediaComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Invalid Comment ID");

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (comment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only delete your own comments");
  }
  await Like.deleteMany({ comment: commentId });
  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment and associated likes deleted"));
});

const toggleMediaCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Invalid Comment ID");

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  const existingLike = await Like.findOne({
    comment: commentId,
    likeBy: userId,
  });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Comment unliked"));
  } else {
    await Like.create({
      comment: commentId,
      likeBy: userId,
      doubtMedia: comment.doubtMedia,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: true }, "Comment liked"));
  }
});

export {
  addCommentToMedia,
  getMediaComments,
  updateMediaComment,
  deleteMediaComment,
  toggleMediaCommentLike,
};

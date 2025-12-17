import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createComment = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  console.log(articleId);
  const { content, parentCommentId } = req.body;
  const userId = req.user._id;
  console.log(userId);
  if (!isValidObjectId(articleId))
    throw new ApiError(400, "Comment content is required");

  if (parentCommentId && !isValidObjectId(parentCommentId)) {
    throw new ApiError(400, "Invalid parent comment ID");
  }
  if (parentCommentId) {
    const parent = await Comment.findById(parentCommentId);
    if (!parent) throw new ApiError(404, "Parent comment not found");
  }
  const comment = await Comment.create({
    content,
    article: articleId,
    owner: userId,
    parentComment: parentCommentId || null,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

const buildCommentTree = (flatComments) => {
  const commentMap = {};
  const rootReplies = [];

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
        rootReplies.push(c);
      }
    } else {
      rootReplies.push(c);
    }
  });

  return rootReplies;
};

const getCommentsForArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user?._id
    ? new mongoose.Types.ObjectId(req.user._id)
    : null;

  if (!isValidObjectId(articleId))
    throw new ApiError(400, "Invalid article ID");

  const aggregateQuery = Comment.aggregate([
    {
      $match: {
        article: new mongoose.Types.ObjectId(articleId),
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
          $cond: {
            if: { $eq: [userId, null] },
            then: false,
            else: { $in: [userId, "$likes.likeBy"] },
          },
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
        depthField: "depth",
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
    {
      $lookup: {
        from: "likes",
        localField: "flatReplies._id",
        foreignField: "comment",
        as: "replyLikes",
      },
    },
    {
      $project: {
        content: 1,
        owner: 1,
        createdAt: 1,
        likesCount: 1,
        isLiked: 1,
        flatReplies: 1,
        replyOwners: 1,
        replyLikes: 1,
      },
    },

    { $sort: { createdAt: -1 } },
  ]);

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const result = await Comment.aggregatePaginate(aggregateQuery, options);

  const docs = result.docs.map((topLevelComment) => {
    const formattedReplies = topLevelComment.flatReplies.map((reply) => {
      const owner = topLevelComment.replyOwners.find(
        (u) => u._id.toString() === reply.owner.toString()
      );

      const likes = topLevelComment.replyLikes.filter(
        (l) => l.comment.toString() === reply._id.toString()
      );
      const isLiked = userId
        ? likes.some((l) => l.likeBy.toString() === userId.toString())
        : false;

      return {
        ...reply,
        owner: owner || { username: "Unknown", avatar: "" },
        likesCount: likes.length,
        isLiked: isLiked,
        replies: [],
      };
    });

    const replyTree = buildCommentTree(formattedReplies);

    const directChildren = formattedReplies.filter(
      (r) => r.parentComment.toString() === topLevelComment._id.toString()
    );

    directChildren.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return {
      ...topLevelComment,
      replies: directChildren,
      flatReplies: undefined,
      replyOwners: undefined,
      replyLikes: undefined,
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { ...result, docs }, "Comments fetched successfully")
    );
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

  await Like.deleteMany({ comment: commentId });
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

  const existingLike = await Like.findOne({
    comment: commentId,
    likeBy: userId,
  });

  if (existingLike) {
    await existingLike.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, { liked: false }, "Comment unliked"));
  } else {
    await Like.create({
      comment: commentId,
      likeBy: userId,
      article: comment.article,
    });
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

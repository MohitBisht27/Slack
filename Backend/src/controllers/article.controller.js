import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Article from "../models/article.model.js";
import { User } from "../models/user.model.js";
const addArticle = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  if ([title, content].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const userId = req.user._id;
  // console.log("Current user:", userId);

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized - user not found");
  }

  const article = await Article.create({
    title,
    content,
    tags: tags || [],
    author: userId,
  });

  if (!article) {
    throw new ApiError(500, "Something went wrong while posting");
  }

  const populatedArticle = await article.populate("author", "-password");
  return res
    .status(201)
    .json(new ApiResponse(200, populatedArticle, "Posted Successfully"));
});

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find()
    .populate("author")
    .sort({ createAt: -1 });
  if (!articles) {
    throw new ApiError("Failed to fetch articles");
  }
  res
    .status(200)
    .json(new ApiResponse(200, articles, "All fetch Successfully"));
});

const getMyArticles = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  console.log("Current user:", userId);

  if (!userId) {
    throw new ApiError(401, "Unauthorized - user not found");
  }

  const articles = await Article.find({ author: userId })
    .populate("author", "-password")
    .sort({ createdAt: -1 });

  if (!articles || articles.length === 0) {
    throw new ApiError(404, "No articles found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, articles, "Articles fetched successfully"));
});

const getArticlesByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const articles = await Article.find({ author: userId })
    .populate("author", "username email -_id")
    .sort({ createdAt: -1 });

  if (!articles || articles.length === 0) {
    throw new ApiError(404, "No articles found for this user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, articles, "User's articles fetched successfully")
    );
});

const deleteArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user?._id;

  if (!articleId) {
    throw new ApiError(400, "Article ID is required");
  }

  const article = await Article.findById(articleId);

  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this article");
  }

  await Article.findByIdAndDelete(articleId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Article deleted successfully"));
});
export {
  addArticle,
  getAllArticles,
  getMyArticles,
  getArticlesByUser,
  deleteArticle,
};

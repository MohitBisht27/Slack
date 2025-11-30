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
  console.log("Current user:", userId);

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
  res.status(200).json({
    success: true,
    count: articles.length,
    data: articles,
  });
});

export { addArticle, getAllArticles };

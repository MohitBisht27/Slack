import express, { Router } from "express";

import {
  createComment,
  updateComment,
  toggleCommentLike,
  getCommentsForArticle,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/:articleId").post(verifyJWT, createComment);
router.route("/:articleId").get(getCommentsForArticle);
router.route("/:commentId").put(verifyJWT, updateComment);
router.route("/:commentId").delete(verifyJWT, deleteComment);
router.route("/:commentId/like").post(verifyJWT, toggleCommentLike);

export default router;

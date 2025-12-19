import express, { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addCommentToMedia,
  getMediaComments,
  updateMediaComment,
  deleteMediaComment,
  toggleMediaCommentLike,
} from "../controllers/doubtMediaComment.controller.js";
const router = express.Router();
router
  .route("/m/:mediaId")
  .get(getMediaComments)
  .post(verifyJWT, addCommentToMedia);
router
  .route("/m/c/:commentId")
  .patch(verifyJWT, updateMediaComment)
  .delete(verifyJWT, deleteMediaComment);
router.route("/m/like/:commentId").post(verifyJWT, toggleMediaCommentLike);

export default router;

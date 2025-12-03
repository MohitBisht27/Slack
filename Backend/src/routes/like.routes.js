import express from "express";
import { toggleCommentLike } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/comments/:commentId/like").post(verifyJWT, toggleCommentLike);

export default router;

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addArticle,
  getAllArticles,
  getMyArticles,
  getArticlesByUser,
} from "../controllers/article.controller.js";
const router = Router();
router.route("/article").post(verifyJWT, addArticle);
router.route("/getAllArticles").get(getAllArticles);
router.route("/getMyArticles").get(verifyJWT, getMyArticles);
router.route("/articles/user/:userId").get(getArticlesByUser);

export default router;

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addArticle,
  getAllArticles,
  getMyArticles,
} from "../controllers/article.controller.js";
const router = Router();
router.route("/article").post(verifyJWT, addArticle);
router.route("/getAllArticles").get(getAllArticles);
router.route("/getMyArticles").get(verifyJWT, getMyArticles);

export default router;

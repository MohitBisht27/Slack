import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addArticle,
  getAllArticles,
} from "../controllers/article.controller.js";
const router = Router();
router.route("/article").post(verifyJWT, addArticle);
router.route("/getAllArticles").get(getAllArticles);

export default router;

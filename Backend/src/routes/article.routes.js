import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addArticle } from "../controllers/article.controller.js";
const router = Router();
router.route("/article").post(verifyJWT, addArticle);

export default router;

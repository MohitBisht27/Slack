import { Router } from "express";
import { addDoubtMedia } from "../controllers/doubtMedia.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(
  verifyJWT,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addDoubtMedia
);

export default router;

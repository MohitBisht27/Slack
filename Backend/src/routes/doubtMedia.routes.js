import { Router } from "express";
import {
  addDoubtMedia,
  getImages,
  getReel,
  deleteDoubtMedia,
} from "../controllers/doubtMedia.controller.js";
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
router.route("/reels").get(getReel);
router.route("/image").get(getImages);
router.route("/delete/:mediaId").delete(verifyJWT, deleteDoubtMedia);
export default router;

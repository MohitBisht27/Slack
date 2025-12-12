import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import DoubtMedia from "../models/doubtMedia.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const addDoubtMedia = asyncHandler(async (req, res) => {
  const { title, description, mediaType, tags } = req.body;

  if (!title || !description || !mediaType) {
    throw new ApiError(400, "Title, description, and mediaType are required");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized - user not found");
  }

  const userId = req.user._id;

  const imageDoubtLocalPath = req.files?.image?.[0]?.path;
  const videoDoubtLocalPath = req.files?.video?.[0]?.path;

  if (imageDoubtLocalPath && videoDoubtLocalPath) {
    throw new ApiError(
      400,
      "You can upload either an image or a video, not both."
    );
  }

  if (!imageDoubtLocalPath && !videoDoubtLocalPath) {
    throw new ApiError(400, "Please upload either an image or a video.");
  }

  if (mediaType === "image" && !imageDoubtLocalPath) {
    throw new ApiError(400, "Media type is image, but no image file uploaded.");
  }
  if (mediaType === "video" && !videoDoubtLocalPath) {
    throw new ApiError(400, "Media type is video, but no video file uploaded.");
  }

  let image = null;
  let video = null;

  if (imageDoubtLocalPath) {
    const uploadedImage = await uploadOnCloudinary(imageDoubtLocalPath);
    image = uploadedImage?.url || null;
  } else if (videoDoubtLocalPath) {
    const uploadedVideo = await uploadOnCloudinary(videoDoubtLocalPath);
    video = uploadedVideo?.url || null;
  }

  const formattedTags = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
    ? tags.split(",").map((t) => t.trim())
    : [];

  const doubtMedia = await DoubtMedia.create({
    title,
    description,
    mediaType,
    image,
    video,
    tags: formattedTags,
    user: userId,
  });

  if (!doubtMedia) {
    throw new ApiError(500, "Something went wrong while posting");
  }

  const populatedDoubt = await doubtMedia.populate("user", "-password");

  return res
    .status(201)
    .json(new ApiResponse(201, populatedDoubt, "Doubt posted successfully"));
});

export { addDoubtMedia };

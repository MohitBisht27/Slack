import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import DoubtMedia from "../models/doubtMedia.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

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

const getReel = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const reels = await DoubtMedia.aggregate([
    { $match: { mediaType: "video" } },
    { $sample: { size: 100 } },
    { $skip: skip },
    { $limit: limit },
  ]);
  if (!reels || reels.length === 0) {
    throw new ApiError(404, "No reels found for this page");
  }
  const populatedReels = await DoubtMedia.populate(reels, {
    path: "user",
    select: "username avatar",
  });

  const formattedReels = populatedReels.map((item) => ({
    _id: item._id,
    title: item.title,
    description: item.description,
    videoUrl: item.video,
    tags: item.tags,
    user: item.user,
    createdAt: item.createdAt,
    likes: item.likes || 0,
  }));

  const totalVideos = await DoubtMedia.countDocuments({ mediaType: "video" });
  const totalPages = Math.ceil(totalVideos / limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        reels: formattedReels,
        pagination: {
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
        },
      },
      "Reels fetched successfully"
    )
  );
});

const getImages = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const images = await DoubtMedia.aggregate([
    { $match: { mediaType: "image" } },
    { $sample: { size: 100 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  if (!images || images.length === 0) {
    throw new ApiError(404, "No images found for this page");
  }

  const populatedImages = await DoubtMedia.populate(images, {
    path: "user",
    select: "username avatar",
  });

  const formattedImages = populatedImages.map((item) => ({
    _id: item._id,
    title: item.title,
    description: item.description,
    imageUrl: item.image,
    tags: item.tags,
    user: item.user,
    createdAt: item.createdAt,
    likes: item.likes || 0,
  }));

  const totalImages = await DoubtMedia.countDocuments({
    mediaType: "image",
  });

  const totalPages = Math.ceil(totalImages / limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        images: formattedImages,
        pagination: {
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
        },
      },
      "Images fetched successfully"
    )
  );
});

const deleteDoubtMedia = asyncHandler(async (req, res) => {
  const { mediaId } = req.params;

  const media = await DoubtMedia.findById(mediaId);

  if (!media) {
    throw new ApiError(404, "Media post not found");
  }

  if (media.user.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "Unauthorized: You cannot delete this post");
  }
  const mediaUrl = media.mediaType === "video" ? media.video : media.image;

  if (mediaUrl) {
    try {
      const publicId = mediaUrl.split("/").pop().split(".")[0];
      const resourceType = media.mediaType === "video" ? "video" : "image";

      await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
    } catch (error) {
      console.error("Cloudinary cleanup failed:", error.message);
    }
  }

  await DoubtMedia.findByIdAndDelete(mediaId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

export { addDoubtMedia, getReel, getImages, deleteDoubtMedia };

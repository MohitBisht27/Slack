import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    video: { type: String },
    image: { type: String },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    tags: [{ type: String, trim: true }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);
mediaSchema.index({ title: "text", description: "text" });

const DoubtMedia = mongoose.model("DoubtMedia", mediaSchema);

export default DoubtMedia;

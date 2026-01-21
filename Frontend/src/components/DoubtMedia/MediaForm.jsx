import { useState } from "react";
import { Video, Image, FileText, Tag } from "lucide-react";
import { addDoubtMedia } from "../../api/MediaApi";
import { useNavigate } from "react-router-dom";
import FormInput from "../AuthForm/FormInput";
import FormTextarea from "../AuthForm/FormTextarea";
import FormSelect from "../AuthForm/FormSelect";
import FileUpload from "../AuthForm/FileUpload";
import SubmitButton from "../AuthForm/SubmitButton";

export default function AddDoubtMediaForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaType: "image",
    tags: "",
    image: null,
    video: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "video") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("mediaType", formData.mediaType);
      const tagArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);
      tagArray.forEach((tag) => data.append("tags", tag));

      if (formData.mediaType === "image" && formData.image)
        data.append("image", formData.image);
      if (formData.mediaType === "video" && formData.video)
        data.append("video", formData.video);

      const response = await addDoubtMedia(data);

      if (response.status === 201 || response.status === 200) {
        setMessage("✅ Doubt media added successfully!");
        setFormData({
          title: "",
          description: "",
          mediaType: "image",
          tags: "",
          image: null,
          video: null,
        });

        setTimeout(() => navigate(-1), 1200);
      } else {
        setMessage("Something went wrong while posting.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error: Unable to upload media.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Share Knowledge
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm px-4 py-3 rounded-lg ${
              message.includes("success")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            icon={<FileText />}
            label="Title"
            name="title"
            placeholder="Enter title for your doubt"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <FormTextarea
            label="Description"
            name="description"
            placeholder="Explain your doubt clearly..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <FormSelect
            label="Media Type"
            name="mediaType"
            value={formData.mediaType}
            onChange={handleChange}
            options={[
              { value: "image", label: "Image" },
              { value: "video", label: "Video" },
            ]}
          />

          {formData.mediaType === "image" ? (
            <FileUpload
              label="Upload Image"
              name="image"
              accept="image/*"
              icon={<Image />}
              onChange={handleChange}
              required
            />
          ) : (
            <FileUpload
              label="Upload Video"
              name="video"
              accept="video/*"
              icon={<Video />}
              onChange={handleChange}
              required
            />
          )}

          <FormInput
            icon={<Tag />}
            label="Tags (comma separated)"
            name="tags"
            placeholder="e.g. javascript, react, error-handling"
            value={formData.tags}
            onChange={handleChange}
          />

          <SubmitButton loading={loading} text="Post" />
        </form>
      </div>
    </div>
  );
}

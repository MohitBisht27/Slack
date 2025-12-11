import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import {
  getCurrentUser,
  updateUserAvatar,
  updateUserCoverImage,
} from "../../api/UserApi";

export default function ProfileCard() {
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        setUser(response.data.data);
        setTags(response.data.data.tags || []);
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
    }
    fetchUser();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setIsUploading(true);
      const response = await updateUserAvatar(formData);
      setUser((prev) => ({
        ...prev,
        avatar: { url: response.data.data.avatar.url },
      }));
    } catch (error) {
      console.error("Failed to update avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);

    try {
      setIsUploadingCover(true);
      const response = await updateUserCoverImage(formData);
      setUser((prev) => ({
        ...prev,
        coverImage: { url: response.data.data.coverImage.url },
      }));
    } catch (error) {
      console.error("Failed to update cover image:", error);
    } finally {
      setIsUploadingCover(false);
    }
  };
  if (!user)
    return (
      <div className="h-64 flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl mx-auto overflow-hidden">
      <div className="relative h-40 sm:h-48 bg-slate-100 border-b border-slate-200 overflow-hidden">
        <img
          src={
            user.coverImage?.url ||
            "https://res.cloudinary.com/demo/image/upload/v169232/cover_default.png"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {/* Cover Upload Button */}
        <label className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer transition">
          <Camera className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />
        </label>

        {/* Loader Overlay */}
        {isUploadingCover && (
          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent animate-spin rounded-full"></div>
          </div>
        )}
      </div>

      <div className="px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-start gap-6 -mt-12">
          {/* Avatar Group */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-xl border-4 border-white shadow-md overflow-hidden bg-white">
              <img
                src={user.avatar?.url}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-xl">
              <Camera className="w-6 h-6" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-xl">
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent animate-spin rounded-full"></div>
              </div>
            )}
          </div>
          <div className="flex-1 pt-0 sm:pt-14 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              {user.username}
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
              {user.bio || ""}
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded-md text-xs font-semibold tracking-wide uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

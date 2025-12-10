import React, { useEffect, useState } from "react";
import { Users, Briefcase, Check, Camera } from "lucide-react";
import { getCurrentUser, updateUserAvatar } from "../../api/UserApi";

export default function ProfileCard() {
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        console.log(response.data);
        console.log(response.data.data.tags);
        setUser(response.data.data);
        setTags(response.data.data.tags);
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading user...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Profile Image Section */}
          <div className="relative w-full sm:w-64 h-64 sm:h-auto flex-shrink-0">
            <img
              src={user.avatar?.url}
              alt={user.username}
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-full cursor-pointer transition-all shadow-md"
            >
              <Camera className="w-5 h-5" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            {isUploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-gray-700 text-sm font-medium">
                Uploading...
              </div>
            )}
          </div>

          {/* Profile Info Section */}
          <div className="flex-1 p-8 space-y-6">
            {/* Name with Flag */}
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {user.username}
              </h1>
            </div>

            {/* Job Title */}
            <p className="text-gray-600">{user.bio}</p>
            <div className="space-y-3">
              <p className="text-gray-700 font-medium">Helping with:</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm mr-2 mb-2 inline-block"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

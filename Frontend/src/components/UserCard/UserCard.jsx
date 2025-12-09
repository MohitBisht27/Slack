import React, { useEffect, useState } from "react";
import { Users, Briefcase, Check, Camera } from "lucide-react";
import { getCurrentUser, updateUserAvatar } from "../../api/PostApi";

export default function ProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        console.log(response.data);
        setUser(response.data.data);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Profile Image */}
        <div className="relative bg-gradient-to-br from-gray-300 to-gray-400 aspect-square">
          <img
            src={user.avatar?.url}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer transition-all"
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
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm">
              Uploading...
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4">
          {/* Name*/}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
            <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-400 text-sm leading-relaxed">{user.bio}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium">312</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium">48</span>
            </div>

            {/* Follow Button */}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`ml-auto px-6 py-2 rounded-full font-medium text-sm transition-all ${
                isFollowing
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

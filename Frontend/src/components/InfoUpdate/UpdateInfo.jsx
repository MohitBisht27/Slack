import { useState } from "react";
import { Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateAccountDetails } from "../../api/UserApi";

function UpdateInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    bio: "",
  });

  const [charCount, setCharCount] = useState(0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "bio") setCharCount(value.length);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAccountDetails(formData);
      if (response.status === 200 || response.status === 201) {
        console.log("Updated Successfully");
        setFormData({ email: "", bio: "" });
        setTimeout(() => navigate("/profile"), 1500);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef3ff] to-[#faf7ff] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <User className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Update Your Profile
          </h2>
          <p className="text-gray-500 text-sm">
            Keep your information current and accurate
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Bio Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              maxLength={500}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1 flex justify-between">
              <span>
                Share your interests, background, or what makes you unique
              </span>
              <span>{charCount}/500</span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Update Profile
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Your information is secure and will only be used to improve your
          experience
        </p>
      </div>
    </div>
  );
}

export default UpdateInfo;

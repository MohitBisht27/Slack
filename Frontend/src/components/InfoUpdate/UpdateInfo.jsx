import { useState } from "react";
import { Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateAccountDetails } from "../../api/UserApi";
import FormInput from "../AuthForm/FormInput";
import FormTextarea from "../AuthForm/FormTextarea";
import SubmitButton from "../AuthForm/SubmitButton";
function UpdateInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    bio: "",
    tags: "",
  });

  const [charCount, setCharCount] = useState(0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "bio") setCharCount(value.length);
    if (name == "tags") {
      console.log("Tags input value", value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    try {
      const payload = {
        email: formData.email,
        bio: formData.bio,
        tags: tagsArray,
      };
      const response = await updateAccountDetails(payload);
      if (response.status === 200 || response.status === 201) {
        console.log("Updated Successfully");
        setFormData({ email: "", bio: "", tags: "" });
        setCharCount(0);
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        console.error("❌ Update failed:", response);
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
          <FormInput
            icon={<Mail />}
            type="email"
            label="Email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div>
            <FormTextarea
              label="Bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
            />{" "}
            <p className="text-xs text-gray-400 mt-1 flex justify-between">
              <span>
                Share your interests, background, or what makes you unique
              </span>
              <span>{charCount}/200</span>
            </p>
          </div>
          <FormInput
            label="Skills (comma separated)"
            name="tags"
            placeholder="e.g. java, algorithms, data-structures"
            value={formData.tags}
            onChange={handleChange}
          />
          {/* Submit Button */}
          <SubmitButton text="Update Detail" />
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

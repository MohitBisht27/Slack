import { useState } from "react";
import { Mail, User, Lock } from "lucide-react";
import { registerUser } from "../api/UserApi";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/AuthForm/FormInput";
import FormSelect from "../components/AuthForm/FormSelect";
import FormTextarea from "../components/AuthForm/FormTextarea";
import FileUpload from "../components/AuthForm/FileUpload";
import SubmitButton from "../components/AuthForm/SubmitButton";
import FormPass from "../components/AuthForm/FormPass";
export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    bio: "",
    avatar: null,
    coverImage: null,
    tags: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" || name === "coverImage") {
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
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      data.append("bio", formData.bio);
      const tagArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      tagArray.forEach((tag) => data.append("tags", tag));

      if (formData.avatar) data.append("avatar", formData.avatar);
      if (formData.coverImage) data.append("coverImage", formData.coverImage);
      const response = await registerUser(data);

      if (response.status === 201 || response.status === 200) {
        setMessage(
          "Registration successful! Welcome to our knowledge sharing community."
        );

        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",
          bio: "",
          tags: "",
          avatar: null,
          coverImage: null,
        });
        setTimeout(() => {
          navigate("/SigninForm");
        }, 1500);
      } else {
        setMessage("User with email or username already exists.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("User with email or username already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create Account
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm px-4 py-3 rounded-lg ${
              message.includes("successful")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            icon={<User />}
            label="Username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

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

          <FormPass
            icon={<Lock />}
            type="password"
            label="Password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <FormSelect
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
          />

          <FormTextarea
            label="Bio"
            name="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
          <FormInput
            label="Skills (comma separated)"
            name="tags"
            placeholder="e.g. java, algorithms, data-structures"
            value={formData.tags}
            onChange={handleChange}
          />
          <FileUpload
            label="Profile Picture"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
          <FileUpload
            label="Cover Image"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
          <SubmitButton loading={loading} text="Sign Up" />
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/SigninForm"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

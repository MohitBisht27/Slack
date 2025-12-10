import React, { useState } from "react";
import { Lock } from "lucide-react";
import { changeCurrentPassword, logoutUser } from "../../api/UserApi";
import FormPass from "../AuthForm/FormPass";
import SubmitButton from "../AuthForm/SubmitButton";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ text: "All fields are required", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const response = await changeCurrentPassword({
        oldPassword,
        newPassword,
      });

      setMessage({
        text: response?.data?.message || "Password changed successfully",
        type: "success",
      });
      setTimeout(async () => {
        try {
          const logoutResponse = await logoutUser();
          console.log("Logout successful:", logoutResponse.data);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("accessToken");
          navigate("/SigninForm");
        } catch (logoutError) {
          console.error(
            "Logout failed:",
            logoutError.response?.data || logoutError.message
          );
        }
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to change password. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          Change Password
        </h2>

        {/* Inline feedback message */}
        {message.text && (
          <p
            className={`text-center text-sm mb-4 ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormPass
            icon={<Lock />}
            label="Old Password"
            type="password"
            name="oldPassword"
            placeholder="Enter old password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />

          <FormPass
            icon={<Lock />}
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <FormPass
            icon={<Lock />}
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <SubmitButton
            label={loading ? "Changing..." : "Change Password"}
            text="ChangePassword"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}

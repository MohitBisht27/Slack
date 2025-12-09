import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/UserApi";

export default function LogoutButton({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await logoutUser();

      if (response.status === 200 || response.status === 204) {
        console.log("Logout successful:", response.data);
      }
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("accessToken");
      if (onLogout) onLogout();
      navigate("/SigninForm");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Something went wrong while logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

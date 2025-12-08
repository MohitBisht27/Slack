import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../../api/PostApi";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../AuthForm/FormInput";
import SubmitButton from "../AuthForm/SubmitButton";
function SignIn() {
  const navigate = useNavigate();
  const [user, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await loginUser(user);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data.accessToken);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("accessToken", response.data.accessToken);

        setMessage("Login successful! Redirecting...");
        console.log("Login successful!");
        setUserData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(
        "Something went wrong:",
        error.response?.data || error.message
      );
      setMessage(
        typeof error.response?.data === "string"
          ? error.response.data
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Welcome Back
        </h2>

        {/* Message Alert */}
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
            icon={<Mail />}
            type="email"
            name="email"
            label="Email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <FormInput
            icon={<Lock />}
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••"
            value={user.password}
            onChange={handleChange}
            required
          />

          <SubmitButton loading={loading} text="Sign In" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/RegisterForm"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;

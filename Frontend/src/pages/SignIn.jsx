import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../api/UserApi";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/AuthForm/FormInput";
import SubmitButton from "../components/AuthForm/SubmitButton";
import FormPass from "../components/AuthForm/FormPass";
import { useAuth } from "../context/AuthContext";
function SignIn() {
  const { login } = useAuth();
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
        login(response.data.data.user);
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
      setMessage("Invalid email or password.");
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

          <FormPass
            icon={<Lock />}
            type="password"
            name="password"
            label="Password"
            placeholder="••••••••"
            value={user.password}
            onChange={handleChange}
            required
          />
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
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

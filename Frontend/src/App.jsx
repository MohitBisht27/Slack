import AskProblem from "./components/Editor/DoubtEditor";
import SigninForm from "./components/SignIn/SignIn";
import RegisterForm from "./components/SignUp/SignUp";
import { useState, useEffect } from "react";
import {
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import UpdateInfo from "./components/InfoUpdate/UpdateInfo";
import Layout from "./Layout";
import Home from "./pages/Doubt";
import ProfilePage from "./pages/UserProfile";
import CommentSection from "./components/CommentCard/CommentCard";
import ChangePassword from "./components/ChangePassword/ForgetPassword";
import AddDoubtMediaForm from "./components/DoubtMedia/MediaForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Reel from "./pages/Reel";
import { AuthContextProvider } from "./context/AuthContext";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/SigninForm" element={<SigninForm />} />
      <Route path="/RegisterForm" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ChangePassword />} />

      {/* Protected Routes */}
      <Route
        path="/ask-problem"
        element={
          <ProtectedRoute>
            <AskProblem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/comment"
        element={
          <ProtectedRoute>
            <CommentSection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reel"
        element={
          <ProtectedRoute>
            <Reel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mediaForm"
        element={
          <ProtectedRoute>
            <AddDoubtMediaForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setting"
        element={
          <ProtectedRoute>
            <UpdateInfo />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const isAuthenticated = !!user;
  return (
    <AuthContextProvider value={{ user, login, logout, isAuthenticated }}>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;

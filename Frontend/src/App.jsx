import AskProblem from "./components/Editor/DoubtEditor";
import SigninForm from "./pages/SignIn";
import RegisterForm from "./pages/SignUp";
import { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import UpdateInfo from "./components/InfoUpdate/UpdateInfo";
import Layout from "./Layout";
import Doubt from "./pages/Doubt";
import ProfilePage from "./pages/UserProfile";
import CommentSection from "./components/CommentCard/CommentCard";
import ChangePassword from "./components/ChangePassword/ForgetPassword";
import AddDoubtMediaForm from "./components/DoubtMedia/MediaForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ImageDoubtFeed from "./components/DoubtImage/ImageFeed";
import Reel from "./pages/Reel";
import { AuthContextProvider } from "./context/AuthContext";
import { getCurrentUser, logoutUser } from "./api/UserApi";
import Landing from "./pages/Landing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
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
        path="/doubtFeed"
        element={
          <ProtectedRoute>
            <Doubt />
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
        path="/imageFeed"
        element={
          <ProtectedRoute>
            <ImageDoubtFeed />
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getCurrentUser();
        setUser(res.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContextProvider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;

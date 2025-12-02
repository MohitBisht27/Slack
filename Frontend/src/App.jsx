import AskProblem from "./components/Editor/Problem";
import SigninForm from "./components/SignIn/SignIn";
import RegisterForm from "./components/SignUp/SignUp";
import {
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ProfileCard from "./components/UserCard/UserCard";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="/ask-problem" element={<AskProblem />} />
      <Route path="/profile" element={<ProfileCard />} />
      <Route path="/SigninForm" element={<SigninForm></SigninForm>}></Route>
      <Route
        path="/RegisterForm"
        element={<RegisterForm></RegisterForm>}
      ></Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

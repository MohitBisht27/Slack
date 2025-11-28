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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<AskProblem />}></Route>
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

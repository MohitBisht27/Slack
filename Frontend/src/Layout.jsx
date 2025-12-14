import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  const hideLayoutPaths = ["/SigninForm", "/RegisterForm"];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div>
      {!shouldHideLayout && <Header />}
      <Outlet />
      {!shouldHideLayout && <Footer />}
    </div>
  );
}

export default Layout;

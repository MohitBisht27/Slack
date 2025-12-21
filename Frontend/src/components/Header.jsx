import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import LogoutButton from "./LogOut/LogOut";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 duration-200 ${
      isActive ? "text-orange-700" : "text-gray-700"
    } hover:text-orange-700`;

  return (
    <header className="shadow sticky top-0 z-50 bg-white">
      <nav className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="h-10 rounded-full"
            alt="Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/doubtFeed" className={navLinkClass}>
            Doubt
          </NavLink>
          <NavLink to="/reel" className={navLinkClass}>
            Reel
          </NavLink>
          <NavLink to="/imageFeed" className={navLinkClass}>
            Community
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Authenticated User */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    user?.avatar?.url ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  className="w-9 h-9 rounded-full border"
                  alt="profile"
                />
                <ChevronDown size={16} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                  <NavLink
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    View Profile
                  </NavLink>
                  <NavLink
                    to="/forgot-password"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Change Password
                  </NavLink>
                  <NavLink
                    to="/setting"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Settings
                  </NavLink>
                  <hr />
                  <LogoutButton onLogout={() => setOpen(false)} />
                </div>
              )}
            </div>
          )}

          {/* Not Authenticated */}
          {!isAuthenticated && (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/SigninForm"
                className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                to="/RegisterForm"
                className="px-4 py-2 text-sm rounded-lg bg-orange-700 text-white hover:bg-orange-800"
              >
                Get started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t px-4 py-3 space-y-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/doubtFeed" className={navLinkClass}>
            Doubt
          </NavLink>
          <NavLink to="/reel" className={navLinkClass}>
            Reel
          </NavLink>
          <NavLink to="/imageFeed" className={navLinkClass}>
            Community
          </NavLink>

          {!isAuthenticated && (
            <>
              <Link to="/SigninForm" className="block py-2">
                Log in
              </Link>
              <Link
                to="/RegisterForm"
                className="block py-2 text-orange-700 font-medium"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

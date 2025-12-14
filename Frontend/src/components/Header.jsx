import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [openProfile, setOpenProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const handleCloseAll = () => {
    setOpenProfile(false);
    setMenuOpen(false);
  };

  return (
    <header className="shadow sticky top-0 z-50 bg-white">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={handleCloseAll}>
            <img
              src="https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="mr-3 h-12 rounded-full"
              alt="Logo"
            />
            <span className="font-bold text-xl text-gray-800">UrbanSync</span>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center lg:order-2 space-x-2">
            {/* ✅ Profile Menu if logged in */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {openProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                    <NavLink
                      to="/profile"
                      onClick={handleCloseAll}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      View Profile
                    </NavLink>
                    <NavLink
                      to="/forgot-password"
                      onClick={handleCloseAll}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Change Password
                    </NavLink>
                    <NavLink
                      to="/setting"
                      onClick={handleCloseAll}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </NavLink>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        logout();
                        handleCloseAll();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* ✅ Login / Register when not logged in */}
                <Link
                  to="/SigninForm"
                  onClick={handleCloseAll}
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to="/RegisterForm"
                  onClick={handleCloseAll}
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                >
                  Get started
                </Link>
              </>
            )}

            {/* ✅ Mobile Menu Toggle */}
            <button
              className="inline-flex items-center p-2 ml-1 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* ✅ Navigation Links (Desktop + Mobile) */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  onClick={handleCloseAll}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ask-problem"
                  onClick={handleCloseAll}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } hover:text-orange-700 lg:p-0`
                  }
                >
                  Ask Problem
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reel"
                  onClick={handleCloseAll}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } hover:text-orange-700 lg:p-0`
                  }
                >
                  Reel
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

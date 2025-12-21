import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Github } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 duration-200 ${
      isActive ? "text-orange-700" : "text-gray-700"
    } hover:text-orange-700`;

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Project Logo"
                className="h-10 rounded-full"
              />
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              A modern platform for sharing knowledge, doubts, and ideas.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900">
              Resources
            </h2>
            <ul className="space-y-2 text-sm">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/doubtFeed" className={navLinkClass}>
                Doubt
              </NavLink>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900">
              Follow
            </h2>
            <a
              href="https://github.com/MohitBisht27"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900">
              Legal
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-orange-600 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-orange-600 cursor-pointer">
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {year} YourProject. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built with ❤️ by <span className="font-medium">Mohit Bisht</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

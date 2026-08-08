import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ domain }) {
  const [open, setOpen] = useState(false);

  // Dynamically set links based on whether a domain is selected
  const navLinks = domain
    ? [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard", cta: true },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Choose Domain", path: "/choose-domain", cta: true },
      ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter flex items-center"
        >
          <span className="text-indigo-600">Prep</span>
          <span className="text-gray-900">Wise</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                relative text-sm font-bold transition-all duration-300
                ${link.cta 
                  ? "bg-indigo-600 text-white px-5 py-2.5 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95" 
                  : isActive 
                    ? "text-indigo-600" 
                    : "text-gray-600 hover:text-indigo-600"}
              `}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && !link.cta && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2.5 rounded-xl bg-gray-100/80 text-xl text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `
                      block w-full text-base font-bold p-3 rounded-xl transition-colors
                      ${link.cta 
                        ? "bg-indigo-600 text-white text-center mt-2 shadow-md shadow-indigo-100" 
                        : isActive ? "text-indigo-600 bg-indigo-50" : "text-gray-800 hover:bg-gray-50"}
                    `}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

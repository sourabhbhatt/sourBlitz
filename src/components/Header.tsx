import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 bg-white dark:bg-zinc-900 shadow-sm font-[Poppins]">
      <div className="flex items-center justify-between">
        {/* Site Name */}
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300 font-medium">
          <Link to="/articles" className="hover:text-yellow-400 transition">
            Articles
          </Link>
          <Link to="/" className="hover:text-yellow-400 transition">
            Demos
          </Link>
          <FaUserCircle className="text-2xl text-yellow-500 dark:text-gray-300 hover:text-yellow-600 transition cursor-pointer" />
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-2xl text-gray-600 dark:text-gray-300"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col gap-4 text-gray-700 dark:text-gray-200"
          >
            <Link
              to="/articles"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              Articles
            </Link>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              Demos
            </Link>
            <FaUserCircle className="text-xl text-yellow-500 dark:text-gray-300 hover:text-yellow-600 transition cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

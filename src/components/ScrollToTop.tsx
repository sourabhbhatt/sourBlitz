import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <motion.button
          onClick={scrollUp}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white shadow-lg cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
          {/* <img src="/up-arrow.gif" alt="Scroll Up" className="w-6 h-6" /> */}
        </motion.button>
      )}
    </>
  );
};

export default ScrollToTop;

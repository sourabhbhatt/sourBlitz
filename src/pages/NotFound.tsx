import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center font-[Poppins] px-4">
      <motion.h1
        className="text-6xl font-bold text-indigo-600 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-gray-700 dark:text-gray-300 text-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition"
        >
          🔙 Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

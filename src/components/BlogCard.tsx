import { Blog } from "../types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { memo } from "react";

const BlogCard = memo(
  ({
    blog,
    onHover,
    disabled = false,
  }: {
    blog: Blog;
    onHover: () => void;
    disabled?: boolean;
  }) => {
    const isLong = blog.overview.length > 80;
    const shortText = blog.overview.slice(0, 60);

    const CardContent = (
      <div
        className={`group relative rounded-xl bg-white shadow-md transition-all border overflow-hidden ${
          disabled
            ? "border-gray-300 cursor-not-allowed bg-gray-100"
            : "hover:shadow-xl border-gray-200 hover:border-indigo-500 hover:bg-indigo-50"
        }`}
      >
        <div className="w-full h-40 overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              disabled ? "grayscale opacity-50" : "group-hover:scale-105"
            }`}
          />
        </div>

        <div className="p-5 flex flex-col justify-start min-h-[160px]">
          <h2
            className={`text-lg font-semibold mb-2 transition ${
              disabled ? "text-gray-500" : "text-gray-900 group-hover:text-yellow-400"
            }`}
          >
            {blog.title}
          </h2>

          <p className="text-gray-600 text-sm">
            {disabled ? (
              <span className="text-red-500 font-semibold">Coming Soon</span>
            ) : isLong ? (
              <>
                {shortText}...
                <span className="text-indigo-600 font-medium ml-1 hover:underline">
                  Read more
                </span>
              </>
            ) : (
              blog.overview
            )}
          </p>
        </div>

        {!disabled && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <HiArrowRight className="text-indigo-600 text-xl" />
          </div>
        )}
      </div>
    );

    return (
      <motion.div
        whileHover={!disabled ? { scale: 1.02 } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {disabled ? (
          <div onMouseEnter={onHover}>{CardContent}</div>
        ) : (
          <Link to={`/blogs/${blog.id}`} onMouseEnter={onHover}>
            {CardContent}
          </Link>
        )}
      </motion.div>
    );
  }
);

export default BlogCard;

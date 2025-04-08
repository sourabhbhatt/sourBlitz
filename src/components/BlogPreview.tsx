import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Blog } from "../types";
import Button from "./Button";

const BlogPreview = ({ blog }: { blog: Blog | null }) => {
  return (
    <div className="w-full h-full border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-6 min-h-[400px] bg-gray-50 dark:bg-zinc-900 flex flex-col items-center justify-center">
      {blog ? (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full text-center"
        >
          <div className="w-full h-[260px] mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-white dark:bg-zinc-800">
            <img
              src={blog.image}
              alt={blog.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {blog.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm max-w-sm mx-auto">
            {blog.overview}
          </p>
          <Link to={`/blogs/${blog.id}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </motion.div>
      ) : (
        <p className="text-gray-400 dark:text-gray-500 italic">
          Hover a blog to preview it
        </p>
      )}
    </div>
  );
};

export default BlogPreview;

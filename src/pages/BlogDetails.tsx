import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import blogData from "../data/blogs";
import CodeEditor from "../components/CodeEditor";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === Number(id));

  if (!blog) return <div className="p-10 font-[Poppins]">Blog not found.</div>;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto font-[Poppins] bg-gradient-to-br  via-black to-gray-900 text-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 py-6 rounded-lg shadow-md border border-dotted border-gray-300"
      >
        {blog.title}
      </motion.h1>

      {/* Image + Overview Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
        <div className="flex-1 text-gray-300 text-lg leading-relaxed">
          <p>{blog.overview}</p>
        </div>
        <div className="flex-1">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full max-h-[350px] object-contain rounded-xl shadow-2xl border border-indigo-500"
          />
        </div>
      </div>

      {/* Components Section */}
      <div className="space-y-12">
        {blog.components.map((comp, index) => (
          <CodeEditor
            key={index}
            name={comp.name}
            description={comp.description}
            code={comp.code}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;

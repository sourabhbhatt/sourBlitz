import { useEffect, useState } from "react";

import { Blog } from "../types";
import blogData from "../data/blogs";
import MyInfo from "../components/MyInfo";
import BlogCard from "../components/BlogCard";
import BlogPreview from "../components/BlogPreview";

const Home = () => {
  const blogs: Blog[] = blogData;
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveBlog(blogs[0]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [blogs]);

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto font-[Poppins]">
      {/* About Me */}
      <MyInfo />

      {/* Bottom Layout */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Blog Grid */}
        <div className="w-full lg:w-1/2 flex justify-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                disabled={blog.disabled}
                onHover={() => setActiveBlog(blog)}
              />
            ))}
          </div>
        </div>

        {/* Blog Preview */}
        <div className="w-full lg:w-1/2 flex justify-end">
          <BlogPreview blog={activeBlog} />
        </div>
      </div>
    </section>
  );
};

export default Home;

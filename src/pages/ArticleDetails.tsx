import { useParams } from "react-router-dom";
import articles from "../data/articles";
import { motion } from "framer-motion";
import CodeEditor from "../components/CodeEditor";

export default function ArticleDetails() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="p-10 font-[Poppins] text-center text-gray-600">
        Article not found.
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto font-[Poppins] bg-gradient-to-br  via-black to-gray-900 text-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 py-6 rounded-lg shadow-md border border-dotted border-gray-300"
      >
        {article.title}
      </motion.h1>
      <p className="text-base text-gray-700 dark:text-gray-300 text-left leading-relaxed px-4 mb-5 md:px-6">
        {article.description}
      </p>

      <div className="space-y-12">
        {article.components.map((comp, index) => (
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
}

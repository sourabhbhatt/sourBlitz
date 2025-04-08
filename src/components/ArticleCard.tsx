import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";

import { Article } from "../types";
import { memo } from "react";

const ArticleCard = memo(({ article }: { article: Article }) => {
  const isLong = article.description.length > 120;
  const shortText = article.description.slice(0, 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/articles/${article.id}`}>
        <div className="group rounded-lg border-l-4 border-indigo-500 bg-gray-50 hover:bg-white transition-all p-5 min-h-[180px] shadow-sm hover:shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-yellow-400 group-hover:underline">
              {article.title}
            </h2>

            <HiArrowRight className="text-indigo-500 text-lg group-hover:translate-x-1 transition-transform" />
          </div>

          <p className="text-gray-600 text-sm mt-3">
            {isLong ? (
              <>
                {shortText}...
                <span className="text-indigo-600 font-medium ml-1 hover:underline">
                  Read more
                </span>
              </>
            ) : (
              article.description
            )}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});

export default ArticleCard;

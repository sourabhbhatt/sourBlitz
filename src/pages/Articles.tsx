import ArticleCard from "../components/ArticleCard";
import articles from "../data/articles";

export default function Articles() {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto font-[Poppins]">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">🧠 Articles</h1>

      {/* Article Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

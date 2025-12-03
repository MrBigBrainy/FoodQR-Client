import React from "react";

function SearchBar({ items, onSearch }) {
  const [activeCategory, setActiveCategory] = React.useState("");

  const categories = React.useMemo(() => {
    if (!items) return [];
    const uniqueCategories = [
      ...new Set(items.map((item) => item.category?.name || "อื่นๆ")),
    ];
    return uniqueCategories;
  }, [items]);

  React.useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto w-full px-4 pt-4 pb-2">
        {/* Search Input */}
        <div className="relative mb-4 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="ค้นหาเมนูอาหาร..."
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 sm:text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex-shrink-0 text-sm font-medium py-2 px-5 rounded-full transition-all duration-300 whitespace-nowrap shadow-sm ${
                activeCategory === category
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-200 scale-105"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 hover:border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

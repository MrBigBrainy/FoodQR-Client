import React from "react";

function SearchBar({ items }) {
  const [activeCategory, setActiveCategory] = React.useState("");

  const categories = React.useMemo(() => {
    if (!items) return [];
    const uniqueCategories = [
      ...new Set(items.map((item) => item.category?.name || "อื่นๆ")),
    ];
    return uniqueCategories;
  }, [items]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* search */}
      <div className="fixed top-16 bg-white w-full px-5 z-30 pt-4 pb-2">
        <div className=" flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 mr-2"
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
          <input
            type="text"
            placeholder="ค้นหาเมนูอาหาร..."
            className="w-full text-base focus:outline-none placeholder-gray-500 "
          />
        </div>
        <div className="flex space-x-3 overflow-x-scroll pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex-shrink-0 text-sm font-medium py-2 px-4 rounded-full transition duration-150 whitespace-nowrap ${
                activeCategory === category
                  ? "bg-red-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

import React, { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import SearchBar from "../components/SearchBar";
import useMenuStore from "../stores/useMenuStore";
import CartIcon from "@/components/CartIcon";
import CoffeeLoader from "../components/loader/coffeeLoader";

function MenuPage() {
  const menu = useMenuStore((state) => state.menu);



  useEffect(() => console.log(menu), [menu]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMenu = menu?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar items={menu} onSearch={handleSearch} />

      <div className="max-w-6xl mx-auto pb-36 px-4">
        {useMenuStore((state) => state.loading) ? (
          <div className="flex justify-center items-center min-h-[60vh] animate-pulse">
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-red-100 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <CoffeeLoader scale={0.3} />
            </div>
          </div>
        ) : filteredMenu?.length > 0 ? (
          <MenuList items={filteredMenu} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              ไม่พบเมนูที่ค้นหา
            </h3>
            <p className="text-gray-500 text-sm">
              ลองค้นหาด้วยคำค้นอื่น หรือเลือกดูเมนูจากหมวดหมู่
            </p>
          </div>
        )}
      </div>
      {/* <CartIcon /> */}
    </div>
  );
}

export default MenuPage;

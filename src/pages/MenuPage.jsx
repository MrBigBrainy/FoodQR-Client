import React, { useState, useEffect } from 'react';
import MenuList from '../components/MenuList';
import SearchBar from '../components/SearchBar';
import useMenuStore from '../stores/useMenuStore';
import CartIcon from '@/components/CartIcon';
import CoffeeLoader from '../components/loader/coffeeLoader';
import RedWineLoader from '@/components/loader/RedWineLoader';

import toast from 'react-hot-toast';
import { X, Info } from 'lucide-react';
import { motion } from 'motion/react';

function MenuPage() {
  const menu = useMenuStore((state) => state.menu);

  useEffect(() => {
    toast((t) => (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4 min-w-[300px]"
      >
        <div className="bg-gradient-to-br from-orange-100 to-red-50 p-2.5 rounded-xl shrink-0 shadow-sm border border-orange-100">
          <Info size={20} className="text-orange-600" />
        </div>
        <div className="flex-1 pt-0.5">
          <h3 className="font-bold text-gray-900 text-sm mb-1">คำแนะนำ</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            หากต้องการแยกบิล ลูกค้าทุกท่านแสกนและสั่งอาหารของตัวเองได้เลยค่ะ
          </p>
        </div>
        <button 
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 -mr-2 -mt-2 hover:bg-gray-100 rounded-full"
        >
          <X size={16} />
        </button>
      </motion.div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #fff',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
        padding: '16px',
        maxWidth: '90vw',
      },
    });
  }, []);

  useEffect(() => console.log(menu), [menu]);

  const [searchTerm, setSearchTerm] = useState('');

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
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-full shadow-lg border border-white/50">
              {/* <CoffeeLoader scale={0.4} /> */}
              <RedWineLoader scale={1} />
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

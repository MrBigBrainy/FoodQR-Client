import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "motion/react";

function MenuCardAdmin({ menu, onEdit, onDelete }) {
  const hasDiscount = menu.discount > 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md overflow-hidden border border-gray-100 w-full h-full flex flex-col transition-all duration-300"
    >
      {/* รูปภาพอาหาร */}
      <div className="relative w-full h-44 overflow-hidden group">
        <img
          src={menu.imageUrl}
          alt={menu.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* เนื้อหา */}
      <div className="p-4 flex flex-col flex-1">
        {/* Row 1: ชื่อเมนู */}
        <h3 className="font-bold text-gray-800 text-lg line-clamp-1 mb-3" title={menu.name}>
          {menu.name}
        </h3>

        {/* Row 2: ราคา และ Actions */}
        <div className="flex justify-between items-center mt-auto">
          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-red-600 font-bold text-xl">
                  ฿{menu.netPrice}
                </span>
                <span className="text-gray-400 line-through text-xs">
                  ฿{menu.price}
                </span>
                <span className="text-red-500 text-xs font-bold">
                  -{menu.discount}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-xl">
                ฿{menu.price}
              </span>
            )}
          </div>

          {/* Buttons Section */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(menu)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="แก้ไข"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(menu.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="ลบ"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuCardAdmin;


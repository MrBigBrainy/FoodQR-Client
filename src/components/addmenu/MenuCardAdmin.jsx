import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "motion/react";

function MenuCardAdmin({ menu, onEdit, onDelete }) {
  const hasDiscount = menu.discount > 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md overflow-hidden border border-gray-100 w-full flex flex-col transition-all duration-300"
    >
      {/* รูปภาพอาหาร */}
      <div className="relative w-full h-48 overflow-hidden group">
        <img
          src={menu.imageUrl}
          alt={menu.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* เนื้อหา */}
      <div className="p-5 flex flex-col flex-1">
        {/* ชื่อเมนู */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1" title={menu.name}>
            {menu.name}
          </h3>
        </div>

        {/* ราคา */}
        <div className="flex items-center gap-2 mb-4">
          {hasDiscount ? (
            <>
              <span className="text-red-600 font-bold text-xl">
                ฿{menu.netPrice}
              </span>
              <span className="text-gray-400 line-through text-sm">
                ฿{menu.price}
              </span>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-lg border border-red-100">
                ลด ฿{menu.discount}
              </span>
            </>
          ) : (
            <span className="text-gray-900 font-bold text-xl">
              ฿{menu.price}
            </span>
          )}
        </div>

        {/* Spacer to push bottom content down */}
        <div className="flex-1" />

        {/* ปุ่มสถานะ และ Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <span
            className={`px-3 py-1 text-xs rounded-full font-bold border ${
              menu.isAvailable
                ? "bg-green-50 text-green-600 border-green-100"
                : "bg-gray-50 text-gray-500 border-gray-100"
            }`}
          >
            {menu.isAvailable ? "● กำลังขาย" : "○ ปิดขาย"}
          </span>

          {/* ปุ่มแก้ไข/ลบ */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(menu)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="แก้ไข"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(menu.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="ลบ"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuCardAdmin;


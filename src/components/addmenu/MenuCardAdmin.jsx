import React from "react";
import { Pencil, Trash2 } from "lucide-react";

function MenuCardAdmin({ menu, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 w-[300px]">
      {/* รูปภาพอาหาร */}
      <div className="relative w-full h-48">
        <img
          src={menu.imageUrl}
          alt={menu.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* เนื้อหา */}
      <div className="p-4">
        {/* ชื่อเมนู */}
        <h3 className="font-semibold text-gray-800 mb-1">{menu.name}</h3>

        {/* ราคา */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-bold text-lg">
            ฿{menu.netPrice}
          </span>
          <span className="text-gray-400 line-through text-sm">
            ฿{menu.price}
          </span>
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md">
            ลด ฿{menu.discount}
          </span>
        </div>

        {/* รายละเอียดสั้น */}
        {/* <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>🧺 คงเหลือ: {menu.stock}</span>
                        <span className="mx-2">•</span>
                        <span>{menu.category}</span>
                    </div> */}

        {/* ปุ่มสถานะ */}
        <div className="flex justify-between items-center">
          <button
            className={`px-4 py-1 text-sm rounded-full font-medium ${
              menu.isAvailable
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {menu.isAvailable ? "กำลังขาย" : "ปิดขาย"}
          </button>

          {/* ปุ่มแก้ไข/ลบ */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(menu)}
              className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(menu.id)}
              className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCardAdmin;

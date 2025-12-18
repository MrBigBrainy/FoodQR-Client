import React from "react";
import { Trash2 } from "lucide-react";

function DeleteCard({ menu, isVisible, onClose, onConfirm }) {
  if (!isVisible || !menu) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
        {/* Icon ยืนยันการลบ */}
        <div className="flex justify-center mb-4">
          <Trash2 size={40} className="text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          ยืนยันการลบเมนู
        </h2>
        <p className="text-gray-600 text-center mb-6">
          คุณแน่ใจหรือไม่ว่าต้องการลบเมนู "
          <span className="font-semibold text-red-600">{menu.name}</span>"
          อย่างถาวร?
        </p>

        <div className="flex justify-center gap-3">
          {/* ปุ่มยกเลิก */}
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => onConfirm(menu.id)}
            className="w-1/2 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium flex items-center justify-center gap-1"
          >
            <Trash2 size={16} /> ยืนยันการลบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCard;

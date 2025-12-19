import React from "react";
import { Trash2 } from "lucide-react";

function DeleteMenuContent({ menu, onConfirm, onCancel }) {
  if (!menu) return null;

  return (
    <div className="text-center p-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Trash2 size={32} className="text-red-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        ยืนยันการลบ?
      </h3>
      <p className="text-gray-600 mb-6">
        คุณต้องการลบเมนู <span className="font-bold text-red-600">{menu.name}</span> ใช่หรือไม่?
        <br />การกระทำนี้ไม่สามารถย้อนกลับได้
      </p>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
        >
          ยกเลิก
        </button>
        <button
          onClick={() => onConfirm(menu.id)}
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
        >
          ลบเลย
        </button>
      </div>
    </div>
  );
}

export default DeleteMenuContent;

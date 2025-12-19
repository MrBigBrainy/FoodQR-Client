import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteMenu } from "@/api/menu.api";
import toast from "react-hot-toast";

function DeleteMenuContent({ menu, onConfirm, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!menu) return null;

  const handleDelete = async () => {
    // console.log("menu", menu);
    if (!menu) {
      toast.error("ไม่พบ ID ของเมนู");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteMenu(menu);
      toast.success("ลบเมนูสำเร็จ!");
      
      // Call onConfirm callback if provided (for parent component to refresh data)
      if (onConfirm) {
        onConfirm(menu);
      }
    } catch (error) {
      console.error("Failed to delete menu:", error);
      toast.error(error?.response?.data?.message || "เกิดข้อผิดพลาดในการลบเมนู");
    } finally {
      setIsDeleting(false);
    }
  };

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
          disabled={isDeleting}
          className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ยกเลิก
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isDeleting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>กำลังลบ...</span>
            </>
          ) : (
            <>
              <Trash2 size={18} />
              <span>ลบเลย</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default DeleteMenuContent;

import useCartStore from "../stores/cartStore";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Trash2, Plus, Minus, Edit3 } from "lucide-react";

function CartCard({ item }) {
  const { removeItem, addItem, decreaseItem, updateNote } =
    useCartStore.getState();

  const totalPrice = "฿" + (item.price * item.amount).toLocaleString();

  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(item.note || "");

  const handleNoteSave = () => {
    updateNote(item.id, currentNote.trim());
    setIsEditingNote(false);
  };

  const onAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      amount: 1,
      imageUrl: item.imageUrl,
    });
  };

  const onDelete = () => {
    decreaseItem(item.id);
  };

  const onRemove = () => {
    removeItem(item.id);
  };

  return (
    <motion.div

      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
          <img
            src={item.imageUrl || "https://placehold.co/100x100?text=No+Image"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow justify-between py-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-base font-bold text-gray-800 line-clamp-1">
                {item.name}
              </h4>
              <p className="text-sm font-semibold text-red-600">
                ฿{item.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Controls & Total */}
          <div className="flex justify-between items-end mt-3">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
              <button
                onClick={onDelete}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-gray-600 shadow-sm hover:text-red-600 active:scale-95 transition"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold text-gray-800 w-4 text-center">
                {item.amount}
              </span>
              <button
                onClick={onAdd}
                className="w-7 h-7 flex items-center justify-center bg-red-600 rounded-md text-white shadow-sm hover:bg-red-700 active:scale-95 transition"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-0.5">รวม</p>
              <p className="text-lg font-bold text-gray-900">{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Note Section */}
      <div className="mt-3 pt-3 border-t border-gray-50">
        {isEditingNote ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onBlur={() => {
                // Small delay to allow button click to register if needed, 
                // though onBlur usually handles it. 
                // Using timeout to prevent immediate unmount if clicking button?
                // Actually, if onBlur saves, it's fine.
                handleNoteSave();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNoteSave();
              }}
              placeholder="ระบุรายละเอียดเพิ่มเติม..."
              autoFocus
              className="flex-1 text-sm p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
            />
            <button
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking button
              onClick={handleNoteSave}
              className="px-3 py-1 bg-[#C10007] text-white text-xs rounded-lg font-medium shadow-sm hover:bg-[#a30006] transition-colors"
            >
              บันทึก
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsEditingNote(true)}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 cursor-pointer group transition-colors"
          >
            <Edit3 size={12} className="group-hover:text-red-500" />
            {currentNote ? (
              <span className="text-gray-500 font-medium text-ellipsis line-clamp-1">
                Note: {currentNote}
              </span>
            ) : (
              <span>เพิ่มหมายเหตุถึงร้านค้า...</span>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default CartCard;

import useCartStore from "../stores/cartStore";
import React, { useState } from "react";

function CartCard({ item }) {
  const { removeItem, addItem, decreaseItem, updateNote } =
    useCartStore.getState();

  const totalPrice = "฿" + item.price * item.amount;

  const [isEditingNote, setIsEditingNote] = useState(false); // state ตอนกำลังแก้ไขหมายเหตุ
  const [currentNote, setCurrentNote] = useState(item.note || "");

  const handleNoteSave = (e) => {
    updateNote(item.id, currentNote.trim());
    setIsEditingNote(false);
  };

  const NoteUpdate = () => {
    if (isEditingNote || currentNote) {
      return (
        <div className="mt-2 w-full">
          {isEditingNote ? (
            <input
              type="text"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              onBlur={handleNoteSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNoteSave(e);
              }}
              className="w-full text-sm p-1 border border-indigo-300 rounded focus:ring-indigo-500"
            />
          ) : (
            <p
              className="text-xs text-gray-600 cursor-pointer hover:text-indigo-600"
              onClick={() => setIsEditingNote(true)}
            >
              หมายเหตุ: {currentNote}
            </p>
          )}
        </div>
      );
    }
    return (
      <button
        onClick={() => setIsEditingNote(true)}
        className="text-xs text-indigo-500 hover:underline"
      >
        + เพิ่มหมายเหตุ
      </button>
    );
  };

  const onAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, amount: 1, imageUrl: item.imageUrl });
  };

  const onDelete = () => {
    decreaseItem(item.id);
  };

  const onRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex w-full bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <div className="flex-shrink-0 w-24 h-24 mr-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <h4 className="text-base font-semibold text-gray-800">
              {item.name}
            </h4>
            {/* ค่อยละกัน */}
            <p className="text-xs text-blue-500 mt-0.5">สถานะ: พร้อมส่ง</p>
          </div>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-600 transition flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <div className="flex justify-between items-start">
            <div className="pr-4">
              <h4 className="text-base font-semibold text-gray-800">
                {item.name}
              </h4>
              {/* ค่อยละกัน */}
              <p className="text-xs text-blue-500 mt-0.5">สถานะ: พร้อมส่ง</p>
            </div>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-600 transition flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="flex flex-col text-sm space-y-0.5">
              <p className="text-base font-bold text-red-600">
                {" "}
                ฿ {item.price}{" "}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <div className="text-base font-bold text-red-600">
                รวม: {totalPrice}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onDelete}
                  className="w-6 h-6 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-sm font-medium w-4 text-center">
                  {item.amount}
                </span>
                <button
                  onClick={onAdd}
                  className="w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>{NoteUpdate()} </div>
    </div>
  );
}

export default CartCard;

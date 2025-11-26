// รวมเมนูทั้งหมด;

import React from "react";
import useCartStore from "../stores/cartStore";

const MenuCard = ({ id, name, price, ImageUrl }) => {
  const addItem = useCartStore((state) => state.addItem);

  const addToCard = () => {
    addItem({
      id: id,
      name: name,
      price: price,
      amount: 1,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-[1.03] transition duration-200">
      <img
        src={ImageUrl || "placeholder.jpg"}
        alt={name}
        className="w-full h-32 object-cover"
      />

      <div className="p-2.5 flex flex-col justify-between h-[calc(100%-8rem)]">
        <div className="space-y-0.5">
          <div className="font-semibold text-gray-800 truncate text-base">
            {name || "ชื่อเมนู"}
          </div>
          <div className="text-sm font-bold text-red-600">{price}</div>
        </div>
        <button
          type="button"
          onClick={addToCard}
          className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white 
                     font-medium py-1 rounded-md text-xs transition duration-150"
        >
          + ตะกร้า
        </button>
      </div>
    </div>
  );
};

export default MenuCard;

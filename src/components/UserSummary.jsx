import React from "react";

const MOCK_USER_DATA = {
  userName: "คุณนพดล",
  totalItems: 4,
  totalAmount: 500.0,
  userProfileUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=N",
  items: [
    { name: "ซูชิ A", qty: 2, price: 200 },
    { name: "แซลมอนย่าง", qty: 1, price: 150 },
    { name: "โค้ก", qty: 1, price: 50 },
  ],
};

const UserSummary = () => {
  const { userName, totalItems, totalAmount, userProfileUrl, items } =
    MOCK_USER_DATA;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mx-5 ไ">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
            <img
              src={userProfileUrl}
              alt={userName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="text-base font-semibold text-gray-800">
              {userName}
            </div>
            <div className="text-sm text-gray-500">{totalItems} รายการ</div>
          </div>
        </div>
        <div className="text-xl font-bold text-red-600 whitespace-nowrap">
          ฿ 500
        </div>
      </div>

      <div className="pt-3 text-sm text-gray-700 space-y-2">
        {items.map((menuItem, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="truncate pr-2">
              {menuItem.name}{" "}
              <span className="font-medium text-gray-500">x{menuItem.qty}</span>
            </div>
            <div className="font-semibold text-gray-800 whitespace-nowrap">
              ฿{menuItem.qty * menuItem.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSummary;

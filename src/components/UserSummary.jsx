import React from "react";

function UserSummary({user, userOrder}) {
  const totalItems = userOrder.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = userOrder.reduce((acc, item) => acc + (item.quantity * (item.menu?.price || 0)), 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mx-5">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
            <img
              src={user.imageUrl}
              alt={user.displayName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="text-base font-semibold text-gray-800">
              {user.displayName}
            </div>
            <div className="text-sm text-gray-500">{totalItems} รายการ</div>
          </div>
        </div>
        <div className="text-xl font-bold text-red-600 whitespace-nowrap">
          ฿ {totalAmount}
        </div>
      </div>

      <div className="pt-3 text-sm text-gray-700 space-y-2">
        {userOrder.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="truncate pr-2">
              {item.menu?.name}{" "}
              <span className="font-medium text-gray-500">x{item.quantity}</span>
            </div>
            <div className="font-semibold text-gray-800 whitespace-nowrap">
              ฿{item.quantity * (item.menu?.price || 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSummary;

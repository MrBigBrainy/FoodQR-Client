import React from "react";

function CheckoutSummaryCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mx-5 my-5 mb-50">
      <h3 className="text-lg font-bold text-gray-800 mb-4">สรุปยอด</h3>

      <div className="flex justify-between items-center py-1 text-base text-gray-700">
        <span>ยอดรวม</span>
        <span>50</span>
      </div>
      <div className="flex justify-between items-center py-1 text-base font-semibold text-red-600">
        <span>ส่วนลดเมนู</span>
        <span>-20</span>
      </div>
      <div className="flex justify-between items-center py-1 text-base text-gray-700">
        <span>ภาษี </span>
        <span>7</span>
      </div>
      <hr className="my-3 border-gray-200" />
      <div className="flex justify-between items-center py-1 text-xl font-bold text-gray-800">
        <span>ยอดรวมทั้งหมด</span>
        <span>50</span>
      </div>
    </div>
  );
}

export default CheckoutSummaryCard;

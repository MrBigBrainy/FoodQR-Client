import CreateDiscountForm from "@/components/discountAdmin/CreateDiscountForm";
import DiscountData from "@/components/discountAdmin/DiscountData";
import DiscountList from "@/components/discountAdmin/DiscountList";
import React, { useState } from "react";

function AdminDiscount() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleCouponCreated = () => {
    setRefreshKey((prev) => prev + 1);
    alert("✅ สร้างคูปองสำเร็จ! กำลังอัปเดตรายการ...");
  };
  return (
    <div className="p-4 md:p-8 pt-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="text-5xl md:text-4xl mr-3 text-red-600 font-extrabold">
            %
          </span>
          <h1 className="text-5xl md:text-3xl font-bold text-gray-800">
            ระบบจัดการส่วนลด
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-8 pt-10">
        <div className="md:col-span-3">
          <CreateDiscountForm onCouponCreated={handleCouponCreated} />
        </div>
        <div className="md:col-span-4 space-y-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <DiscountData />
          </div>
          <DiscountList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default AdminDiscount;

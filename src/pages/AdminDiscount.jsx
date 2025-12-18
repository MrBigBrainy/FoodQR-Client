import CreateDiscountForm from "@/components/discountAdmin/CreateDiscountForm";
import DiscountData from "@/components/discountAdmin/DiscountData";
import DiscountList from "@/components/discountAdmin/DiscountList";
import Modal from "@/components/Modal";
import React, { useState } from "react";

function AdminDiscount() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCouponCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <span>+</span> สร้างคูปองใหม่
        </button>
      </div>

      <div className="space-y-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <DiscountData />
        </div>
        <DiscountList key={refreshKey} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="สร้างคูปองใหม่"
      >
        <CreateDiscountForm onCouponCreated={handleCouponCreated} />
      </Modal>
    </div>
  );
}

export default AdminDiscount;

import CreateDiscountForm from "@/components/discountAdmin/CreateDiscountForm";
import DiscountData from "@/components/discountAdmin/DiscountData";
import DiscountList from "@/components/discountAdmin/DiscountList";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Percent } from "lucide-react";

function AdminDiscount() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCouponCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
    alert("✅ สร้างคูปองสำเร็จ! กำลังอัปเดตรายการ...");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 pt-10 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            ระบบจัดการส่วนลด
          </h1>
          <p className="text-gray-500">
            จัดการคูปองและโปรโมชั่นทั้งหมด
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-200 flex items-center gap-2"
        >
          <Plus size={20} />
          <span>สร้างคูปองใหม่</span>
        </motion.button>
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
        modalClassName="max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <CreateDiscountForm onCouponCreated={handleCouponCreated} />
      </Modal>
    </motion.div>
  );
}

export default AdminDiscount;

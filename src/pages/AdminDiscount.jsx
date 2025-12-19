import CreateDiscountForm from "@/components/discountAdmin/CreateDiscountForm";
import DiscountData from "@/components/discountAdmin/DiscountData";
import DiscountList from "@/components/discountAdmin/DiscountList";
import Modal from "@/components/Modal";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Percent } from "lucide-react";
import RedWineLoader from "@/components/loader/RedWineLoader";
import axios from "axios";

const MOCK_AUTH = {
  storeId: 1,
  token: "MOCK_ADMIN_JWT_TOKEN",
};

function AdminDiscount() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDiscounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:3000/api/discount/get`, {
        headers: {
          Authorization: `Bearer ${MOCK_AUTH.token}`,
        },
      });

      const mapped = res.data.data.map((d) => ({
        id: d.id,
        code: d.code,
        description: d.name || d.description || "ไม่มีคำอธิบาย",
        value: d.amount,
        type: d.discountType,
        usage_count: d.count,
        usage_limit: d.maxCount || 0,
        status: d.isActive ? "ใช้งาน" : "หมดอายุ",
        raw: d,
      }));

      setDiscounts(mapped);
    } catch (err) {
      console.error("Error Fetch Discounts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts, refreshKey]);

  const handleCouponCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
    alert("✅ สร้างคูปองสำเร็จ! กำลังอัปเดตรายการ...");
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 pt-6 max-w-7xl mx-auto min-h-screen flex flex-col"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            ระบบจัดการส่วนลด
          </h1>
          <p className="text-gray-500 text-sm">
            จัดการคูปองและโปรโมชั่นทั้งหมด
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-200 flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          <span>สร้างคูปองใหม่</span>
        </motion.button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <RedWineLoader scale={1} />
        </div>
      ) : (
        <div className="space-y-6 flex-1 flex flex-col min-h-0">
          <div className="shrink-0">
            <DiscountData />
          </div>
          <div className="flex-1 min-h-0">
            <DiscountList 
              discounts={discounts} 
              loading={loading} 
              error={error} 
              onRefresh={handleRefresh} 
            />
          </div>
        </div>
      )}

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

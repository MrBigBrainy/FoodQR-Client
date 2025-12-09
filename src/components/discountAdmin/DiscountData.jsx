import React from "react";
import StatCard from "./StatCard"; // 💡 ใช้ StatCard ที่เราสร้างด้านบน

// 💡 Mock Props ที่ควรจะรับมาจาก AdminDiscount Page
const MOCK_STATS_PROPS = {
  totalDiscountGiven: 3350.0, // ส่วนลดที่ลูกค้าใช้แล้ว
  totalUses: 62, // จำนวนครั้งที่ใช้ทั้งหมด
  activeCoupons: 2, // คูปองที่ใช้งานอยู่
};

function DiscountData() {
  const { totalDiscountGiven, totalUses, activeCoupons } = MOCK_STATS_PROPS;

  return (
    // 💡 Container หลัก: ใช้ Flexbox เพื่อจัดเรียงในแนวนอน (Desktop)
    // 💡 flex-col บน Mobile, md:flex-row บน Desktop
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* A. ส่วนลดที่ให้แล้ว (สีเขียว) */}
      <StatCard
        title="ส่วนลดที่ให้แล้ว"
        value={totalDiscountGiven}
        unit="฿"
        color="text-green-600"
      />

      {/* B. จำนวนครั้งที่ใช้ได้แล้ว (สีน้ำเงินอ่อน) */}
      <StatCard
        title="จำนวนครั้งที่ใช้แล้ว"
        value={totalUses}
        unit="ครั้ง"
        color="text-blue-600"
      />

      {/* C. คูปองที่ใช้งานอยู่ (สีเทาอ่อน) */}
      <StatCard
        title="คูปองที่ใช้งานอยู่"
        value={activeCoupons}
        unit="คูปอง"
        color="text-gray-800"
      />
    </div>
  );
}

export default DiscountData;

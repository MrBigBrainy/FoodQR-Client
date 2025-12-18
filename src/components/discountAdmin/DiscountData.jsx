import React from "react";
import { motion } from "motion/react";
import { Wallet, Tag, Ticket } from "lucide-react";

// 💡 Mock Props ที่ควรจะรับมาจาก AdminDiscount Page
const MOCK_STATS_PROPS = {
  totalDiscountGiven: 3350.0, // ส่วนลดที่ลูกค้าใช้แล้ว
  totalUses: 62, // จำนวนครั้งที่ใช้ทั้งหมด
  activeCoupons: 2, // คูปองที่ใช้งานอยู่
};

function DiscountData() {
  const { totalDiscountGiven, totalUses, activeCoupons } = MOCK_STATS_PROPS;

  const stats = [
    {
      title: "ส่วนลดที่ให้แล้ว",
      value: `฿${totalDiscountGiven.toLocaleString()}`,
      icon: Wallet,
      color: "text-gray-800",
      bg: "bg-white",
      border: "border-gray-200",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "จำนวนครั้งที่ใช้แล้ว",
      value: `${totalUses} ครั้ง`,
      icon: Tag,
      color: "text-gray-800",
      bg: "bg-white",
      border: "border-gray-200",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "คูปองที่ใช้งานอยู่",
      value: `${activeCoupons} ใบ`,
      icon: Ticket,
      color: "text-gray-800",
      bg: "bg-white",
      border: "border-gray-200",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className={`p-5 rounded-2xl border ${stat.border} ${stat.bg} shadow-sm transition-all`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
            <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DiscountData;

import React from "react";

// 💡 StatCard รับ Props 4 ตัวเพื่อแสดงผล
const StatCard = ({ title, value, unit, color }) => {
  // จัดรูปแบบราคาให้มีทศนิยม 2 ตำแหน่งถ้าเป็นสกุลเงิน (ใช้ได้กับตัวเลข)
  const formattedValue =
    unit === "฿" ? value.toFixed(2) : value.toLocaleString();

  return (
    // Container Card: พื้นหลังขาว, ขอบมน, เงา, และกำหนดความกว้างเริ่มต้น
    <div className="flex-1 min-w-[150px] bg-white p-4 rounded-xl shadow-md border border-gray-100">
      {/* 1. ส่วนหัวข้อ */}
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>

      {/* 2. ส่วนตัวเลขสถิติ */}
      <div className={`text-2xl font-bold ${color}`}>
        {/* แสดงสัญลักษณ์สกุลเงิน (ถ้าเป็น ฿) */}
        {unit === "฿" && <span className="mr-1">{unit}</span>}

        {/* ตัวเลขหลัก */}
        {formattedValue}

        {/* แสดงหน่วย (ถ้าเป็น ครั้ง หรือ คูปอง) */}
        {unit !== "฿" && (
          <span className="ml-1 text-base font-semibold">{unit}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;

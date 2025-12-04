import React, { useState } from "react";

// 💡 สมมติว่ามี Component ย่อย DiscountItem.jsx สำหรับแสดงแต่ละแถว
// import DiscountItem from './DiscountItem';
const MOCK_COUPON_DATA = [
  {
    id: "c1",
    code: "WELCOME50",
    description: "ส่วนลด ฿50 สำหรับลูกค้าใหม่",
    value: 50.0,
    type: "fixed_amount",
    usage_count: 12,
    usage_limit: 100,
    status: "ใช้งาน",
  },
  {
    id: "c2",
    code: "LUNCH10",
    description: "ลด 10% สำหรับทุกออเดอร์มื้อกลางวัน",
    value: 10,
    type: "percentage",
    usage_count: 45,
    usage_limit: 0, // 0 หมายถึงไม่จำกัด
    status: "ใช้งาน",
  },
  {
    id: "c3",
    code: "VIP2023",
    description: "ส่วนลด ฿100 สำหรับลูกค้าระดับ VIP",
    value: 100.0,
    type: "fixed_amount",
    usage_count: 5,
    usage_limit: 5,
    status: "หมดอายุ", // สถานะหมดอายุ
  },
];

function DiscountList() {
  // 1. Local State สำหรับเก็บรายการคูปอง (จำลองการดึงจาก API)
  const [coupons, setCoupons] = useState(MOCK_COUPON_DATA);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Logic การค้นหา (Filtering)
  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      {/* 3. ส่วนช่องค้นหาคูปอง */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหารหัส/ชื่อคูปอง..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {/* 4. ตารางรายการคูปอง */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ส่วนหัวตาราง */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                รหัส/ชื่อ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ส่วนลด
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ใช้แล้ว (ครั้ง)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>

          {/* ส่วนเนื้อหาตาราง */}
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCoupons.map((coupon) => (
              // 💡 ในโลกจริง คุณจะใช้ <DiscountItem key={coupon.id} coupon={coupon} />
              // ตอนนี้เราจะแสดงผลโดยตรงในนี้ไปก่อน
              <tr key={coupon.id}>
                {/* 1. รหัส/ชื่อ */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {coupon.code}
                  </div>
                  <div className="text-xs text-gray-500 truncate w-32">
                    {coupon.description}
                  </div>
                </td>

                {/* 2. ส่วนลด */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {coupon.type === "fixed_amount"
                    ? `฿${coupon.value.toFixed(2)}`
                    : `${coupon.value}%`}
                </td>

                {/* 3. ใช้แล้ว (ครั้ง) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {coupon.usage_count} /{" "}
                  {coupon.usage_limit === 0 ? "∞" : coupon.usage_limit}
                </td>

                {/* 4. สถานะ */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coupon.status === "ใช้งาน"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>

                {/* 5. จัดการ (ปุ่มแก้ไข/ลบ) */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    ✏️
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {filteredCoupons.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  ไม่พบข้อมูลคูปอง
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiscountList;

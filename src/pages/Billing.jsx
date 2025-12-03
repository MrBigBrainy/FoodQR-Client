import React from 'react'
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function Billing() {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
            <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* โลโก้ร้าน */}
                <div className="text-center mb-4">
                    <img
                        src="/logo-sushi.png"
                        alt="Restaurant Logo"
                        className="w-20 h-20 mx-auto mb-2"
                    />
                    <h2 className="text-green-600 font-bold text-2xl">
                        ใบเสร็จรับเงิน (Receipt)
                    </h2>
                    <p className="text-gray-700 font-medium mt-1">
                        Na-ni-no Sushi POS | โต๊ะ A-18
                    </p>
                    <p className="text-sm text-gray-500">
                        123/4 Central District, Bangkok, 10330
                        <br />
                        เลขประจำตัวผู้เสียภาษี: **0105555000123**
                    </p>
                    <p className="font-semibold mt-2">
                        Order ID: <span className="text-black font-bold">ORD-5415</span>
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>วันที่: 3/12/2568</span>
                        <span>เวลา: 11:01</span>
                    </div>
                </div>

                <hr className="border-dashed border-gray-300 my-4" />

                {/* สรุปยอดชำระแยกบุคคล */}
                <h3 className="font-bold text-gray-800 mb-2">
                    สรุปยอดชำระแยกบุคคล
                </h3>

                <div className="bg-gray-100 rounded-xl p-3 mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-gray-800 flex items-center">
                            คุณ
                            <CheckCircle className="text-green-500 w-4 h-4 ml-1" />
                        </p>
                        <p className="font-bold text-gray-900">฿224.70</p>
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm">
                        <span>1x ซูชิสเปย์สามกิโล (ลด)</span>
                        <span>฿210.00</span>
                    </div>
                </div>

                {/* สรุปยอดรวม */}
                <h3 className="font-bold text-gray-800 mb-2">สรุปยอดรวม</h3>
                <div className="space-y-1 text-sm text-gray-700 mb-5">
                    <div className="flex justify-between">
                        <span>ยอดรวมสินค้า (ก่อนส่วนลด)</span>
                        <span>฿220.00</span>
                    </div>
                    <div className="flex justify-between text-red-500 font-medium">
                        <span>ส่วนลดทั้งหมด</span>
                        <span>-฿10.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>ภาษีมูลค่าเพิ่ม (7%)</span>
                        <span>+฿14.70</span>
                    </div>
                </div>

                <hr className="border-dashed border-gray-300 my-3" />

                {/* ยอดรวมทั้งหมด */}
                <div className="flex justify-between items-end mb-5">
                    <p className="text-lg font-bold text-gray-800">ยอดรวมทั้งหมด</p>
                    <p className="text-2xl font-bold text-red-600">฿224.70</p>
                </div>
                <p className="text-center text-sm text-gray-500 mb-3">
                    ขอบคุณที่ใช้บริการ ❤️
                </p>

                {/* ปุ่มกลับ */}
                <button className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition">
                    กลับสู่หน้าเมนู
                </button>
            </motion.div>
        </div>
    );
};

export default Billing

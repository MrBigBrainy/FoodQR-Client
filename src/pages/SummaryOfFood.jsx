import React from 'react'
import { CheckCircle, XCircle } from "lucide-react"; // icon set modern
import { motion } from "framer-motion"; // ถ้าอยากให้มี animation (optional)

function SummaryOfFood() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            {/* การ์ดข้อมูลโต๊ะและสถานะ */}
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-5 mb-5">
                <div className="flex justify-between items-center border-b pb-3">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">โต๊ะ / Table</p>
                        <p className="text-xl font-bold text-gray-800">A-18</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-sm">เลขที่ออเดอร์ / Order No.</p>
                        <p className="font-semibold text-gray-800">NS-2024-1128-0042</p>
                    </div>
                </div>

                <div className="mt-4 border border-red-300 text-red-600 rounded-xl p-3 flex items-center justify-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">
                        สถานะ / Status: <span className="text-red-500">รอชำระเงิน / Pending Payment</span>
                    </span>
                </div>
            </div>

            {/* การ์ด QR Code */}
            <motion.div
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    สแกนเพื่อชำระเงิน / Scan to Pay
                </h2>

                <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                    {/* ใส่รูป QR จริงได้ */}
                    <img
                        src="/qr-sample.png"
                        alt="QR Code"
                        className="w-40 h-40 object-contain"
                    />
                </div>

                <div className="mt-4 flex items-center justify-center text-green-600 font-medium">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    กำลังรอการชำระเงินอัตโนมัติ...
                </div>
            </motion.div>
        </div>
    );
};

export default SummaryOfFood

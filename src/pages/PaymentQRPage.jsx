import React, { useEffect, useState } from 'react';

import { ArrowLeft, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import Header from '../components/Header';

const PaymentQRPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, qrCode, orderNo: orderNoState, tableNo: tableNoState } = location.state || {};

  // Fallback/Mock data if no state provided (for testing/direct access)
  const tableNo = tableNoState || "A-8";
  const orderNo = orderNoState || "NS-2024-1128-0042";
  
  const [status, setStatus] = useState("Pending Payment");
  const [statusThai, setStatusThai] = useState("รอชำระเงิน");
  const [isSuccess, setIsSuccess] = useState(false);

  const shopName = "Minna No Sushi";
  const shopNameThai = "มินนะ โนะ ซูชิ";
  const shopSubName = "Minna No Sushi";
  
  const displayAmount = amount ? `฿${amount.toLocaleString()}` : "฿0.00";

  useEffect(() => {
    if (!location.state) {
        console.warn("No payment data found in location.state");
    }
  }, [location.state]);

  useEffect(() => {
    const timer = setTimeout(() => {
        setStatus("Payment Successful");
        setStatusThai("ชำระเงินสำเร็จ");
        setIsSuccess(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/test4');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans pb-24 pt-28 px-4">
      <Header />

      {/* Order Info Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 mb-4"
      >
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-500 text-sm">โต๊ะ / Table</p>
                <p className="text-3xl font-bold text-gray-800">{tableNo}</p>
            </div>
            <div className="text-right">
                <p className="text-gray-500 text-sm">เลขที่ออเดอร์ / Order No.</p>
                <p className="text-gray-700 font-medium">{orderNo}</p>
            </div>
        </div>
        
        <div className={`border rounded-2xl p-3 flex items-center justify-center gap-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis shadow-sm ${
            isSuccess 
            ? "bg-green-50 border-green-200 text-green-700" 
            : "bg-orange-50 border-orange-200 text-orange-800"
        }`}>
            {isSuccess ? <CheckCircle2 size={20} className="shrink-0" /> : <Clock size={20} className="shrink-0" />}
            <span className="truncate text-sm sm:text-base">สถานะ / Status: <span className="font-bold">{statusThai} / {status}</span></span>
        </div>
      </motion.div>

      {/* QR Code Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center flex-1"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">สแกนเพื่อชำระเงิน / Scan to Pay</h2>
        <p className="text-3xl font-bold text-black mb-6">{displayAmount}</p>
        
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-sm mb-6"
        >
            {/* {qrCode ? (
                <img 
                    src={qrCode} 
                    alt="Payment QR Code" 
                    className="w-full h-full object-contain"
                />
            ) : (
                <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
                    No QR Code
                </div>
            )} */}
            <img 
                src="/qrPayment.jpg" 
                alt="Payment QR Code" 
                className="w-full h-full object-contain"
            />
           
        </motion.div>

        <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex items-center gap-2 ${isSuccess ? "text-green-600" : "text-gray-600"}`}
        >
            <CheckCircle2 size={20} />
            <span className="font-medium">
                {isSuccess ? "ชำระเงินเรียบร้อยแล้ว / Payment Completed" : "กำลังรอการชำระเงินอัตโนมัติ..."}
            </span>
        </motion.div>
      </motion.div>

      <button 
        onClick={() => navigate(-1)}
        disabled={isSuccess}
        className={`w-full max-w-md mt-4 py-3 rounded-xl transition-colors font-bold ${
            isSuccess 
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        ย้อนกลับ
      </button>
    </div>
  );
};

export default PaymentQRPage;

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

const PaymentQRPage = () => {
  const navigate = useNavigate();

  // Mock data to match the image
  const tableNo = "A-8";
  const orderNo = "NS-2024-1128-0042";
  const status = "Pending Payment";
  const statusThai = "รอชำระเงิน";
  const shopName = "Na-ni-no-Sushi POS";
  const shopNameThai = "นานิโนะ ซูชิ";
  const shopSubName = "Nanino Sushi";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans pb-24 pt-28 px-4">
      {/* Fixed Header */}
      <motion.header
        className="w-full fixed top-0 left-0 right-0 bg-gradient-to-r from-[#C10007] to-[#8B0000] text-white shadow-xl z-40 rounded-b-3xl px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          mass: 1
        }}
      >
        <div className="flex items-center justify-between max-w-2xl mx-auto relative z-10">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
                <ArrowLeft size={24} />
                <span className="text-lg font-medium">กลับ</span>
            </button>
            <div className="text-center flex-1 mr-8"> {/* mr-8 to balance the back button width */}
                <h1 className="text-xl font-bold">{shopName}</h1>
                <p className="text-sm text-white/80">{shopNameThai} | {shopSubName}</p>
            </div>
        </div>
        {/* Decorative circle for modern look */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      </motion.header>

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
        
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center justify-center gap-2 text-red-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            <XCircle size={20} className="shrink-0" />
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
        <h2 className="text-xl font-bold text-gray-800 mb-6">สแกนเพื่อชำระเงิน / Scan to Pay</h2>
        
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-sm mb-6"
        >
            <QRCodeCanvas
                value={`https://example.com/pay/${orderNo}`} // Mock payment URL
                size={200}
                level={"H"}
                fgColor="#8B1E24" // Dark red for QR code
                bgColor="#FFFFFF"
                imageSettings={{
                    src: "", // You can add a logo here if needed
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                }}
            />
        </motion.div>

        <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-green-600"
        >
            <CheckCircle2 size={20} />
            <span className="font-medium">กำลังรอการชำระเงินอัตโนมัติ...</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentQRPage;

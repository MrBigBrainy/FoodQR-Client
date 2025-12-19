import React from 'react';
import { motion } from 'motion/react';
import { Check, Clock, Loader2, User } from 'lucide-react';
import Header from '../components/Header';

const PaymentStatusPage = () => {
  // Mock data to match the image
  const users = [
    {
      id: 1,
      name: 'Pim',
      amount: 512.53,
      status: 'pending', // pending | paid
      avatarColor: 'bg-yellow-400',
    },
    {
      id: 2,
      name: 'คุณ', // You
      amount: 85.60,
      status: 'paid',
      avatarColor: 'bg-red-600',
      isCurrentUser: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-6">
        <div className="w-full max-w-md">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 relative"
        >
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
                }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center"
            >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                <Check size={28} strokeWidth={3} />
                </div>
            </motion.div>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">คุณชำระเงินแล้ว</h1>
            <p className="text-gray-500">กำลังรอเพื่อนๆ จ่ายเงิน...</p>
            </div>

            {/* User List */}
            <div className="space-y-3 mb-8">
            {users.map((user, index) => (
                <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    user.isCurrentUser 
                    ? 'bg-green-50/50 border-green-100' 
                    : 'bg-white border-gray-100 shadow-sm'
                }`}
                >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${user.avatarColor}`}>
                    {user.isCurrentUser ? <User size={20} /> : <span className="text-sm font-bold">P</span>}
                    </div>
                    <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-gray-500 text-sm">฿{user.amount.toFixed(2)}</p>
                    </div>
                </div>

                <div>
                    {user.status === 'paid' ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-green-200 shadow-sm">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                        </div>
                        <span className="text-xs font-bold text-green-700">เสร็จสิ้น</span>
                    </div>
                    ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
                        <Loader2 size={12} className="text-orange-500 animate-spin" />
                        <span className="text-xs font-bold text-orange-500">กำลังจ่าย...</span>
                    </div>
                    )}
                </div>
                </motion.div>
            ))}
            </div>

            {/* Footer Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-2 py-4 bg-gray-50 rounded-xl border border-gray-100"
            >
                <Loader2 size={16} className="text-gray-400 animate-spin" />
                <span className="text-xs text-gray-500 font-medium">ระบบจะออกใบเสร็จเมื่อชำระครบทุกคน</span>
            </motion.div>

        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;

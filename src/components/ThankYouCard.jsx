import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const ThankYouCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5 
      }}
      className="w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 relative text-center border border-gray-100"
    >
      {/* Decorative Background Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" /> */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-50 rounded-full blur-3xl opacity-50" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 relative"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
            <CheckCircle2 size={48} className="text-green-500" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold text-gray-800 mb-3"
      >
        ขอบคุณที่ใช้บริการค่ะ
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-gray-500 mb-8"
      >
        การชำระเงินเสร็จสมบูรณ์<br/>หวังว่าคุณจะมีความสุขกับมื้ออาหารนี้นะคะ
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center"
      >
        <button className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors active:scale-95">
          ให้คะแนนร้านเรา
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ThankYouCard;

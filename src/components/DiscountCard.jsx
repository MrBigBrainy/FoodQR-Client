import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Percent, CheckCircle2, XCircle, Sparkles } from "lucide-react";

function DiscountCard() {
  const [discountCode, setDiscountCode] = useState("");
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      setMessage({ type: "error", text: "กรุณากรอกโค้ดส่วนลด" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setIsApplying(true);

    // Mock validation - SAVE10 is valid
    setTimeout(() => {
      if (discountCode.toUpperCase() === "SAVE10") {
        setMessage({ type: "success", text: "ใช้โค้ดส่วนลดสำเร็จ! ลด 10%" });
        setDiscountCode("");
      } else {
        setMessage({ type: "error", text: "โค้ดส่วนลดไม่ถูกต้อง" });
      }
      setIsApplying(false);
      setTimeout(() => setMessage(null), 3000);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApplyDiscount();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-white to-red-50/30 p-5 rounded-2xl shadow-lg border border-red-100 mx-5 my-5 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl -z-10" />

      {/* Header */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center mb-4"
      >
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center mr-3 shadow-lg shadow-red-500/30"
        >
          <Percent size={20} strokeWidth={2.5} />
        </motion.div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            ใส่โค้ดส่วนลด
            <Sparkles className="text-red-500 w-4 h-4" />
          </h3>
          <p className="text-xs text-gray-500 font-medium">รับส่วนลดพิเศษทันที</p>
        </div>
      </motion.div>

      {/* Input and Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-2 mb-3"
      >
        <div className="flex-grow relative group">
          <input
            type="text"
            placeholder="กรอกโค้ดส่วนลดที่นี่"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            disabled={isApplying}
            className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-base font-medium transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed uppercase placeholder:normal-case"
          />
          {discountCode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.div>
          )}
        </div>
        <motion.button
          layout
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyDiscount}
          disabled={isApplying}
          transition={{ 
            layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.2 }
          }}
          className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-4 sm:px-6 rounded-xl hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 font-bold text-sm sm:text-base shadow-lg shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[100px] sm:min-w-[120px] whitespace-nowrap"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isApplying ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full flex-shrink-0"
                />
                <span className="hidden sm:inline">กำลังตรวจสอบ...</span>
                <span className="inline sm:hidden">ตรวจสอบ</span>
              </motion.div>
            ) : (
              <motion.span
                key="apply"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                ใช้
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Success/Error Message */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-2 p-3 rounded-xl font-medium text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                <XCircle className="w-5 h-5 text-red-600" strokeWidth={2.5} />
              </motion.div>
            )}
            <span className="flex-1">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text */}
      {!message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-gray-400 font-medium mt-2 flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full" />
          ลองใช้โค้ด <span className="font-bold text-red-500">SAVE10</span> เพื่อรับส่วนลด
        </motion.p>
      )}
    </motion.div>
  );
}

export default DiscountCard;

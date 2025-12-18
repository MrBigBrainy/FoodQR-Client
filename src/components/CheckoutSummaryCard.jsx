import React from "react";
import { motion } from "motion/react";
import { Receipt, Sparkles } from "lucide-react";
import { useEffect } from "react";
import useCartStore from "@/stores/cartStore";

function CheckoutSummaryCard({vat, selectedPrice, selectedDiscount, selectedNetPrice, voucherDiscount}) {
  const discount = useCartStore((state) => state.discount);
  const {setDiscountAmount}  = useCartStore.getState()

  const totalDiscountCard = (discount) => {
    let discountAmount;
    if (!discount) return 0;
    if (discount.discountType === "percent") {
      discountAmount = selectedPrice * (discount.amount / 100); 
    }  else if (discount.discountType === "bath") {
      discountAmount = discount.amount; 
    }

    setDiscountAmount(discountAmount);
    return discountAmount;
  }

  useEffect(() => console.log('discount', discount), [discount])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mx-5 my-5 mb-24 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-full blur-2xl -z-10 opacity-60" />

      <div className="flex items-center gap-3 mb-6">
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30"
        >
          <Receipt size={20} strokeWidth={2.5} />
        </motion.div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            สรุปยอดคำสั่งซื้อ
            <Sparkles className="text-orange-400 w-4 h-4" />
          </h3>
          <p className="text-xs text-gray-500 font-medium">รายละเอียดการชำระเงิน</p>
        </div>
      </div>

      <div className="space-y-3">
        <SummaryRow label="ยอดรวม" value={selectedPrice} delay={0.1} />
        <SummaryRow label="ภาษี (7%)" value={vat} delay={0.3} />
        <SummaryRow label="ส่วนลดเมนู" value={selectedDiscount} isDiscount delay={0.2} />
        {/* <SummaryRow label="ส่วนลดท้ายบิล" value={voucherDiscount} isDiscount delay={0.25} /> */}
        {discount && (
          <SummaryRow label="ส่วนลดจากโค้ด" value={totalDiscountCard(discount).toFixed(0)} isDiscount delay={0.35} />
        )}
        
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="my-4 border-t-2 border-dashed border-gray-100"
      />

      <div className="flex justify-between items-center pt-1">
        <span className="text-base font-bold text-gray-700">ยอดรวมทั้งหมด</span>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="flex items-baseline gap-1"
        >
          <span className="text-sm font-semibold text-red-500">฿</span>
          <span className="text-2xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
            {selectedNetPrice}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SummaryRow({ label, value, isDiscount, delay }) {
  // Format value to handle negative numbers nicely with the currency symbol
  const formattedValue = value.toString().startsWith("-") 
    ? `-฿${value.toString().substring(1)}` 
    : `฿${value}`;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
      className={`flex justify-between items-center text-sm ${
        isDiscount ? "text-red-500 font-medium" : "text-gray-600 font-medium"
      }`}
    >
      <span>{label}</span>
      <span className={isDiscount ? "text-red-500" : "text-gray-800"}>
        {formattedValue}
      </span>
    </motion.div>
  );
}

export default CheckoutSummaryCard;

import { useState, useEffect } from "react";
import { ArrowLeft, Receipt, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import useMenuStore from "@/stores/useMenuStore";
import RedWineLoader from "./loader/RedWineLoader";
import { getUserOrderByOrderId } from "@/api/userOrder.api";
import useQrStore from "@/stores/qrStore";

function formatTHB(amount) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function HistoryCard() {
  const navigate = useNavigate();
  const { totalOrder } = useMenuStore();
  const { setTotalOrder } = useMenuStore.getState();
  const { setEachUserOrder } = useMenuStore.getState();
  const { setUserOrder } = useMenuStore.getState();
  const { orderId } = useQrStore();
  const [loading, setLoading] = useState(true);

  // Sort orders by orderTime descending (newest first)
  const sortedOrders = [...totalOrder].sort((a, b) => 
    new Date(b.orderTime) - new Date(a.orderTime)
  );

      useEffect(() => {
        async function getUserOrder() {
          try {
            const response = await getUserOrderByOrderId({ orderId: orderId || 1 });
            setTotalOrder(response.data.data)
            console.log('totalOrder', response.data.data)
            const groupedData = response.data.data.reduce((acc, item) => {
              const key = item.lineId;
              if (!acc[key]) acc[key] = [];
              acc[key].push(item);
              return acc;
            }, {});
            console.log("groupeddata", groupedData)
            setEachUserOrder(groupedData)
            const newData = Object.entries(groupedData)
            console.log("newData", newData)
            setUserOrder(newData);
          } catch (error) {
            console.error("Error fetching user order:", error);
          } finally {
            setLoading(false);
          }
        }
        getUserOrder();
      }, [orderId])
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <RedWineLoader />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pb-28"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-2xl mx-auto px-4 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 mb-5"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">กลับ</span>
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">ประวัติการสั่งซื้อ</h2>

        <div className="space-y-4">
          {sortedOrders.length === 0 ? (
             <div className="text-center text-gray-500 py-10">ไม่มีประวัติการสั่งซื้อ</div>
          ) : (
            sortedOrders.map((item, index) => (
                <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden"
              >
                 {/* Decorative background elements similar to CheckoutSummaryCard */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-full blur-2xl -z-10 opacity-60" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange-50 rounded-full blur-xl -z-10 opacity-60" />

                <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                        {/* User Image */}
                         <div className="shrink-0">
                            {item.user?.imageUrl ? (
                                <img 
                                    src={item.user.imageUrl} 
                                    alt={item.user.displayName} 
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                    No Img
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <div className="font-bold text-gray-800 text-sm">{item.displayName || "Unknown User"}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                {formatDate(item.orderTime)}
                            </div>
                        </div>
                    </div>

                     <div className="text-right">
                        <div className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                            {formatTHB(item.menu?.price * item.quantity)}
                        </div>
                     </div>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-gray-100">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-700 font-medium">
                            {item.menu?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            x{item.quantity}
                        </div>
                    </div>
                </div>

              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

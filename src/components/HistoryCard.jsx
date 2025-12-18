import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronDown, Clock3, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";

const mockOrders = [
  {
    id: "ORD-9999",
    dateText: "17 ธ.ค. 2568 13:11",
    total: 380,
    statusText: "ชำระเงินแล้ว",
    items: [
      { name: "แซลมอนซาชิมิไซส์ใหญ่", qty: 1 },
      { name: "ชาเขียวเย็น", qty: 1 },
    ],
  },
  {
    id: "ORD-9998",
    dateText: "16 ธ.ค. 2568 13:11",
    total: 220,
    statusText: "ชำระเงินแล้ว",
    items: [{ name: "ซูชิเซตพรีเมี่ยม", qty: 1 }],
  },
  {
    id: "ORD-9997",
    dateText: "15 ธ.ค. 2568 13:11",
    total: 220,
    statusText: "รอชำระเงิน",
    items: [{ name: "ข้าวผัดกะเพราหมูสับ", qty: 1 }],
  },
  {
    id: "ORD-9996",
    dateText: "14 ธ.ค. 2568 13:11",
    total: 180,
    statusText: "ยังไม่ได้ชำระ",
    items: [{ name: "น้ำเปล่า", qty: 2 }],
  },
];

function formatTHB(amount) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getStatusUI(statusText) {
  const paidSet = new Set(["ชำระเงินแล้ว", "ชำระแล้ว"]);
  const pendingSet = new Set(["รอชำระเงิน", "รอชำระ"]);
  const unpaidSet = new Set(["ยังไม่ได้ชำระ", "ยังไม่ชำระ"]);

  if (paidSet.has(statusText)) {
    return { className: "text-green-600", detailClassName: "text-green-700", Icon: CheckCircle2 };
  }
  if (pendingSet.has(statusText)) {
    return { className: "text-yellow-600", detailClassName: "text-yellow-700", Icon: Clock3 };
  }
  if (unpaidSet.has(statusText)) {
    return { className: "text-red-600", detailClassName: "text-red-700", Icon: XCircle };
  }
  return { className: "text-gray-500", detailClassName: "text-gray-700", Icon: Clock3 };
}

export default function HistoryCard() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(() => new Set());

  const toggleOrder = (orderId) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

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
          className="flex items-center gap-2 text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">กลับ</span>
        </button>

        <h2 className="mt-3 text-xl font-bold text-gray-900">ประวัติการสั่งซื้อ</h2>

        <div className="mt-4 space-y-4">
          {mockOrders.map((order) => {
            const isOpen = expanded.has(order.id);
            const statusUI = getStatusUI(order.statusText);
            const StatusIcon = statusUI.Icon;

            return (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-800">
                    คำสั่งซื้อ: <span className="font-extrabold">{order.id}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">วันที่: {order.dateText}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-extrabold text-[#C10007]">
                    {formatTHB(order.total)}
                  </div>
                  <div className={`flex items-center justify-end gap-1 ${statusUI.className} text-xs font-medium mt-1`}>
                    <StatusIcon className="w-4 h-4" />
                    <span>{order.statusText}</span>
                  </div>
                </div>
              </div>

              <div className="my-3 h-px bg-gray-100" />

              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={`${order.id}-${idx}`} className="flex justify-between gap-4">
                    <div className="text-sm text-gray-800 truncate">{item.name}</div>
                    <div className="text-sm text-gray-700 font-medium shrink-0">x{item.qty}</div>
                  </div>
                ))}
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 rounded-xl bg-gray-50 border border-gray-100 p-3">
                      <div className="text-sm font-bold text-gray-800">รายละเอียดคำสั่งซื้อ</div>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div className="text-gray-500">เลขออเดอร์</div>
                        <div className="text-right text-gray-800 font-semibold">{order.id}</div>

                        <div className="text-gray-500">วันที่</div>
                        <div className="text-right text-gray-800 font-semibold">{order.dateText}</div>

                        <div className="text-gray-500">สถานะ</div>
                        <div className={`text-right ${statusUI.detailClassName} font-semibold`}>{order.statusText}</div>

                        <div className="text-gray-500">ยอดรวม</div>
                        <div className="text-right text-[#C10007] font-extrabold">
                          {formatTHB(order.total)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => toggleOrder(order.id)}
                className="w-full mt-3 flex items-center justify-center gap-1.5 text-[#C10007] font-semibold text-sm"
              >
                <span>{isOpen ? "ซ่อนรายละเอียด" : "ดูรายละเอียดเต็ม"}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
            </div>
          )})}
        </div>
      </div>
    </motion.div>
  );
}

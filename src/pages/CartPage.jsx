import EmptyCart from "../components/EmptyCart";
import { motion, AnimatePresence } from "motion/react";
import CartAction from "../components/CartAction";
import useCartStore from "../stores/cartStore";
import CartCard from "../components/CartCard";
import CartOrder from "@/components/CartOrder";
import { useState } from "react";
import DeliveryLoader from "@/components/loader/DeliveryLoader";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalCartItems = useCartStore((state) => state.totalCartItems);
  const [isCallingStaff, setIsCallingStaff] = useState(false);
  const [staffCalled, setStaffCalled] = useState(false);

  const handleCallStaff = () => {
    setIsCallingStaff(true);
    setTimeout(() => {
      setIsCallingStaff(false);
      setStaffCalled(true);
    }, 3000);
  };

  if (totalCartItems === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="min-h-screen bg-gray-50 pb-32 relative">
      {isCallingStaff && (
        <div className="fixed inset-0 z-50">
            <DeliveryLoader />
        </div>
      )}
      
      <CartAction onCallStaff={handleCallStaff} staffCalled={staffCalled} />
      
      <div className="max-w-lg mx-auto px-4 pt-2">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          รายการอาหารที่เลือก
          <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
            {totalCartItems}
          </span>
        </h2>

        <motion.div

          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {items?.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CartOrder />
    </div>
  );
}

export default CartPage;

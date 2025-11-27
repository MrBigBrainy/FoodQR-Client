import EmptyCart from "../components/EmptyCart";
import { motion, easeInOut } from "motion/react";
import CartAction from "../components/CartAction";
import useCartStore from "../stores/cartStore";
import CartCard from "../components/CartCard";
import CartOrder from "@/components/CartOrder";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalCartItems = useCartStore((state) => state.totalCartItems);

  if (totalCartItems === 0) {
    return <EmptyCart />;
  }
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: easeInOut }}
    >
      <CartAction />
      <div className="lg:col-span-2 space-y-4 pb-65">
        {items?.map((item) => (
          <CartCard key={item.id} item={item} />
        ))}
      </div>
      <CartOrder />
    </motion.div>
  );
}

export default CartPage;

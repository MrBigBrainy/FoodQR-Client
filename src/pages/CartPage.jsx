import EmptyCart from "@/components/EmptyCart";
import { motion, easeInOut } from 'motion/react';
import CartAction from "@/components/CartAction";

function CartPage() {
  return (<motion.div initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.25, ease: easeInOut }}>
    <CartAction />
    <EmptyCart />
  </motion.div>)
}

export default CartPage;

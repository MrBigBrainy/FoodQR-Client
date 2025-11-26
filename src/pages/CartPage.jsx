import EmptyCart from "@/components/EmptyCart";
import { motion, easeInOut } from 'motion/react';

function CartPage() {
  return (<motion.div initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 0.3, ease: easeInOut }}>
    <EmptyCart />
  </motion.div>)
}

export default CartPage;

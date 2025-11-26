import { NavLink } from "react-router";
import useCartStore from "../stores/cartStore";
import { ShoppingCartIcon } from "lucide-react";
import { HouseIcon } from "lucide-react";
import { WalletIcon } from "lucide-react";
import { motion } from "motion/react";

function Footer() {
  const totalCartItems = useCartStore((state) => state.totalCartItems);

  return (
    <motion.footer initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }} className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-xl border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        <NavLink
          to="/"
          className="text-xs font-medium text-gray-500 hover:text-red-700 transition duration-150 p-2"
        >
          <motion.div className="flex flex-col gap-2 items-center justify-center " whileTap={{ scale: 0.85 }}>
            <HouseIcon />
            <span>เมนู</span>
          </motion.div>
        </NavLink>
        <NavLink
          to="/cart"
          className="flex flex-col gap-2 items-center justify-center text-xs font-medium text-gray-500 hover:text-red-700 transition duration-150 p-2"
        >
          <motion.div className="flex flex-col gap-2 items-center justify-center " whileTap={{ scale: 0.85 }}>
            <ShoppingCartIcon />

            <span>ตะกร้า</span>
            <span
              className="absolute  
                 transform translate-x-1/2 -translate-y-5
                 bg-red-700 text-white 
                 rounded-full text-xs font-bold 
                 w-4 h-4 flex items-center justify-center 
                 leading-none p-1"
            >
              {totalCartItems}
            </span>
          </motion.div>

        </NavLink>
        <NavLink
          to="/summary"
          className="flex flex-col gap-2 items-center justify-center text-xs font-medium text-gray-500 hover:text-red-700 transition duration-150 p-2"
        >
          <motion.div className="flex flex-col gap-2 items-center justify-center " whileTap={{ scale: 0.85 }}>
            <WalletIcon />
            <span>ชำระเงิน</span>
          </motion.div>
        </NavLink>
      </div>
    </motion.footer>
  );
}

export default Footer;

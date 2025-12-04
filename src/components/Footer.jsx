import { NavLink, useParams } from "react-router";
import useCartStore from "../stores/cartStore";
import { ShoppingCartIcon, HouseIcon, WalletIcon } from "lucide-react";
import { motion } from "motion/react";

function Footer() {
  const { storeId, tableId, orderId } = useParams();
  const totalCartItems = useCartStore((state) => state.totalCartItems);

  const baseUrl = `/store/${storeId}/table/${tableId}/order/${orderId}`;

  const navItems = [
    { to: baseUrl, icon: HouseIcon, label: "เมนู", end: true },
    { to: `${baseUrl}/cart`, icon: ShoppingCartIcon, label: "ตะกร้า", badge: totalCartItems },
    { to: `${baseUrl}/summary`, icon: WalletIcon, label: "ชำระเงิน" },
  ];

  return (
    <motion.footer 
      initial={{ y: 100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }} 
      className="fixed bottom-6 left-4 right-4 z-50"
    >
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-full border border-white/20 max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around items-center relative">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex-1 flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${
                  isActive ? "text-[#C10007]" : "text-gray-400 hover:text-gray-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-red-50 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    className="relative"
                  >
                    <item.icon className={`w-6 h-6 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
                    
                    {item.badge > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={item.badge}
                        className="absolute -top-2 -right-2 bg-[#C10007] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                  
                  <span className={`text-[10px] font-medium mt-1 ${isActive ? "font-bold" : ""}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;

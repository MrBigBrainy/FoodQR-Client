import React from 'react';
import { NavLink, useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  StoreIcon,
  TableIcon,
  HouseIcon,
  BanknoteIcon,
  PercentIcon,
  ChefHatIcon,
  LogOutIcon,
  CircleArrowLeftIcon,
  MenuIcon,
} from 'lucide-react';
import { socket } from '@/lib/socket';

function SidebarAdmin() {
  const params = useParams();
  const navigate = useNavigate();
  const storeId = params.storeId || localStorage.getItem('storeId');
  const tableId = localStorage.getItem('tableId');
  const orderId = localStorage.getItem('orderId');

  const handleLogout = () => {
    // Save username before clearing storage (if exists)
    const savedUsername = localStorage.getItem('lastUsername');
    
    // Disconnect socket if connected
    if (socket && socket.connected) {
      socket.emit("leaveStore", { storeId });
      socket.disconnect();
    }
    
    // Clear all localStorage items
    localStorage.clear();
    // Clear all sessionStorage items
    sessionStorage.clear();
    
    // Restore username after clearing (so it persists after logout)
    if (savedUsername) {
      localStorage.setItem('lastUsername', savedUsername);
    }
    
    // Navigate to login page
    navigate('/login');
  };

  const menuItems = [
    {
      path: `/admin/store/${storeId}`,
      icon: HouseIcon,
      label: 'ภาพรวมร้านค้า',
      end: true,
    },
    // {
    //   path: `/admin/store/${storeId}/kitchen`,
    //   icon: ChefHatIcon,
    //   label: 'จัดการครัว',
    // },
    {
      path: `/admin/store/${storeId}/table`,
      icon: TableIcon,
      label: 'จัดการโต๊ะ',
    },
    {
      path: `/admin/store/${storeId}/addmenu`,
      icon: MenuIcon,
      label: 'จัดการเมนู',
    },
    // {
    //   path: `/admin/store/${storeId}/billing`,
    //   icon: BanknoteIcon,
    //   label: 'จัดการบิล',
    // },
    {
      path: `/admin/store/${storeId}/discount`,
      icon: PercentIcon,
      label: 'จัดการส่วนลด',
    },
    {
      path: `/admin/store/${storeId}/settings`,
      icon: StoreIcon,
      label: 'ตั้งค่าร้าน',
    },
  ];

  return (
    <aside className="w-72 bg-white h-screen fixed top-0 left-0 flex flex-col shadow-xl z-50 font-sans border-r border-gray-100">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -z-10 opacity-40 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-50 rounded-full blur-3xl -z-10 opacity-40 -translate-x-1/2 translate-y-1/2" />

      {/* Header */}
      <div className="p-8 pb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
            <ChefHatIcon className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              FoodQR
            </h1>
            <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {/* Back to Menu Link */}
        <NavLink
          to={`http://localhost:5173/menu-qr?storeId=${storeId}`} 
          className="block mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100 hover:border-red-100 group"
          >
            <CircleArrowLeftIcon size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            <div>
              <p className="text-sm font-semibold">กลับหน้าเมนู</p>
              <p className="text-[10px] text-gray-400 group-hover:text-red-400">Client View</p>
            </div>
          </motion.div>
        </NavLink>

        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Management
        </p>

        {/* Menu Items */}
        <div className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className="relative block"
            >
              {({ isActive }) => (
                <motion.div
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive ? 'text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <item.icon
                      size={20}
                      className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-500'}`}
                    />
                    <span className={`font-medium text-sm tracking-wide ${isActive ? 'font-semibold' : ''}`}>
                      {item.label}
                    </span>
                  </span>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full shadow-sm z-10"
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="w-full"
        >
          <motion.div
            whileHover={{ x: 5, color: "#ef4444", backgroundColor: "#fef2f2" }}
            className="flex items-center gap-3 px-4 py-3 text-gray-500 transition-colors rounded-xl cursor-pointer"
          >
            <LogOutIcon size={20} />
            <span className="font-medium text-sm">ออกจากระบบ</span>
          </motion.div>
        </button>
      </div>
    </aside>
  );
}

export default SidebarAdmin;

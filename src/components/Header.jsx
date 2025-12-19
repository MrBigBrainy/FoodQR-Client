import useMenuStore from "@/stores/useMenuStore";
import useUserStore from "../stores/userStore";
import useQrStore from "../stores/qrStore";
import { motion } from "motion/react";

function Header() {
  const displayName = useUserStore((state) => state.displayName);
  const pictureUrl = useUserStore((state) => state.pictureUrl);
  const tableName = useQrStore((state) => state.tableName);
  const storeInfo = useMenuStore((state) => state.storeInfo);
  
  return (
    <motion.header
      className="w-full fixed top-0 left-0 right-0 bg-gradient-to-r from-[#C10007] to-[#8B0000] text-white shadow-xl z-40 rounded-b-3xl px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 1
      }}
    >
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          {storeInfo?.logoUrl ? (
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white shadow-md overflow-hidden border-2 border-white/20">
                  <img 
                    src={storeInfo.logoUrl} 
                    alt={storeInfo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-tight tracking-tight drop-shadow-md line-clamp-1 max-w-[150px] sm:max-w-[200px]">
                    {storeInfo.name}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-sm"></span>
                    </span>
                    <p className="text-xs font-medium text-white/90 tracking-wide">{tableName}</p>
                  </div>
                </div>
             </div>
          ) : (
            <>
              <h1 className="font-bold text-2xl tracking-tight drop-shadow-md">{storeInfo?.name || "Loading..."}</h1>
              <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm"></span>
                </span>
                <p className="text-xs font-semibold text-white tracking-wide shadow-sm">{tableName}</p>
              </div>
            </>
          )}
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-medium text-white/80">Welcome</div>
            <div className="text-sm font-bold leading-none">{displayName}</div>
          </div>
          <img
            src={pictureUrl}
            alt="user profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </motion.div>
      </div>
    </motion.header>
  );
}
export default Header;

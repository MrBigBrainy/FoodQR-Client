import useUserStore from "../stores/userStore";
import { motion } from "motion/react";

function Header() {
  const displayName = useUserStore((state) => state.displayName);
  const pictureUrl = useUserStore((state) => state.pictureUrl);
  
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
        >
          <h1 className="font-bold text-2xl tracking-tight drop-shadow-md">Minna no Sushi</h1>
          <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm"></span>
            </span>
            <p className="text-xs font-semibold text-white tracking-wide shadow-sm">โต๊ะ 22</p>
          </div>
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

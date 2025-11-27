import useUserStore from "../stores/userStore";
import { motion } from "motion/react";

function Header() {
  const displayName = useUserStore((state) => state.displayName);
  const pictureUrl = useUserStore((state) => state.pictureUrl);
  return (
    <motion.header className="w-full bg-[#C10007] text-white shadow-md z-40 p-3" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-xl">Minna no Sushi</h1>
          <p className="text-sm opacity-90">โต๊ะ 22</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5">
          <img src={pictureUrl} alt="user profile picture" className="w-8 h-8 rounded-full border border-white/30" />
          <div className="text-xs font-medium">{displayName}</div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;

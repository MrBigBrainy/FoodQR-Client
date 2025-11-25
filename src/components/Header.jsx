import useUserStore from "../stores/userStore";
import { motion } from "motion/react";

function Header() {
  const displayName = useUserStore((state) => state.displayName);
  const pictureUrl = useUserStore((state) => state.pictureUrl);
  return (
    <motion.header className="fixed top-0 w-full bg-white shadow-md z-40 p-3" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-md">Minna no Sushi</h1>
          <p className="text-sm">โต๊ะ 22</p>

        </div>
        <div className="flex flex-col gap-1">
          <img src={pictureUrl} alt="user profile picture" className="w-10 h-10 rounded-full" />
          <div className="text-sm">{displayName}</div>

        </div>
      </div>
    </motion.header>
  );
}

export default Header;

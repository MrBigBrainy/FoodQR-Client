import useCartStore from "../stores/cartStore";
import { motion } from "framer-motion"

const MenuCard = ({ id, name, price, ImageUrl }) => {
  const addItem = useCartStore((state) => state.addItem);

  const addToCard = () => {
    addItem({
      id: id,
      name: name,
      price: Number(price),
      amount: 1,
    });
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={addToCard}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      <div className="relative">
        <img
          src={ImageUrl || "placeholder.jpg"}
          alt={name}
          className=" w-full h-[160px] object-cover"
        />
        <button
          type="button"
          className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white 
                     rounded-full w-10 h-10 flex items-center justify-center shadow-md transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="p-2.5 flex flex-col justify-between">
        <div className="space-y-0.5">
          <div className="font-medium text-[15px] text-gray-800 truncate text-base">
            {name || "ชื่อเมนู"}
          </div>
          <div className="text-sm font-medium text-red-600"> {`฿${price}`}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;

import CheckoutSummaryCard from "@/components/CheckoutSummaryCard";
import DiscountCard from "@/components/DiscountCard";
import DividedCard from "@/components/DividedCard";
import PaymentButton from "@/components/PaymentButton";
import UserSummary from "@/components/UserSummary";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { easeInOut, motion} from "motion/react";

function SummaryPage() {
  const { storeId, tableId } = useParams();
  return (
    <motion.div className="pt-5"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: easeInOut }}>
      <Link
        to={`/store/${storeId}/table/${tableId}/cart`}
        className="flex items-center text-gray-700 cursor-pointer mb-5 w-[90%] mx-5"
      >
        <ArrowLeft className="w-5 h-5" />

        <span className="ml-2 text-base">กลับ</span>
      </Link>
      <DiscountCard />
      <DividedCard />
      <UserSummary />
      <CheckoutSummaryCard />
      <PaymentButton />
    </motion.div>
  );
}

export default SummaryPage;

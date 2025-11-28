import CheckoutSummaryCard from "@/components/CheckoutSummaryCard";
import DiscountCard from "@/components/DiscountCard";
import DividedCard from "@/components/DividedCard";
import PaymentButton from "@/components/PaymentButton";
import UserSummary from "@/components/UserSummary";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

function SummaryPage() {
  return (
    <div className="pt-25">
      <Link
        to="/cart"
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
    </div>
  );
}

export default SummaryPage;

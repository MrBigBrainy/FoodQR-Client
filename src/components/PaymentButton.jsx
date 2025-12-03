import { QrCode } from "lucide-react";
import api from "@/api/axios";
import useBillingStore from "@/stores/useBillingStore";
import { useNavigate } from "react-router";

const PaymentButton = () => {
  const navigate = useNavigate();
  const { setBilling } = useBillingStore.getState();

  Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY);
  const createSource = () => {
    return new Promise((resolve, reject) => {
      Omise.createSource(
        "promptpay",
        {
          amount: 100 * 100,
          currency: "THB",
        },
        (statusCode, response) => {
          if (statusCode !== 200) {
            return reject(response);
          }
          resolve(response);
        }
      );
    });
  };

  const handlePayment = async () => {
    console.log('--')
    try {
      const omiseResponse = await createSource();

      const response = await api.post("/omise", {
        source: omiseResponse.id,
      });
      console.log(response);
      setBilling({
        qrUrl: response.data.qrUrl,
        chargeId: response.data.chargeId,
      });
      navigate("/billing");
    } catch (error) {
      console.error(error);
    }
  };

  const thaiLabel = "ชำระเงิน";
  const displayAmount = "฿469.73";

  return (
    <div className="w-full mt-6 mb-8">
      <button
        className="
        bg-red-700 hover:bg-red-800 
        text-white 
        font-bold 
        py-3 px-4 
        rounded-md 
        flex items-center justify-center 
        w-[90%]
        mx-auto
        shadow-lg 
        transition duration-300 ease-in-out 
        cursor-pointer
      "
        onClick={handlePayment}
      >
        <QrCode className="w-5 h-5 mr-3" />

        <span className="text-lg">
          {thaiLabel} {displayAmount}
        </span>
      </button>
    </div>
  );
};

export default PaymentButton;

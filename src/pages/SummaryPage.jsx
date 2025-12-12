import CheckoutSummaryCard from "@/components/CheckoutSummaryCard";
import DiscountCard from "@/components/DiscountCard";
import DividedCard from "@/components/DividedCard";
import PaymentButton from "@/components/PaymentButton";
import UserSummary from "@/components/UserSummary";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { easeInOut, motion } from "motion/react";
import { useEffect, useState } from "react";
import { getUserOrderByOrderId } from "@/api/userOrder.api";
import useQrStore from "@/stores/qrStore";
import api from "@/api/axios";

function SummaryPage() {
  const { storeId, tableId } = useParams();
  const { orderId } = useQrStore();
  const [userOrder, setUserOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('pay-all')

  const [totalOrder, setTotalOrder] = useState([]);
  const totalPrice = totalOrder.reduce((acc, item) => acc + (item.quantity * item.menu.price), 0);
  const totalDiscount = totalOrder.reduce((acc, item) => acc + (item.quantity * item.menu.discount), 0);
  const totalNetPrice = totalOrder.reduce((acc, item) => acc + (item.quantity * item.menu.netPrice), 0);


  Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY)
 function createSource() {
        return new Promise((resolve, reject) => {
            // ทำการส่ง source ที่ต้องการจ่ายไป omise เพื่อนำ source token กลับมา
            Omise.createSource('promptpay', {
                amount: (100 * 100),
                currency: 'THB'
            }, (statusCode, response) => {
                if (statusCode !== 200) {
                    return reject(response)
                }
                resolve(response)
            })
        })
    }

  async function handlePaymentClick () {
                const omiseResponse = await createSource()
                // const response = await axios.post('https://foodqr-server.onrender.com/api/omise', {
                //     source: omiseResponse.id
                // })
                 const response = await api.post('/omise', {
                    source: omiseResponse.id
                })
                console.log(response)
  }

  useEffect(() => {
    async function getUserOrder() {
      const response = await getUserOrderByOrderId({ orderId: orderId || 1 });
      setTotalOrder(response.data.data)
      const groupedData = response.data.data.reduce((acc, item) => {
      const key = item.lineId;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
      }, {});
      console.log("groupeddata", groupedData)
      const newData = Object.entries(groupedData)
      console.log("newData", newData)
      setUserOrder(newData);
    }
    getUserOrder();
  }, [])

 


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
      <DividedCard totalNetPrice={totalNetPrice} userOrder={userOrder} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
      {userOrder?.map((item, index) => {
        const user = item[1][0]
        const userObject = {
          displayName: user.displayName,
          imageUrl: user.imageUrl,
        }
        return (
          <div key={index} className="mb-4">
            <UserSummary user={userObject} userOrder={item[1]}/>
          </div>
        )
      })}
      <CheckoutSummaryCard totalPrice={totalPrice} totalDiscount={totalDiscount} totalNetPrice={totalNetPrice}/>
      <PaymentButton onClick={handlePaymentClick}/>


    </motion.div>
  );
}

export default SummaryPage;

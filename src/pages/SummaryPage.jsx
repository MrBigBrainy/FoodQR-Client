import CheckoutSummaryCard from "@/components/CheckoutSummaryCard";
import DiscountCard from "@/components/DiscountCard";
import DividedCard from "@/components/DividedCard";
import PaymentButton from "@/components/PaymentButton";
import UserSummary from "@/components/UserSummary";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { easeInOut, motion } from "motion/react";
import { useEffect, useState } from "react";
import { getUserOrderByOrderId } from "@/api/userOrder.api";
import useQrStore from "@/stores/qrStore";
import useUserStore from "@/stores/userStore";
import useCartStore from "@/stores/cartStore";
import api from "@/api/axios";

function SummaryPage() {
  const navigate = useNavigate();
  const { storeId, tableId } = useParams();
  const { orderId } = useQrStore();
  const [userOrder, setUserOrder] = useState(null);
  const [eachUserOrder, setEachUserOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('pay-all')
  const [totalOrder, setTotalOrder] = useState([]);
  const [splitCount, setSplitCount] = useState(1);
  const [vat, setVat] = useState(0);

  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedNetPrice, setSelectedNetPrice] = useState(0);


  const discountCard = useCartStore((state) => state.discountCard)
  const discountAmount = useCartStore((state) => state.discountAmount)
  
  const totalPrice = totalOrder.reduce((acc, item) => acc + (item.quantity * item.menu.price), 0);
  const totalDiscount = totalOrder.reduce((acc, item) => acc + (item.quantity * item.menu.discount), 0);
  const totalNetPrice = totalOrder.reduce((acc, item) => acc + (item.quantity * item.menu.netPrice), 0);
  // const vat = (totalNetPrice * 0.07).toFixed(0)

  useEffect(() => console.log('userOrder', userOrder), [userOrder])
    useEffect(() => console.log('totalOrder', totalOrder), [totalOrder])


  console.log('totalPrice',totalPrice)
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
                try {
                  const omiseResponse = await createSource()
                  console.log('new src id:', omiseResponse.id);

                    const response = await api.post('/omise', {
                        source: omiseResponse.id
                    })
                    console.log(response)
                    
                    navigate('/test3', { 
                        state: { 
                            amount: totalNetPrice, 
                            qrCode: response.data.qrUrl, 
                            orderNo: orderId, 
                            tableNo: tableId 
                        } 
                    });
                } catch (error) {
                    console.error("Payment error:", error);
                }
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
      setEachUserOrder(groupedData)
      const newData = Object.entries(groupedData)
      console.log("newData", newData)
      setUserOrder(newData);
    }
    getUserOrder();
  }, [])

   useEffect(() => {
      if (userOrder && userOrder.length > 0) {
        setSplitCount(userOrder.length);
      }
   }, [userOrder]);
  
  useEffect(() => {
    console.log('discountAmount', discountAmount)
  }, [discountAmount])


  useEffect(() => {
    if (paymentMethod === 'pay-all') {
      setSelectedPrice(totalPrice.toFixed(0));
      setSelectedDiscount(totalDiscount.toFixed(0));
      setSelectedNetPrice(Number(totalPrice.toFixed(0))+Number((totalPrice * 0.07).toFixed(0))-Number(discountAmount.toFixed(0))-totalDiscount.toFixed(0));
      setVat((totalPrice * 0.07).toFixed(0))
    } else if (paymentMethod === 'split-equal') {
      setSelectedPrice((totalPrice/splitCount).toFixed(0));
      setSelectedDiscount((totalDiscount/splitCount).toFixed(0));
      setVat((totalPrice/splitCount * 0.07).toFixed(0))
     setSelectedNetPrice(
  Number((totalPrice / splitCount).toFixed(0)) +
  Number(((totalPrice / splitCount) * 0.07).toFixed(0)) -
  Number((discountAmount / splitCount).toFixed(0)) -
  Number((totalDiscount / splitCount).toFixed(0))
);

    } else if (paymentMethod === 'split-item') {
      const { lineId } = useUserStore.getState();
      const resultPrice = eachUserOrder[lineId].reduce((acc, item) => {
        return acc + (item.quantity * item.menu.price);
      }, 0);
      const resultDiscount = eachUserOrder[lineId].reduce((acc, item) => {
        return acc + (item.quantity * item.menu.discount);
      }, 0);
      const resultNetPrice = eachUserOrder[lineId].reduce((acc, item) => {
        return acc + (item.quantity * item.menu.netPrice);
      }, 0);
      console.log('result price', resultPrice)
      console.log('result discount', resultDiscount)
      console.log('result net price', resultNetPrice)
      setSelectedPrice(resultPrice.toFixed(0));
      setSelectedDiscount(resultDiscount.toFixed(0));
      setSelectedNetPrice(resultNetPrice.toFixed(0)-(discountAmount/splitCount).toFixed(0));
    }
  }, [paymentMethod, splitCount, discountAmount])

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
      <DividedCard splitCount={splitCount} setSplitCount={setSplitCount} selectedNetPrice={selectedNetPrice} userOrder={userOrder} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
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
      <CheckoutSummaryCard vat={vat} selectedPrice={selectedPrice} selectedDiscount={selectedDiscount} selectedNetPrice={selectedNetPrice}/>
      <PaymentButton onClick={handlePaymentClick} amount={selectedNetPrice}/>


    </motion.div>
  );
}

export default SummaryPage;

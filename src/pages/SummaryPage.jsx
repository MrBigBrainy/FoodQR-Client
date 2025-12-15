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

  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedNetPrice, setSelectedNetPrice] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const discountCard = useCartStore((state) => state.discountCard)

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
    let price = 0;
    let discount = 0;
    let netPrice = 0;

    if (paymentMethod === 'pay-all') {
      price = totalNetPrice;
      discount = totalDiscount;
      netPrice = totalNetPrice;
    } else if (paymentMethod === 'split-equal') {
      price = totalNetPrice / splitCount;
      discount = totalDiscount / splitCount;
      netPrice = totalNetPrice / splitCount;
    } else if (paymentMethod === 'split-item') {
      const { lineId } = useUserStore.getState();
      if (eachUserOrder && eachUserOrder[lineId]) {
        price = eachUserOrder[lineId].reduce((acc, item) => {
          return acc + (item.quantity * item.menu.price);
        }, 0);
        discount = eachUserOrder[lineId].reduce((acc, item) => {
          return acc + (item.quantity * item.menu.discount);
        }, 0);
        netPrice = eachUserOrder[lineId].reduce((acc, item) => {
          return acc + (item.quantity * item.menu.netPrice);
        }, 0);
      }
    }

    // Calculate Voucher Discount
    let vDiscount = 0;
    if (discountCard) {
      if (discountCard.discountType === 'percent') {
        vDiscount = netPrice * (discountCard.amount / 100);
      } else if (discountCard.discountType === 'amount') {
        vDiscount = discountCard.amount;
      }
    }

    // Ensure voucher discount doesn't exceed net price
    if (vDiscount > netPrice) {
      vDiscount = netPrice;
    }

    setSelectedPrice(price.toFixed(2));
    setSelectedDiscount(discount.toFixed(2));
    setVoucherDiscount(vDiscount.toFixed(2));
    setSelectedNetPrice((netPrice - vDiscount).toFixed(2));

  }, [paymentMethod, splitCount, totalNetPrice, totalDiscount, eachUserOrder, discountCard])

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
      <DividedCard splitCount={splitCount} setSplitCount={setSplitCount} totalNetPrice={totalNetPrice} userOrder={userOrder} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
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
      <CheckoutSummaryCard totalPrice={selectedPrice} totalDiscount={selectedDiscount} totalNetPrice={selectedNetPrice} voucherDiscount={voucherDiscount}/>
      <PaymentButton onClick={handlePaymentClick} amount={selectedNetPrice}/>


    </motion.div>
  );
}

export default SummaryPage;

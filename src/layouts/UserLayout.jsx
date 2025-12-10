import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartIcon from "../components/CartIcon";
import { useEffect, useState } from "react";
import { initLiff, getProfile } from "@/liff/liff";
import useUserStore from "@/stores/userStore";
import { socket } from "@/socket/socket";
import { useParams, useSearchParams } from "react-router";
import { getStoreMenu } from "@/api/store.api";
import useMenuStore from "../stores/useMenuStore";
import useQrStore from "../stores/qrStore";


function UserLayout() {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const { setUserStore } = useUserStore.getState();
  const { setMenu } = useMenuStore.getState();
  const [error, setError] = useState(null);
  const { setQrParams } = useQrStore.getState();
  const { storeId, tableId, orderId, tableName } = useQrStore();


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

const data = {
  storeId: params.get("storeId"),
  tableId: params.get("tableId"),
  orderId: params.get("orderId"),
  tableName: params.get("tableName"),
};

    console.log(data);
    setQrParams(data);
   
  }, [])

  useEffect(() => {
    if (!storeId || !tableId) {
      console.log("No storeId or tableId");
      return;
    };
    const startLiff = async () => {
      try {
        await initLiff();
        const profileData = await getProfile();
        console.log("profile Data", profileData);
        setUserStore(profileData);
      } catch (err) {
        console.error(err);
        setError("Cannot init LIFF");
      } finally {
        setLoading(false);
      }
    };

    startLiff();
  }, []);

  useEffect(() => { } , [])

  useEffect(() => {
    if (!storeId && !tableId) {
      console.log("No storeId and tableId");
      return;
    }
    socket.emit("joinTable", { storeId, tableId });
    return () => {
      socket.emit("leaveTable", { storeId, tableId });
    };

  }, [storeId, tableId]);

    useEffect(() => {
      if (!storeId) {
        console.log("No storeId");
        return;
      }
      async function getStoreMenuFunc() {
        useMenuStore.getState().setLoading(true);
        try {
          const response = await getStoreMenu(storeId);
          console.log(response.data);
          setMenu(response.data.menu);
        } catch (error) {
          console.error("Failed to fetch menu:", error);
        } finally {
          useMenuStore.getState().setLoading(false);
        }
      }
      getStoreMenuFunc();
    }, [storeId]);

  return (
    <div className="fixed inset-0 bg-gray-50">
      <Header />
      <div className="absolute top-24 bottom-28 left-0 right-0 overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;

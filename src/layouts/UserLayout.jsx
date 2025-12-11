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
  const [loading, setLoading] = useState(true);
  const { setUserStore } = useUserStore.getState();
  const { setMenu } = useMenuStore.getState();
  const [error, setError] = useState(null);
  
  // Zustand store
  const { storeId, tableId, orderId, tableName, setQrParams } = useQrStore();

  // 1️⃣ Read QR params once on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = {
      storeId: params.get("storeId"),
      tableId: params.get("tableId"),
      orderId: params.get("orderId"),
      tableName: params.get("tableName"),
    };
    console.log("QR params read:", data);
    if (data.storeId && data.tableId) {
      setQrParams(data);
    }
  }, [setQrParams]);

  // 2️⃣ LIFF login — run only after QR params exist
  useEffect(() => {
    if (!storeId || !tableId) return;

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
  }, [storeId, tableId, setUserStore]);

  // 3️⃣ Join socket room — run only after QR params exist
  useEffect(() => {
    if (!storeId || !tableId) return;

    socket.emit("joinTable", { storeId, tableId });
    return () => {
      socket.emit("leaveTable", { storeId, tableId });
    };
  }, [storeId, tableId]);

  // 4️⃣ Fetch menu — run only after storeId exists
  useEffect(() => {
    if (!storeId) return;

    const getMenu = async () => {
      useMenuStore.getState().setLoading(true);
      try {
        const response = await getStoreMenu(storeId);
        console.log("Menu data:", response.data);
        setMenu(response.data.menu);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        useMenuStore.getState().setLoading(false);
      }
    };

    getMenu();
  }, [storeId, setMenu]);


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

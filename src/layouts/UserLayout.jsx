import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartIcon from "../components/CartIcon";
import { useEffect, useState } from "react";
import { initLiff, getProfile } from "@/liff/liff";
import useUserStore from "@/stores/userStore";
import { socket } from "@/socket/socket";
import { useParams } from "react-router";
import { getStoreMenu } from "@/api/store.api";
import useMenuStore from "../stores/useMenuStore";


function UserLayout() {
  const { storeId, tableId, orderId} = useParams();
  const [loading, setLoading] = useState(true);
  const { setUserStore } = useUserStore.getState();
  const { setMenu } = useMenuStore.getState();
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!storeId || !tableId) return;
    

  //   const startLiff = async () => {
  //     try {
  //       await initLiff();
  //       const profileData = await getProfile();
  //       console.log("profile Data", profileData);
  //       setUserStore(profileData);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Cannot init LIFF");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   startLiff();
  // }, []);

  useEffect(() => {
    socket.emit("joinTable", { storeId, tableId });
    return () => {
      socket.emit("leaveTable", { storeId, tableId });
    };

  }, [storeId, tableId]);

    useEffect(() => {
      async function getStoreMenuFunc() {
        const response = await getStoreMenu(storeId);
        console.log(response.data);
        setMenu(response.data.menu);
      }
      getStoreMenuFunc();
    }, []);

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

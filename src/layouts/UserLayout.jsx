import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartIcon from "../components/CartIcon";
import { useEffect, useState } from "react";
import { initLiff, getProfile } from "@/liff/liff";
import useUserStore from "@/stores/userStore";

function UserLayout() {
  const [loading, setLoading] = useState(true);
  const { setUserStore } = useUserStore.getState();

  const [error, setError] = useState(null);
  useEffect(() => {
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

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default UserLayout;

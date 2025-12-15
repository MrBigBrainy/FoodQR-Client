import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { initLiff, getProfile } from '@/liff/liff';
import useUserStore from '@/stores/userStore';
import { socket } from '@/socket/socket';
import { useParams, useSearchParams } from 'react-router';
import { getStoreMenu } from '@/api/store.api';
import useMenuStore from '../stores/useMenuStore';

function UserLayout() {
  const routeParams = useParams();
  const [searchParams] = useSearchParams();

  const [storeId, setStoreId] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setUserStore } = useUserStore.getState();
  const { setMenu } = useMenuStore.getState();

  // 1) On mount: capture query params and persist to sessionStorage (so login redirect won't lose them)
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const paramsObj = {
      storeId: qs.get('storeId'),
      tableId: qs.get('tableId'),
      orderId: qs.get('orderId'),
      tableName: qs.get('tableName'),
    };

    // Only save if we have required values
    if (paramsObj.storeId && paramsObj.tableId) {
      sessionStorage.setItem('qrParams', JSON.stringify(paramsObj));
    }
  }, []);

  // 2) Initialize LIFF and recover profile + params
  // useEffect(() => {
  //   let mounted = true;

  //   const start = async () => {
  //     setLoading(true);
  //     try {
  //       await initLiff(); // your initLiff should call liff.login() internally if needed

  //       // after LIFF init (and login), fetch profile if available
  //       try {
  //         const profile = await getProfile();
  //         if (profile && mounted) setUserStore(profile);
  //       } catch (e) {
  //         console.warn("getProfile failed", e);
  //       }

  //       // recover params (prefer sessionStorage, fallback to URL)
  //       const saved = (() => {
  //         try {
  //           return JSON.parse(sessionStorage.getItem("qrParams") || "null");
  //         } catch {
  //           return null;
  //         }
  //       })();

  //       const effectiveStoreId = routeParams.storeId || searchParams.get("storeId") || saved?.storeId;
  //       const effectiveTableId = routeParams.tableId || searchParams.get("tableId") || saved?.tableId;
  //       const effectiveOrderId = routeParams.orderId || searchParams.get("orderId") || saved?.orderId;

  //       if (mounted) {
  //         if (effectiveStoreId) setStoreId(String(effectiveStoreId));
  //         if (effectiveTableId) setTableId(String(effectiveTableId));
  //         if (effectiveOrderId) setOrderId(String(effectiveOrderId));
  //       }

  //       // optional: clean URL to remove OAuth garbage but keep friendly qs
  //       try {
  //         const keepQs = new URLSearchParams();
  //         if (effectiveStoreId) keepQs.set("storeId", effectiveStoreId);
  //         if (effectiveTableId) keepQs.set("tableId", effectiveTableId);
  //         const cleanUrl = `${window.location.origin}${window.location.pathname}?${keepQs.toString()}`;
  //         window.history.replaceState({}, "", cleanUrl);
  //       } catch (_) {}

  //     } catch (err) {
  //       console.error("initLiff or recovery error", err);
  //     } finally {
  //       if (mounted) setLoading(false);
  //     }
  //   };

  //   start();
  //   return () => { mounted = false; };
  //   // we intentionally depend on routeParams/searchParams so if route changes we re-run
  // }, [routeParams.storeId, routeParams.tableId, searchParams]);

  // 3) When storeId/tableId become available: join socket and fetch menu
  useEffect(() => {
    if (!storeId || !tableId) return;

    // join table room
    socket.emit('joinTable', { storeId, tableId });

    // fetch menu
    (async () => {
      useMenuStore.getState().setLoading(true);
      try {
        const res = await getStoreMenu(storeId);
        setMenu(res.data.menu || []);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      } finally {
        useMenuStore.getState().setLoading(false);
      }
    })();

    // cleanup on unmount or when storeId/tableId changes
    return () => {
      socket.emit('leaveTable', { storeId, tableId });
    };
  }, [storeId, tableId, setMenu]);

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

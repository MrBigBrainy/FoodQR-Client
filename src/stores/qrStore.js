// src/stores/qrStore.js
import { create } from "zustand";   
import { persist } from "zustand/middleware";

const useQrStore = create(persist(
  (set) => ({
    storeId: null,
    tableId: null,
    orderId: null,
    tableName: null,
    setQrParams: (payload) => set(() => ({ ...payload })),
    clearQrParams: () =>
      set(() => ({ storeId: null, tableId: null, orderId: null, tableName: null })),
  }),
  {
    name: "qr-params-storage", // key in storage
    getStorage: () => sessionStorage, // or localStorage if you want cross-session
  }
));

export default useQrStore;

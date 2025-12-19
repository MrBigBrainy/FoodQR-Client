import { create } from "zustand";

const useMenuStore = create((set, get) => ({
    menu: [],
    userOrder: [],
    totalOrder: [],
    eachUserOrder: [],
    storeInfo: null,
    loading: true,
    setMenu: (menu) => set({ menu }),
    setLoading: (loading) => set({ loading }),
    setUserOrder: (userOrder) => set({ userOrder }),
    setTotalOrder: (totalOrder) => set({ totalOrder }),
    setEachUserOrder: (eachUserOrder) => set({ eachUserOrder }),
    setStoreInfo: (storeInfo) => set({ storeInfo }),
}));

export default useMenuStore;
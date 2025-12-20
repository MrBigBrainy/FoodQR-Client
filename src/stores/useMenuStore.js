import { create } from "zustand";
import { persist } from "zustand/middleware";


const useMenuStore = create(persist((set, get) => ({
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
}), {
    name: 'menu-storage',
}));

export default useMenuStore;
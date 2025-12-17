import { create } from "zustand";

const useMenuStore = create((set, get) => ({
    menu: [],
    loading: true,
    setMenu: (menu) => set({ menu }),
    setLoading: (loading) => set({ loading }),
}));

export default useMenuStore;
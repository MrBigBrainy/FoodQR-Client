import { create } from "zustand";

const useMenuStore = create((set, get) => ({
    menu: [],
    setMenu: (menu) => set({ menu }),
}));

export default useMenuStore;
import { create } from "zustand";

const useCategoryStore = create((set, get) => ({
    category: [],
    setCategory: (category) => set({ category }),
}));

export default useCategoryStore;    
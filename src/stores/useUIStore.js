import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set) => ({
      hasSeenBillSplitInstruction: false,
      setHasSeenBillSplitInstruction: (value) => set({ hasSeenBillSplitInstruction: value }),
    }),
    {
      name: 'ui-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useUIStore;

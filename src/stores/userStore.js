import { create } from "zustand";
import { persist } from "zustand/middleware";


const useUserStore = create(persist((set, get) => ({
  lineId: null,
  pictureUrl: null,
  displayName: null,
  setUserStore: ({ userId, pictureUrl, displayName }) =>
    set(() => ({
      lineId: userId,
      pictureUrl,
      displayName,
    })),
}), {
  name: 'user-storage',
}));

export default useUserStore;
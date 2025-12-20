import { create } from "zustand";
import { persist } from "zustand/middleware";


const useUserStore = create(persist((set, get) => ({
  lineId: null,
  pictureUrl: null,
  displayName: null,
  setUserStore: ({ lineId, pictureUrl, displayName }) =>
    set(() => ({
      lineId,
      pictureUrl,
      displayName,
    })),
}), {
  name: 'user-storage',
}));

export default useUserStore;
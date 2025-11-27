import { create } from "zustand";

const useUserStore = create((set, get) => ({
  lineId: null,
  pictureUrl: null,
  displayName: null,
  setUserStore: ({ lineId, pictureUrl, displayName }) =>
    set(() => ({
      lineId,
      pictureUrl,
      displayName,
    })),
}));

export default useUserStore;
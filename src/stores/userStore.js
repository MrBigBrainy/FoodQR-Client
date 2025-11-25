import { create } from "zustand";

const useUserStore = create((set, get) => ({
    lineId: null,
    imageProfileUrl:null,
    displayName:null,
    setUserStore: ({ lineId, imageProfileUrl, displayName }) =>
    set(() => ({
      lineId,
      imageProfileUrl,
      displayName,
    })),
}));

export default useUserStore;
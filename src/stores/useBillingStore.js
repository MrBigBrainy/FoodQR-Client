import { create } from "zustand";

const useBillingStore = create((set, get) => ({
    qrUrl: "",
    chargeId: "",
    setBilling: ({ qrUrl, chargeId }) =>
        set(() => ({
            qrUrl,
            chargeId,
        })),
}));

export default useBillingStore;
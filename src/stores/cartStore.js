import { create } from "zustand";
const calculatesTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.amount, 0);
};
const calculatesTotalItems = (items) => {
  return items.reduce((total, item) => total + item.amount, 0);
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalCartItems: 0,
  discount: null,
  discountCode: "",
  discountType: "percent", 
  discountAmount: 0,
  discountMessage: null, 
};

const useCartStore = create((set, get) => ({
  ...defaultCartState,

  setDiscountCode: (code) => set({ discountCode: code }),
  setDiscountMessage: (message) => set({ discountMessage: message }),
  setDiscount: (discount) => set({ discount }),
  setDiscountType: (type) => set({ discountType: type }),
  setDiscountAmount: (amount) => set({ discountAmount: amount }),

  addItem: (item) =>
    set((state) => {
      const existingCartItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedItems;

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];

        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + item.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(item);
      }

      const updatedTotalAmount = calculatesTotalAmount(updatedItems);
      const updatedTotalItems = calculatesTotalItems(updatedItems);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalCartItems: updatedTotalItems,
      };
    }),
  decreaseItem: (id) =>
    set((state) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );
      const existingItem = state.items[existingCartItemIndex];

      if (!existingItem) return state;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      const updatedTotalAmount = calculatesTotalAmount(updatedItems);
      const updatedTotalItems = calculatesTotalItems(updatedItems);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalCartItems: updatedTotalItems,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return state;

      const updatedItems = state.items.filter((item) => item.id !== id);

      const updatedTotalAmount = calculatesTotalAmount(updatedItems);
      const updatedTotalItems = calculatesTotalItems(updatedItems);

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalCartItems: updatedTotalItems,
      };
    }),

  updateNote: (id, note) =>
    set((state) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );
      if (existingCartItemIndex === -1) return state;

      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        note: note,
      };

      const updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;

      return {
        items: updatedItems,
      };
    }),
  clearCart: () => set(defaultCartState),
}));

export default useCartStore;

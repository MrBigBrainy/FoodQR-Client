import React from "react";
import { create } from "zustand";

//ค่าเริ่มต้น
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const useCartStore = create((set, get) => ({
  ...defaultCartState,
  //เมื่อกดเพิ่มลงตะหร้า
  addItem: (item) =>
    set((state) => {
      const updatedTotalAmount = state.totalAmount + item.price * item.amount;

      const existingCartItem = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      const existingItem = state.items[existingCartItem];

      let updateItems;
      if (existingItem) {
        const updateItems = {
          ...existingItem,
          amount: existingItem.amount + item.amount,
        };
        updateItems = [...state.items];
        updateItems[existingCartItem] = updateItems;
      } else {
        updateItems = state.items.concat(item);
      }
      return {
        items: updateItems,
        totalAmount: updatedTotalAmount,
      };
    }),
  decreaseItem: (id) =>
    set((state) => {
      const existingCartItem = state.items.findIndex((item) => item.id === id);
      const existingItem = state.items[existingCartItem];

      if (!existingItem) return state;
      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        const updatedItems = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItem] = updatedItems;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }),
}));

export default useCartStore;

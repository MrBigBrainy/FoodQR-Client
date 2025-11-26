import React from "react";
import { create } from "zustand";

const calculatesTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.amount, 0);
};
const calculatesTotalItems = (items) => {
  return items.reduce((total, item) => total + item.amount, 0);
};

//ค่าเริ่มต้น
const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalCartItems: 0,
};

const useCartStore = create((set, get) => ({
  ...defaultCartState,
  //เมื่อกดเพิ่มลงตะหร้า
  addItem: (item) =>
    set((state) => {
      const existingCartItem = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      const existingItem = state.items[existingCartItem];

      let updateItems;
      if (existingItem) {
        let updateItems = {
          ...existingItem,
          amount: existingItem.amount + item.amount,
        };
        updateItems = [...state.items];
        updateItems[existingCartItem] = updateItem;
      } else {
        updateItems = state.items.concat(item);
      }

      const updatedTotalAmount = calculatesTotalAmount(updateItems);
      const updateTotalItems = calculatesTotalItems(updateItems);
      return {
        items: updateItems,
        totalAmount: updatedTotalAmount,
        totalCartItems: updateTotalItems,
      };
    }),
  decreaseItem: (id) =>
    set((state) => {
      const existingCartItem = state.items.findIndex((item) => item.id === id);
      const existingItem = state.items[existingCartItem];

      if (!existingItem) return state;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        let updatedItems = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItem] = updatedItem;
      }

      const updatedTotalAmount = calculatesTotalAmount(updateItems);
      const updateTotalItems = calculatesTotalItems(updateItems);
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalCartItems: updateTotalItems,
      };
    }),
}));

export default useCartStore;

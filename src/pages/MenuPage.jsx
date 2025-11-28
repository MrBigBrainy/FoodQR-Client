import React, { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import SearchBar from "../components/SearchBar";
import useMenuStore from "../stores/useMenuStore";
import { getStoreMenu } from "@/api/store.api";
import CartIcon from "@/components/CartIcon";

function MenuPage() {
  const menu = useMenuStore((state) => state.menu);
  const { setMenu } = useMenuStore.getState();

  useEffect(() => {
    async function getStoreMenuFunc() {
      const response = await getStoreMenu(1);
      console.log(response.data);
      setMenu(response.data.menu);
    }
    getStoreMenuFunc();
  }, []);

  useEffect(() => console.log(menu), [menu]);

  return (
    <div>
      <SearchBar />
      <div className="p-4 max-w-6xl mx-auto pb-36 pt-50">
        <h2 className="text-2xl font-bold mb-4">เมนูสำหรับทดสอบ</h2>
        <MenuList items={menu} />
      </div>
      <CartIcon />
    </div>
  );
}

export default MenuPage;

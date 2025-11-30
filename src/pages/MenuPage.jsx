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
      <SearchBar items={menu}/>
      <div className="p-4 max-w-6xl mx-auto pb-36 mt-[80px]">
        <MenuList items={menu} />
      </div>
      {/* <CartIcon /> */}
    </div>
  );
}

export default MenuPage;

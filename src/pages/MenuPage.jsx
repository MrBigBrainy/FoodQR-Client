import React, { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import SearchBar from "../components/SearchBar";

function MenuPage() {
  return
  <>

    <MenuList />;
  </>
// 💡 1. ข้อมูลจำลอง (Mock Data)
const DUMMY_MENU_DATA = [
  {
    id: "t1",
    name: "ข้าวผัดกะเพรา",
    price: 85.0,
    ImageUrl: "https://via.placeholder.com/150/ff5722/ffffff?text=Krapow",
  },
  {
    id: "t2",
    name: "ผัดไทยกุ้ง",
    price: 99.0,
    ImageUrl: "https://via.placeholder.com/150/4CAF50/ffffff?text=PadThai",
  },
  {
    id: "t3",
    name: "ชาเย็น",
    price: 45.0,
    ImageUrl: "https://via.placeholder.com/150/00BCD4/ffffff?text=ThaiTea",
  },
  {
    id: "t4",
    name: "ของหวานรวม",
    price: 120.0,
    ImageUrl: "https://via.placeholder.com/150/FFEB3B/000000?text=Dessert",
  },
  {
    id: "t5",
    name: "ของหวานรวม",
    price: 120.0,
    ImageUrl: "https://via.placeholder.com/150/FFEB3B/000000?text=Dessert",
  },
  {
    id: "t6",
    name: "ของหวานรวม",
    price: 120.0,
    ImageUrl: "https://via.placeholder.com/150/FFEB3B/000000?text=Dessert",
  },
  {
    id: "t7",
    name: "ของหวานรวม",
    price: 120.0,
    ImageUrl: "https://via.placeholder.com/150/FFEB3B/000000?text=Dessert",
  },
  {
    id: "t8",
    name: "ของหวานรวม",
    price: 120.0,
    ImageUrl: "https://via.placeholder.com/150/FFEB3B/000000?text=Dessert",
  },
];

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMenuItems(DUMMY_MENU_DATA);
    }, 500);
  }, []);

  return (
    <div>
      <SearchBar />
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">เมนูสำหรับทดสอบ</h2>
        <MenuList items={menuItems} />
      </div>
    </div>
  );
}

export default MenuPage;

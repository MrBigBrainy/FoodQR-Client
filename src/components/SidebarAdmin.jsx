import React from 'react';
import { NavLink } from 'react-router';
import {
  SettingsIcon,
  MenuIcon,
  StoreIcon,
  TableIcon,
  HouseIcon,
  KeyIcon,
  CreditCardIcon,
  Banknote,
  BanknoteIcon,
  Percent,
  PercentIcon,
  ChefHatIcon,
  LogOutIcon,
  CircleArrowLeft,
  CircleArrowLeftIcon,
} from 'lucide-react';

function SidebarAdmin() {
  const active = (isActive) => {
    return isActive
      ? 'flex items-center p-3 my-2 text-white bg-red-600 rounded-lg shadow-md'
      : 'flex items-center p-3 my-2 text-gray-600 hover:bg-gray-100 rounded-lg';
  };

  // ✅ ดึงค่าจาก localStorage
  const storeId = localStorage.getItem('storeId');
  const tableId = localStorage.getItem('tableId');
  const orderId = localStorage.getItem('orderId');
  return (
    <div className="flex">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">ระบบบริหารจัดการร้านอาหาร</p>
        </div>
        <nav className="grow p-4 flex flex-col">
          <div className="flex flex-col">
            <NavLink
              to={`/store/${storeId}/table/${tableId}/order/${orderId}`}
              className={({ isActive }) => active(isActive)}
            >
              {' '}
              <CircleArrowLeftIcon /> กลับหน้าเมนู
            </NavLink>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => active(isActive)}
            >
              <HouseIcon /> Dashbord
            </NavLink>
            <NavLink
              to="/admin/kitchen"
              className={({ isActive }) => active(isActive)}
            >
              <ChefHatIcon /> จัดการครัว
            </NavLink>
            <NavLink
              to="/admin/table"
              className={({ isActive }) => active(isActive)}
            >
              <TableIcon /> จัดการโต๊ะ
            </NavLink>
            <NavLink
              to="/admin/addmenu"
              className={({ isActive }) => active(isActive)}
            >
              <MenuIcon /> จัดการเมนู
            </NavLink>
            <NavLink
              to="/admin/billing"
              className={({ isActive }) => active(isActive)}
            >
              <BanknoteIcon /> จัดการการบิล
            </NavLink>
            <NavLink
              to="/admin/discount"
              className={({ isActive }) => active(isActive)}
            >
              <PercentIcon /> จัดการส่วนลด
            </NavLink>
            <NavLink
              to="/admin/ตั้งค่าร้าน"
              className={({ isActive }) => active(isActive)}
            >
              <StoreIcon /> ตั้งค่าร้าน
            </NavLink>
          </div>
          <div className="mt-auto pt-4 border-t">
            <NavLink
              to="/admin/logout"
              className={({ isActive }) => active(isActive)}
            >
              {' '}
              <LogOutIcon /> ออกจากระบบ
            </NavLink>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default SidebarAdmin;

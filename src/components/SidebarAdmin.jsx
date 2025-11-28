import React from 'react'
import { NavLink } from 'react-router'

function SidebarAdmin() {
    const active = (isActive) => {
        return isActive ? "flex items-center p-3 my-2 text-white bg-red-600 rounded-lg shadow-md" : "flex items-center p-3 my-2 text-gray-600 hover:bg-gray-100 rounded-lg"
    }
    return (
        <div className='flex'>
            <aside className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">ระบบบริหารจัดการร้านอาหาร</p>
                </div>
                <nav className="grow p-4">
                    <NavLink to="/admin" end className={({ isActive }) => active(isActive)} >Dashbord</NavLink>
                    <NavLink to="/admin/addmenu" className={({ isActive }) => active(isActive)}>จัดการเมนู</NavLink>
                    <NavLink to="/admin/table" className={({ isActive }) => active(isActive)}>table</NavLink>
                    <NavLink to="/admin/login" className={({ isActive }) => active(isActive)}>login</NavLink>
                </nav>
            </aside >
        </div >
    )
}

export default SidebarAdmin

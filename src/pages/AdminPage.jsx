import React from 'react'
import SidebarAdmin from '../components/SidebarAdmin'
import { Outlet } from 'react-router'

function AdminPage() {
    return (
        <div>
            <div className='flex bg-gray-50 min-h-screen'>
                <SidebarAdmin />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminPage

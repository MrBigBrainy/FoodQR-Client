import React from 'react'
import SidebarAdmin from '../components/SidebarAdmin'
import { Outlet } from 'react-router'

function AdminPage() {
    return (
        <div>
            <div className='bg-gray-50 min-h-screen'>
                <SidebarAdmin />
                <div className='ml-72'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminPage

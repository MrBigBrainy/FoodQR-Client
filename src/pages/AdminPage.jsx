import React from 'react'
import SidebarAdmin from '../components/SidebarAdmin'
import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { socket } from '@/lib/socket'
import { useParams } from 'react-router'

function AdminPage() {
    const { storeId } = useParams();
    useEffect(() => {
        console.log('adminpage storeId', storeId)
        if (!storeId) return
        socket.on("connect", () => {
            console.log('adminpage connect')
            socket.emit("joinStore", {storeId});
        });

        return () => {
            socket.off("connect");
  };
    }, [storeId])
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

import React from 'react'

function SidebarAdmin() {
    return (
        <div className='flex'>
            <aside className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500">ระบบบริหารจัดการร้านอาหาร</p>
                </div>
                <nav className="grow p-4">
                    <a
                        href="#"
                        className="flex items-center p-3 my-2 text-white bg-red-600 rounded-lg shadow-md"
                    >
                        <span className="mr-3 text-lg">
                            <i className="fas fa-chart-line"></i> {/* Icon: Dashboard */}
                        </span>
                        <span className="font-semibold">Dashboard</span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center p-3 my-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <span className="mr-3 text-lg">
                            <i className="fas fa-list"></i> {/* Icon: เมนู */}
                        </span>
                        <span>จัดการเมนู</span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center p-3 my-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <span className="mr-3 text-lg">
                            <i className="fas fa-cog"></i> {/* Icon: ตั้งค่า */}
                        </span>
                        <span>ตั้งค่า</span>
                    </a>
                </nav>
            </aside>
        </div>
    )
}

export default SidebarAdmin

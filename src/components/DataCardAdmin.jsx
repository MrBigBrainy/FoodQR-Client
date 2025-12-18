import React from 'react'

function DataCardAdmin(data) {
    const { title, count } = data
    return (
        // รับค่าจาก AdminPage
        <div className='card bg-white p-6 rounded-xl shadow-lg items-center justify-between flex-row'>
            {/* ด้านซ้ายของ card */}
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{count}</p>
            </div>
        </div>
    )
}

export default DataCardAdmin

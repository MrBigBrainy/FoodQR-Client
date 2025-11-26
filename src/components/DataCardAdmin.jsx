import React from 'react'

function DataCardAdmin(data) {
    const { title, count, percent } = data
    return (
        // รับค่าจาก AdminPage
        <div className='card bg-white p-6 rounded-xl shadow-lg items-center justify-between flex-row'>
            {/* ด้านซ้ายของ card */}
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{count}</p>
            </div>

            {/* ด้านขวาของ card */}
            <div >
                <div className="p-3 rounded-full bg-green-100 text-green-600 mb-1">
                    <span className="text-xl">
                        <i className="fas fa-dollar-sign">
                            <span className="text-sm text-green-600">{percent}</span>
                        </i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DataCardAdmin

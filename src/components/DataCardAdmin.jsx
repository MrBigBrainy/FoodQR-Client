import React from 'react'
import { motion } from 'motion/react'

function DataCardAdmin({ title, count, icon: Icon, color = "blue" }) {
    const colorVariants = {
        red: "bg-red-50 text-red-600",
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300'
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{count}</h3>
                </div>
                {Icon && (
                    <div className={`p-3 rounded-xl ${colorVariants[color] || colorVariants.blue}`}>
                        <Icon size={24} />
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default DataCardAdmin

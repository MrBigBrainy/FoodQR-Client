import React from 'react'
import { motion } from 'motion/react'

function DataCardAdmin({ title, count, icon: Icon }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className='p-5 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md'
        >
            <div className="flex items-center justify-between mb-2">
                {Icon && (
                    <div className="p-2.5 rounded-xl bg-gray-100">
                        <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                )}
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
            </div>
        </motion.div>
    )
}

export default DataCardAdmin

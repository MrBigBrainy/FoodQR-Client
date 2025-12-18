import React from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);

function DoughnutChart({ data, title }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    },
                    color: '#4b5563'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 10,
                boxPadding: 4,
                callbacks: {
                    label: function(context) {
                        return ` ${context.label}`;
                    }
                }
            }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full flex flex-col"
        >
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Users size={20} />
                </div>
                {title}
            </h3>
            <div className="flex-1 min-h-[300px] w-full relative flex items-center justify-center">
                <Doughnut data={data} options={options} />
                {/* Center Text (Optional) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-gray-400 text-xs font-medium">ทั้งหมด</p>
                        <p className="text-2xl font-bold text-gray-800">100%</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default DoughnutChart

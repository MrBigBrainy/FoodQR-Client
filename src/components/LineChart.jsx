import React from 'react'
import { Line } from 'react-chartjs-2'
import { motion } from 'motion/react'
import { Clock } from 'lucide-react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
    Filler
);

function LineChart({ data, title }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 10,
                boxPadding: 4,
                usePointStyle: true,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f3f4f6',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9ca3af',
                    font: {
                        size: 11
                    },
                    callback: function(value) {
                        return '฿' + value;
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full flex flex-col"
        >
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                    <Clock size={20} />
                </div>
                {title}
            </h3>
            <div className="flex-1 min-h-[300px] w-full">
                <Line data={data} options={options} />
            </div>
        </motion.div>
    )
}

export default LineChart

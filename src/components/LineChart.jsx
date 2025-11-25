import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// ทำเพื่อให้ใช้งาน react-chartjs-2
ChartJS.register(
    LineElement,     // สำหรับกราฟเส้น
    CategoryScale,   // แกน X (หมวดหมู่)
    LinearScale,     // แกน Y (ตัวเลข)
    PointElement,    // จุดบนกราฟเส้น
    Tooltip,         // กล่อง tooltip ตอน hover
    Legend,           // แสดงคำอธิบาย dataset
    Title
);

function LineChart({ data, title }) {
    const options = {
        // ... กำหนด options เช่น scale, legend, tooltip
        responsive: true,
        scales: {
            y: {
                // ... y-axis configuration (max 10000)
                beginAtZero: true,
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2 text-red-500">
                    <i className="far fa-clock"></i>
                </span>
                {title}
            </h3>
            <div className="h-80"> {/* กำหนดความสูงเพื่อให้กราฟแสดงผลได้ดี */}
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default LineChart

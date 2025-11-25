import React from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from 'react-chartjs-2';

// ทำเพื่อให้ใช้งาน react-chartjs-2
ChartJS.register(
    Tooltip,         // กล่อง tooltip ตอน hover
    Legend,           // แสดงคำอธิบาย dataset
    ArcElement
);

function DoughnutChart({ data, title }) {
    const options = {
        // ... กำหนด options เช่น legend (ให้แสดง label ที่ด้านข้าง)
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // ตัวเลือกสำหรับแสดง Legend
                labels: {
                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const percent = data.datasets[0].data[i];
                                const backgroundColor = data.datasets[0].backgroundColor[i];
                                return {
                                    text: `${label}`, // แสดง label ตามที่มี %
                                    fillStyle: backgroundColor,
                                    strokeStyle: backgroundColor,
                                    lineWidth: 1,
                                    hidden: false,
                                    index: i,
                                };
                            });
                        }
                        return [];
                    }
                }
            }
        }
    };
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2 text-red-500">
                    <i className="fas fa-users"></i>
                </span>
                {title}
            </h3>
            <div className="flex justify-center items-center h-full ">
                {/* การใช้ flex justify-center, items-center และ h-full จะช่วยจัดให้ Doughnut chart อยู่ตรงกลาง */}
                {/* ปรับขนาดวงกลม */}
                <div className="w-full max-h-full  p-4 flex items-center justify-center ">
                    <Doughnut data={data} options={options} />
                    {/*  */}
                </div>
            </div>
        </div>
    )
}

export default DoughnutChart

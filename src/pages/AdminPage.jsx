import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut, Line, } from 'react-chartjs-2';

// ✅ ลงทะเบียน element ทั้งหมดที่ Line + Doughnut ต้องใช้
ChartJS.register(
    LineElement,     // สำหรับกราฟเส้น
    ArcElement,      // สำหรับกราฟโดนัท
    CategoryScale,   // แกน X (หมวดหมู่)
    LinearScale,     // แกน Y (ตัวเลข)
    PointElement,    // จุดบนกราฟเส้น
    Tooltip,         // กล่อง tooltip ตอน hover
    Legend           // แสดงคำอธิบาย dataset
);


// ข้อมูลตัวอย่างสำหรับ Chart.js (ต้องปรับให้เหมาะสมกับการใช้งานจริง)
const hourlySalesData = {
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    datasets: [
        {
            label: 'ยอดขายรายชั่วโมง',
            data: [2500, 5000, 7500, 9000, 7800, 5500, 3000, 3200, 4500, 8000, 9500, 6800], // ตัวเลขตามกราฟ
            fill: false,
            backgroundColor: 'rgb(239, 68, 68)', // สีแดงตามภาพ
            borderColor: 'rgb(239, 68, 68)',
            tension: 0.4,
            pointRadius: 4,
        },
    ],
};

const customerTypeData = {
    labels: ['คู่ 41%', 'กลุ่มเล็ก (3-4) 28%', 'กลุ่มใหญ่ (5+) 12%', 'มาเดี่ยว 18%'],
    datasets: [
        {
            data: [41, 28, 12, 18], // สัดส่วนตามภาพ
            backgroundColor: [
                'rgb(59, 130, 246)', // น้ำเงิน
                'rgb(249, 115, 22)', // ส้ม
                'rgb(168, 85, 247)', // ม่วง
                'rgb(239, 68, 68)', // แดง
            ],
            hoverOffset: 4,
        },
    ],
};

const optionsHourlySales = {
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

const optionsCustomerType = {
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


const AdminDashboard = () => {
    // ... ส่วนของ state และ logic

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* 1. Sidebar */}
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

            {/* 2. Main Content Area */}
            <main className="flex-1 p-6">
                {/* Header */}
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>
                <p className="text-gray-500 mb-8">ภาพรวมธุรกิจของคุณ</p>

                {/* 3. Key Metrics Cards (Top Row) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Card 1: ยอดขายวันนี้ */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">ยอดขายวันนี้</p>
                            <p className="text-3xl font-bold text-gray-800">฿84,520</p>
                        </div>
                        <div className="text-right">
                            <div className="p-3 rounded-full bg-green-100 text-green-600 mb-1">
                                <span className="text-xl">
                                    <i className="fas fa-dollar-sign"></i>
                                </span>
                            </div>
                            <span className="text-sm text-green-600">-12.5%</span>
                        </div>
                    </div>

                    {/* Card 2: จำนวนออเดอร์ */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">จำนวนออเดอร์</p>
                            <p className="text-3xl font-bold text-gray-800">248</p>
                        </div>
                        <div className="text-right">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-1">
                                <span className="text-xl">
                                    <i className="fas fa-file-alt"></i>
                                </span>
                            </div>
                            <span className="text-sm text-red-600">-8.2%</span>
                        </div>
                    </div>

                    {/* Card 3: ลูกค้าทั้งหมด */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">ลูกค้าทั้งหมด</p>
                            <p className="text-3xl font-bold text-gray-800">685</p>
                        </div>
                        <div className="text-right">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-1">
                                <span className="text-xl">
                                    <i className="fas fa-user-friends"></i>
                                </span>
                            </div>
                            <span className="text-sm text-green-600">+15.3%</span>
                        </div>
                    </div>

                    {/* Card 4: โต๊ะที่ยังว่าง */}
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">โต๊ะที่ยังว่าง</p>
                            <p className="text-3xl font-bold text-gray-800">8/12</p>
                        </div>
                        <div className="text-right">
                            <div className="p-3 rounded-full bg-orange-100 text-orange-600 mb-1">
                                <span className="text-xl">
                                    <i className="fas fa-utensils"></i>
                                </span>
                            </div>
                            <span className="text-sm text-green-600">66%</span>
                        </div>
                    </div>
                </div>

                {/* 4. Chart Section (Bottom Row) */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {/* Line Chart: ยอดขายรายชั่วโมง (Col 1-4) */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2 text-red-500">
                                <i className="far fa-clock"></i>
                            </span>
                            ยอดขายรายชั่วโมง
                        </h3>
                        <div className="h-80"> {/* กำหนดความสูงเพื่อให้กราฟแสดงผลได้ดี */}
                            <Line data={hourlySalesData} options={optionsHourlySales} />
                            {/*  */}
                        </div>
                    </div>

                    {/* Doughnut Chart: ประเภทลูกค้า (Col 5-7) */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2 text-red-500">
                                <i className="fas fa-users"></i>
                            </span>
                            ประเภทลูกค้า
                        </h3>
                        <div className="flex justify-center items-center h-80">
                            {/* การใช้ flex justify-center, items-center และ h-full จะช่วยจัดให้ Doughnut chart อยู่ตรงกลาง */}
                            <div className="w-full h-full p-4 flex items-center justify-center">
                                <Doughnut data={customerTypeData} options={optionsCustomerType} />
                                {/*  */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
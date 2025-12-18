import React, { useEffect, useState } from 'react';
import DataCardAdmin from '../components/DataCardAdmin';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import { getAllTables, getSaleToday } from '@/api/admin.api';
import { io } from 'socket.io-client';

// socket เลือกรับจาก backend
// const socket = io("https://foodqr-server.onrender.com");
const socket = io("http://localhost:3000");

// ข้อมูลกราฟเส้น
const lineData = {
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

// ข้อมูลกราฟโดนัด
const doughnutData = {
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

// ดึงข้อมูลจาก backend sale to day



const AdminDashboard = () => {
    // ดึงข้อมูลจาก backend sale to day
    const [saleToday, setSaleToday] = useState(0)
    const [orderToday, setOrderToday] = useState(0)
    const [customerToday, setCustomerToday] = useState(0)
    const [allTable, setAllTable] = useState(0)
    const [availableTable, setAvailableTable] = useState(0)

    useEffect(() => {
        const getDataTodays = async () => {
            try {
                const response = await getSaleToday();
                const table = await getAllTables()
                // const availableTable = table.data.filter((each) => each.status === "available");

            } catch (err) {
                console.error("❌ ดึงข้อมูลไม่สำเร็จ:", err);
            }
        };
        getDataTodays();

        socket.on("updateSale", (data) => {
            console.log('data1', data)
            setSaleToday(data.saleToday);
            setOrderToday(data.sumOrder)
            setCustomerToday(data.sumCustomer)
        });
        socket.on("updateTable", (data) => {
            console.log('data2', data)
            setAllTable(data.sumTable)
            setAvailableTable(data.availableTable)
        });
        return () => {
            socket.off("updateSale");
        };
    }, []);


    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* 2. Main Content Area */}
            <main className="flex-1 p-6">
                {/* Header */}
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>
                <p className="text-gray-500 mb-8">ภาพรวมธุรกิจของคุณ</p>

                {/* 3. Key Metrics Cards (Top Row) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Card 1: ยอดขายวันนี้ */}

                    <DataCardAdmin title={"ยอดขายวันนี้"} count={`฿${saleToday}`} />
                    <DataCardAdmin title={"จำนวนออเดอร์"} count={`${orderToday}`} />
                    <DataCardAdmin title={"ลูกค้าทั้งหมด"} count={`${customerToday}`} />
                    <DataCardAdmin title={"โต๊ะที่ว่าง"} count={`${availableTable}/${allTable}`} />
                </div>

                {/* 4. Chart Section (Bottom Row) */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                    {/* chart กราฟเส้น */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg w-full">
                        <LineChart data={lineData} title={"ยอดขายรายชั่วโมง"} />
                    </div>


                    {/* Doughnut Chart: ประเภทลูกค้า (Col 5-7) */}
                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg w-full">
                        <DoughnutChart data={doughnutData} title={"ยอดผู้ใช้บริการ"} />
                    </div>

                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg w-full">
                        <DoughnutChart data={doughnutData} title={"ยอดผู้ใช้บริการ"} />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
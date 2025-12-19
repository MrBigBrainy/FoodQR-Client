import React, { useEffect, useState } from 'react';
import DataCardAdmin from '../components/DataCardAdmin';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DoughnutChart';
import { getAllTables, getSaleToday } from '@/api/admin.api';
import { io } from 'socket.io-client';
import { motion } from 'motion/react';
import { Coins, ShoppingBag, Users, LayoutGrid } from 'lucide-react';
import RedWineLoader from '@/components/loader/RedWineLoader';

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
            fill: true,
            backgroundColor: 'rgba(239, 68, 68, 0.1)', // สีแดงจางๆ
            borderColor: 'rgb(239, 68, 68)',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgb(239, 68, 68)',
            pointBorderWidth: 2,
        },
    ],
};

// ข้อมูลกราฟโดนัด
const doughnutData = {
    labels: ['คู่', 'กลุ่มเล็ก (3-4)', 'กลุ่มใหญ่ (5+)', 'มาเดี่ยว'],
    datasets: [
        {
            data: [41, 28, 12, 18], // สัดส่วนตามภาพ
            backgroundColor: [
                '#EF4444', // แดง (41%)
                '#9CA3AF', // เทา (28%)
                '#D1D5DB', // เทาอ่อน (12%)
                '#E5E7EB', // เทาอ่อนมาก (18%)
            ],
            borderWidth: 0,
            hoverOffset: 4,
        },
    ],
};

const AdminDashboard = () => {
    // ดึงข้อมูลจาก backend sale to day
    const [saleToday, setSaleToday] = useState(0)
    const [orderToday, setOrderToday] = useState(0)
    const [customerToday, setCustomerToday] = useState(0)
    const [allTable, setAllTable] = useState(0)
    const [availableTable, setAvailableTable] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDataTodays = async () => {
            try {
                const response = await getSaleToday();
                const table = await getAllTables()
                // const availableTable = table.data.filter((each) => each.status === "available");

            } catch (err) {
                console.error("❌ ดึงข้อมูลไม่สำเร็จ:", err);
            } finally {
                setIsLoading(false);
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Main Content Area */}
            <motion.main 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 p-6 max-w-7xl mx-auto"
            >
                                icon={Coins}
                                color="red"
                            />
                            <DataCardAdmin 
                                title="จำนวนออเดอร์" 
                                count={orderToday} 
                                icon={ShoppingBag}
                                color="orange"
                            />
                            <DataCardAdmin 
                                title="ลูกค้าทั้งหมด" 
                                count={customerToday} 
                                icon={Users}
                                color="blue"
                            />
                            <DataCardAdmin 
                                title="โต๊ะที่ว่าง" 
                                count={`${availableTable}/${allTable}`} 
                                icon={LayoutGrid}
                                color="green"
                            />
                        </motion.div>

                        {/* Chart Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Line Chart */}
                            <motion.div 
                                variants={itemVariants}
                                className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                            >
                                <LineChart data={lineData} title="ยอดขายรายชั่วโมง" />
                            </motion.div>

                            {/* Doughnut Chart */}
                            <motion.div 
                                variants={itemVariants}
                                className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                            >
                                <DoughnutChart data={doughnutData} title="ประเภทลูกค้า" />
                            </motion.div>
                        </div>
                    </>
                )}
            </motion.main>
        </div>
    );
};

export default AdminDashboard;
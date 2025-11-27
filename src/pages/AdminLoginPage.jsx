import React, { useState } from 'react';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // ฟังก์ชันสำหรับจัดการการล็อกอิน (ในความเป็นจริงจะมีการเรียก API)
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });
        // เพิ่ม logic การตรวจสอบสิทธิ์ที่นี่
    };

    // ฟังก์ชันสำหรับ Quick Login (Demo)
    const handleQuickLogin = (userRole) => {
        let demoEmail = '';
        let demoPassword = '';

        if (userRole === 'admin') {
            demoEmail = 'admin@nansushi.com'; // สมมติ email
            demoPassword = 'admin123';
        } else if (userRole === 'manager') {
            demoEmail = 'manager@nansushi.com'; // สมมติ email
            demoPassword = 'manager123';
        } else if (userRole === 'chef') {
            demoEmail = 'chef@nansushi.com'; // สมมติ email
            demoPassword = 'chef123';
        }

        setEmail(demoEmail);
        setPassword(demoPassword);
        console.log(`Demo login as ${userRole}: ${demoEmail} / ${demoPassword}`);
    };


    return (
        // พื้นหลังสีแดงเต็มจอ
        <div className="min-h-screen bg-[#dc2526] flex flex-col justify-center items-center p-4">
            {/* Header / Logo Section */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl mb-2">
                    {/* ไอคอนโลโก้ซูชิ (ใช้ Font Awesome หรือ Icon อื่นๆ แทน) */}
                    <span className="text-red-600 text-3xl">
                        <i className="fas fa-fish"></i> {/*  */}
                    </span>
                </div>
                <h1 className="text-4xl font-light text-white mb-1">Admin Dashboard</h1>
                <p className="text-white text-sm opacity-80">Nanino Sushi Restaurant System</p>
            </div>

            {/* Login Card Container */}
            <div className="w-full max-w-md">
                {/* Quick Login Section (Demo) */}
                <div className="flex justify-around mb-6 space-x-4">
                    <p className="text-white text-sm absolute -top-4 left-0">Quick Login (Demo)</p>
                    <p className="text-white text-sm absolute -top-4 right-0">(ทดลอง)</p>

                    {/* Quick Login Button: Admin */}
                    <button
                        onClick={() => handleQuickLogin('admin')}
                        className="flex flex-col items-center justify-center p-4 w-1/3 bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg hover:bg-opacity-50 transition duration-200 border border-white border-opacity-30"
                    >
                        <span className="text-2xl text-white mb-1">
                            <i className="fas fa-user-tie"></i>
                        </span>
                        <span className="text-sm text-black font-semibold">admin</span>
                        <span className="text-xs text-black opacity-75">ผู้ดูแลระบบ</span>
                    </button>

                    {/* Quick Login Button: Manager */}
                    <button
                        onClick={() => handleQuickLogin('manager')}
                        className="flex flex-col items-center justify-center p-4 w-1/3 bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg hover:bg-opacity-50 transition duration-200 border border-white border-opacity-30"
                    >
                        <span className="text-2xl text-white mb-1">
                            <i className="fas fa-user-alt"></i>
                        </span>
                        <span className="text-sm text-black font-semibold">manager</span>
                        <span className="text-xs text-black opacity-75">ผู้จัดการ</span>
                    </button>

                    {/* Quick Login Button: Chef */}
                    <button
                        onClick={() => handleQuickLogin('chef')}
                        className="flex flex-col items-center justify-center p-4 w-1/3 bg-white bg-30 rounded-xl shadow-lg hover:bg-opacity-50 transition duration-200 border border-white border-opacity-30"
                    >
                        <span className="text-2xl text-white mb-1">
                            <i className="fas fa-utensils"></i>
                        </span>
                        <span className="text-sm text-black font-semibold">chef</span>
                        <span className="text-xs text-black opacity-75">หัวหน้าครัว</span>
                    </button>
                </div>

                {/* Login Form Card */}
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <form onSubmit={handleLogin}>
                        {/* Input: ชื่อผู้ใช้ (Email) */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                                ชื่อผู้ใช้
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i className="fas fa-user"></i>
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400"
                                    placeholder="asdf@gmail.com---" // Placeholder ตามภาพ
                                    required
                                />
                            </div>
                        </div>

                        {/* Input: รหัสผ่าน */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                                รหัสผ่าน
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800"
                                    required
                                />
                                {/* ไอคอนแสดง/ซ่อนรหัสผ่าน */}
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                                    <i className="fas fa-eye-slash"></i>
                                </span>
                            </div>
                        </div>

                        {/* Checkbox และ ลืมรหัสผ่าน */}
                        <div className="flex items-center justify-between mb-8 text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-gray-700">
                                    จำฉันไว้?
                                </label>
                            </div>
                            <a href="#" className="font-medium text-red-600 hover:text-red-700">
                                ลืมรหัสผ่าน?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-200 shadow-lg"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </form>

                    {/* Quick Info Box (Demo Credentials) */}
                    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded-lg text-sm">
                        <p className="font-semibold mb-1">ℹ️ ข้อมูลสำหรับทดลองระบบ:</p>
                        <p>ผู้ดูแลระบบ: <span className="font-mono text-red-600">admin</span> / <span className="font-mono text-red-600">admin123</span></p>
                        <p>ผู้จัดการ: <span className="font-mono text-red-600">manager</span> / <span className="font-mono text-red-600">manager123</span></p>
                        <p>หัวหน้าครัว: <span className="font-mono text-red-600">chef</span> / <span className="font-mono text-red-600">chef123</span></p>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-sm text-white opacity-75">
                © 2024 Nanino Sushi. All rights reserved.
            </footer>
        </div>
    );
};

export default AdminLoginPage;
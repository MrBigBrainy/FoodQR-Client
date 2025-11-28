import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import RoleButton from '@/components/RoleButton';
import React, { useState } from 'react';

const AdminLoginPage = () => {
    const [activeTab, setActiveTab] = useState("login")
    const activeStyle = 'bg-white text-red-600 shadow-md ring-1 ring-red-400';
    const inactiveStyle = 'bg-transparent text-gray-600';
    return (
        <div className="min-h-screen bg-[#dc2526] flex flex-col justify-center items-center p-4">

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl mb-2">

                    <span className="text-red-600 text-3xl">
                        <i className="fas fa-fish"></i> {/*  */}
                    </span>
                </div>
                <h1 className="text-4xl font-light text-white mb-1">Admin Dashboard</h1>
                {/* ต้องดึงข้อมูลชื่อของร้าน */}
                <p className="text-white text-sm opacity-80">Nanino Sushi Restaurant System</p>
            </div>

            {/* Login Card Container */}
            <div className="w-full max-w-md">
                {/* Login Form Card */}
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <div className="flex p-1 bg-gray-100 rounded-xl max-w-sm mx-auto shadow-inner">
                        {/* ปุ่ม "เข้าสู่ระบบ" */}
                        <button onClick={() => setActiveTab('login')}
                            className={` w-1/2 p-3 text-center rounded-xl font-semibold transition-all duration-300 ease-in-out ${activeTab === 'login' ? activeStyle : inactiveStyle}`}>
                            เข้าสู่ระบบ
                        </button>

                        {/* ปุ่ม "สมัครสมาชิก" */}
                        <button onClick={() => setActiveTab('register')}
                            className={`w-1/2 p-3 text-center rounded-xl font-semibold transition-all duration-300 ease-in-out ${activeTab === 'register' ? activeStyle : inactiveStyle}`}>
                            สมัครสมาชิก
                        </button>
                    </div>
                    {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                    {/* <LoginForm /> */}
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-sm text-white opacity-75">
                © 2024 Nanino Sushi. All rights reserved.
            </footer>
        </div >
    );
};

export default AdminLoginPage;
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee } from 'lucide-react';

const AdminLoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-orange-500">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-red-900/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4 rotate-3 hover:rotate-6 transition-transform duration-300"
          >
            <Coffee className="text-red-600 w-10 h-10" strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
            Admin Portal
          </h1>
          <p className="text-red-100 text-sm font-medium tracking-wide uppercase opacity-90">
            FoodQR Restaurant System
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Tab Switcher */}
          <div className="relative flex p-1.5 bg-gray-100/80 rounded-xl mb-8 shadow-inner">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${
                activeTab === 'login' ? 'left-1.5' : 'left-[calc(50%+3px)]'
              }`}
            />
            <button
              onClick={() => setActiveTab('login')}
              className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                activeTab === 'login'
                  ? 'text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                activeTab === 'register'
                  ? 'text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              สมัครสมาชิก
            </button>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegisterForm setActiveTab={setActiveTab} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="mt-8 text-center text-white/60 text-xs font-medium">
          © 2024 FoodQR. All rights reserved.
        </footer>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;

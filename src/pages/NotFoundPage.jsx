import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Home, Coffee, LogIn } from 'lucide-react';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/menu-qr');
  };

  const handleGoLogin = () => {
    navigate('/login');
  };

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
        className="w-full max-w-md z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-2xl mb-6 rotate-3 hover:rotate-6 transition-transform duration-300"
        >
          <Coffee className="text-red-600 w-12 h-12" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-md"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-md"
        >
          หน้าที่คุณกำลังมองหาไม่พบ
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-red-100 text-sm font-medium mb-8 opacity-90"
        >
          หน้านี้อาจถูกลบหรือย้ายไปที่อื่นแล้ว
        </motion.p>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
        >
          <div className="space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-700 hover:to-orange-600"
            >
              <Home className="w-5 h-5" />
              <span>กลับไปหน้าหลัก</span>
            </button>
            <button
              onClick={handleGoLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-red-600 border-2 border-red-600 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-red-50"
            >
              <LogIn className="w-5 h-5" />
              <span>กลับไปหน้า Login</span>
            </button>
          </div>
        </motion.div>

        <footer className="mt-8 text-center text-white/60 text-xs font-medium">
          © 2024 FoodQR. All rights reserved.
        </footer>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;


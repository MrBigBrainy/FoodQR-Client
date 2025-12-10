import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Lock, Eye, EyeOff, Phone, Key, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { registerAdmin } from '@/api/auth.api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { registerSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

function RegisterForm({ setActiveTab }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      userName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      adminCode: '',
      role: 'admin', 
      storeId: 1,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showKeyCode, setShowKeyCode] = useState(false);

  const onRegister = async (data) => {
    try {
      console.log(data);

      await registerAdmin(data);

      toast.success('สมัครสมาชิกสำเร็จ!');
      setActiveTab('login');
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error?.response?.status;

        if (status === 409) {
          return toast.error('มีผู้ใช้นี้อยู่แล้ว');
        }

        const msg =
          error?.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
        return toast.error(msg);
      }

      toast.error('เกิดข้อผิดพลาดที่ไม่คาดคิด');
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            ชื่อ-นามสกุล
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              <User size={20} />
            </div>
            <input
              {...register('fullName', { required: true })}
              placeholder="ชื่อ-นามสกุล"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm ml-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            ชื่อผู้ใช้
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              <UserPlus size={20} />
            </div>
            <input
              {...register('userName', { required: true })}
              placeholder="ชื่อผู้ใช้"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>
          {errors.userName && (
            <p className="text-red-500 text-sm ml-1">
              {errors.userName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            เบอร์โทรศัพท์
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              <Phone size={20} />
            </div>
            <input
              {...register('phoneNumber', { required: true })}
              placeholder="เบอร์โทรศัพท์"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm ml-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            รหัสผ่าน
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              <Lock size={20} />
            </div>
            <input
              {...register('password', { required: true })}
              type={showPassword ? 'text' : 'password'}
              placeholder="รหัสผ่าน"
              className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            ยืนยันรหัสผ่าน
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              <Lock size={20} />
            </div>
            <input
              {...register('confirmPassword', { required: true })}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="ยืนยันรหัสผ่าน"
              className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm ml-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* KeyCode */}
        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            รหัสสมัคร Admin
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
              <Key size={20} />
            </div>
            <input
              {...register('adminCode', { required: true })}
              type={showKeyCode ? 'text' : 'password'}
              placeholder="รหัสสมัคร Admin"
              className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium"
            />
            <button
              type="button"
              onClick={() => setShowKeyCode(!showKeyCode)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showKeyCode ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.adminCode && (
            <p className="text-red-500 text-sm ml-1">
              {errors.adminCode.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-500 text-white py-3.5 rounded-xl 
             font-bold text-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 
             shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 
             disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>กำลังโหลด...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UserPlus size={20} />
              <span>สมัครสมาชิก</span>
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default RegisterForm;

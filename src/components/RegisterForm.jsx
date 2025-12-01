import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, Lock, Eye, EyeOff, Phone, Key, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

function RegisterForm() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            phone: "",
            KeyCode: "",
            role: "admin" // Default or handled elsewhere
        },
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showKeyCode, setShowKeyCode] = useState(false);

    const onRegister = (data) => {
        console.log(data)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                    <label className="block text-gray-700 text-sm font-semibold ml-1">ชื่อ-นามสกุล</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <User size={20} />
                        </div>
                        <input {...register("name", { required: true })} placeholder="Full Name" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium" />
                    </div>
                </div>

                {/* Username */}
                <div className="space-y-1">
                    <label className="block text-gray-700 text-sm font-semibold ml-1">ชื่อผู้ใช้</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <UserPlus size={20} />
                        </div>
                        <input {...register("username", { required: true })} placeholder="Username" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium" />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <label className="block text-gray-700 text-sm font-semibold ml-1">เบอร์โทรศัพท์</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <Phone size={20} />
                        </div>
                        <input {...register("phone", { required: true })} placeholder="Phone Number" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium" />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label className="block text-gray-700 text-sm font-semibold ml-1">รหัสผ่าน</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <Lock size={20} />
                        </div>
                        <input 
                            {...register("password", { required: true })} 
                            type={showPassword ? "text" : "password"}
                            placeholder="Password" 
                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                    <label className="block text-gray-700 text-sm font-semibold ml-1">ยืนยันรหัสผ่าน</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <Lock size={20} />
                        </div>
                        <input 
                            {...register("confirmPassword", { required: true })} 
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password" 
                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium" 
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* KeyCode */}
                <div className="space-y-1">
                    <label className="block text-gray-700 text-sm font-semibold ml-1">รหัสสมัคร Admin</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <Key size={20} />
                        </div>
                        <input 
                            {...register("KeyCode", { required: true })} 
                            type={showKeyCode ? "text" : "password"}
                            placeholder="Admin Key Code" 
                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 font-medium" 
                        />
                        <button type="button" onClick={() => setShowKeyCode(!showKeyCode)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                            {showKeyCode ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-500 text-white py-3.5 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                >
                    <UserPlus size={20} />
                    <span>สมัครสมาชิก</span>
                </motion.button>
            </form>
        </motion.div>
    )
}

export default RegisterForm

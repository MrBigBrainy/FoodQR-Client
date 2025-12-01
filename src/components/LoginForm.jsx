import React from 'react'
import { useForm } from "react-hook-form"
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

function LoginForm() {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            username: "",
            password: "",
            remember: false,
        },
    })
    const [showPassword, setShowPassword] = React.useState(false);

    const onLogin = (data) => {
        console.log(data)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
                {/* Input: ชื่อผู้ใช้ (Email) */}
                <div className="space-y-1.5">
                    <label className="block text-gray-700 text-sm font-semibold ml-1" htmlFor="username">
                        ชื่อผู้ใช้
                    </label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200">
                            <User size={20} />
                        </div>
                        <input 
                            {...register("username", { required: true })} 
                            id="username"
                            placeholder="Username" 
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-gray-800 placeholder-gray-400 font-medium" 
                        />
                    </div>
                </div>

                {/* Input: รหัสผ่าน */}
                <div className="space-y-1.5">
                    <label className="block text-gray-700 text-sm font-semibold ml-1" htmlFor="password">
                        รหัสผ่าน
                    </label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200">
                            <Lock size={20} />
                        </div>
                        <input 
                            {...register("password", { required: true })} 
                            id="password"
                            placeholder="Password" 
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-gray-800 placeholder-gray-400 font-medium" 
                        />
                        {/* Toggle Password Visibility */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 rounded-full hover:bg-gray-100"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Checkbox และ ลืมรหัสผ่าน */}
                <div className="flex items-center justify-between text-sm pt-1">
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                            <input 
                                {...register("remember")} 
                                type="checkbox" 
                                className="peer h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer transition-all" 
                            />
                        </div>
                        <span className="ml-2 text-gray-600 group-hover:text-gray-800 transition-colors font-medium">จำฉันไว้</span>
                    </label>
                    <a href="#" className="font-semibold text-red-600 hover:text-red-700 hover:underline transition-all">
                        ลืมรหัสผ่าน?
                    </a>
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3.5 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                >
                    <LogIn size={20} />
                    <span>เข้าสู่ระบบ</span>
                </motion.button>
            </form>
        </motion.div>
    )
}

export default LoginForm

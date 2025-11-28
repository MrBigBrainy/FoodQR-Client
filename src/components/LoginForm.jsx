import React from 'react'
import { useForm } from "react-hook-form"


function LoginForm() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: "",
            remember: false,
        },
    })
    const onLogin = (data) => {
        console.log(data.username)
        console.log(data.password)
        console.log(data.remember)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onLogin)}>
                {/* Input: ชื่อผู้ใช้ (Email) */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                        ชื่อผู้ใช้
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-user"></i>
                        </span>
                        <input {...register("username", { required: true })} placeholder="username" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400" />
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
                        <input {...register("password", { required: true })} placeholder="password" type='password' className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400" />
                        {/* /ซ่อนรหัสผ่าน  */}
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                            <i className="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>

                {/* Checkbox และ ลืมรหัสผ่าน */}
                <div className="flex items-center justify-between mb-8 text-sm">
                    <div className="flex items-center">
                        <input {...register("remember")} type="checkbox" value="true" className="h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 " />
                        <label htmlFor="remember_me" className="ml-2 block text-gray-700 w-full" >
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
        </div>
    )
}

export default LoginForm

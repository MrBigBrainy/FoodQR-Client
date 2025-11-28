import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import RoleButton from './RoleButton'

function RegisterForm() {
    const { role, setRole } = useState(null)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            phone: "",
            KeyCode: null,
            role: role
        },
    })


    const onRegister = (data) => {
        console.log(data.role)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onRegister)}>
                {/* name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                        ชื่อผู้ใช้
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-user"></i>
                        </span>
                        <input {...register("name", { required: true })} placeholder="name" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400" />
                    </div>
                </div>

                {/* username */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                        username
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-user"></i>
                        </span>
                        <input {...register("username", { required: true })} placeholder="username" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400" />
                    </div>
                </div>

                {/* phone */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                        เบอร​์โทร
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-user"></i>
                        </span>
                        <input {...register("phone", { required: true })} placeholder="phone" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400" />
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

                {/*  confirmPassword */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                        ยืนยันรหัสผ่าน
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input {...register("confirmPassword", { required: true })} placeholder="Confirm Password" type='password' className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400" />
                        {/* /ซ่อนรหัสผ่าน  */}
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                            <i className="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>

                {/* keycode */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                        รหัสสมัคร Admin
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input {...register("KeyCode", { required: true })} placeholder="Key Code" type='password' className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800 placeholder-gray-400" />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                            <i className="fas fa-eye-slash"></i>
                        </span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-200 shadow-lg"
                >
                    สมัคร
                </button>
            </form>
        </div>
    )
}

export default RegisterForm

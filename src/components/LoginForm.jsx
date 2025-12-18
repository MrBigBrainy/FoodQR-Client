import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { loginAdmin } from '@/api/auth.api';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/auth.schema';
import { useNavigate } from 'react-router';
import { socket } from '@/lib/socket';

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }, // <-- เอา errors ออกมาด้วย!
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: localStorage.getItem('lastUsername') || '',
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  // Load saved username on mount
  React.useEffect(() => {
    const savedUsername = localStorage.getItem('lastUsername');
    if (savedUsername) {
      setValue('userName', savedUsername);
    }
  }, [setValue]);

  const onLogin = async (data) => {
    try {
      const res = await loginAdmin(data);
      console.log(res.data);

      // Save username to localStorage for next login
      if (data.userName) {
        localStorage.setItem('lastUsername', data.userName);
      }

      const storeId = res.data.user.storeId;
      if (storeId) {
        socket.emit('joinStore', { storeId });
        navigate(`/admin/store/${storeId}`);
      } else {
        navigate('/admin/createStore');
      }
      toast.success('เข้าสู่ระบบสำเร็จ!');
    } catch (error) {
      toast.error('Username หรือ รหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
        {/* Username */}
        <div className="space-y-1.5">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            ชื่อผู้ใช้
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={20} />
            </div>
            <input
              {...register('userName')}
              placeholder="ชื่อผู้ใช้"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 
                text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Error Message */}
          {errors.userName && (
            <p className="text-red-500 text-sm ml-1">
              {errors.userName.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-gray-700 text-sm font-semibold ml-1">
            รหัสผ่าน
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="รหัสผ่าน"
              className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 
                text-gray-800 placeholder-gray-400 font-medium"
            />

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {errors.password && (
            <p className="text-red-500 text-sm ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3.5 rounded-xl font-bold text-lg 
            hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-500/30 
            flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>กำลังเข้าสู่ระบบ...</span>
            </div>
          ) : (
            <>
              <LogIn size={20} />
              <span>เข้าสู่ระบบ</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default LoginForm;

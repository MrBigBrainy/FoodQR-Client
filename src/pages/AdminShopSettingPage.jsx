import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Save, Store, MapPin, Receipt, Percent, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import api from '@/api/axios';
import { getStoreById, updateStoreById } from '@/api/store.api';

function AdminShopSettingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      logoUrl: '',
      shopName: '',
      shopAddress: '',
      shopPhone: '',
      serviceCharge: '',
      vat: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [storeId] = useState(1);

  useEffect(() => {
    const fetchShopSettings = async () => {
      try {
        const res = await getStoreById(1);
        const data = res.data.store;
        console.log("✅ ข้อมูลที่ได้:", data);

        reset({
          name: data.name,
          address: data.address,
          serviceCharge: data.serviceCharge,
          vat: data.vat,
          id: data.id,
          logoUrl: data.logoUrl
        });

      } catch (error) {
        console.error('Error fetching shop settings:', error);
      }
    };
    fetchShopSettings();
  }, [storeId, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const shopData = {
        name: data.name,
        address: data.address,
        serviceCharge: parseFloat(data.serviceCharge),
        vat: parseFloat(data.vat),
      };
      console.log('Shop settings saved:', shopData);

      await updateStoreById(1, shopData);

      alert('บันทึกการตั้งค่าร้านค้าสำเร็จ!');
    } catch (error) {
      console.error('Error saving shop settings:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกการตั้งค่า');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 pt-6 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col relative overflow-hidden"
    >
       {/* Background Decorative Elements - Kept for richness but contained */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/3 -translate-y-1/4" />
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-3xl -z-10 opacity-60 -translate-x-1/4 translate-y-1/4" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            ตั้งค่าระบบและร้านค้า
          </h1>
          <p className="text-gray-500 text-sm">
            จัดการข้อมูลร้านค้าและตั้งค่าภาษี
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-6 pr-2 custom-scrollbar">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: General Info */}
              <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-800">ข้อมูลทั่วไป</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Logo URL */}
                    <div className="group">
                      <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-red-500 transition-colors">
                        URL โลโก้ร้านค้า
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <input
                          {...register('logoUrl')}
                          type="url"
                          placeholder="https://example.com/logo.png"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all text-gray-800 placeholder-gray-400"
                        />
                      </div>
                      {errors.logoUrl && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.logoUrl.message}</p>
                      )}
                    </div>

                    {/* Shop Name */}
                    <div className="group">
                      <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-red-500 transition-colors">
                        ชื่อร้านค้า <span className="text-xs text-gray-400 font-normal">(จะแสดงในบิล)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Store className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <input
                          {...register('name', { required: 'กรุณากรอกชื่อร้านค้า' })}
                          type="text"
                          placeholder="เช่น Na-ni-no-Sushi POS"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all text-gray-800 placeholder-gray-400"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Shop Address */}
                    <div className="group">
                      <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-red-500 transition-colors">
                        ที่อยู่ร้านค้า <span className="text-xs text-gray-400 font-normal">(สำหรับออกใบเสร็จ)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <textarea
                          {...register('address', { required: 'กรุณากรอกที่อยู่ร้านค้า' })}
                          rows="3"
                          placeholder="เช่น 123/4 Central District, Bangkok"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all text-gray-800 placeholder-gray-400 resize-none"
                        />
                      </div>
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.address.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Financials & Actions */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-800">ตั้งค่าภาษีและค่าบริการ</h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Service Charge */}
                    <div className="group">
                      <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-red-500 transition-colors">
                        ค่าบริการ (Service Charge)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <input
                          {...register('serviceCharge', {
                            min: { value: 0, message: 'ค่าบริการต้องมากกว่าหรือเท่ากับ 0' },
                            max: { value: 100, message: 'ค่าบริการต้องไม่เกิน 100' },
                            valueAsNumber: true,
                          })}
                          type="number"
                          step="0.01"
                          className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all text-gray-800 placeholder-gray-400"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-gray-400 font-medium">%</span>
                        </div>
                      </div>
                      {errors.serviceCharge && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.serviceCharge.message}</p>
                      )}
                    </div>

                    {/* VAT */}
                    <div className="group">
                      <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-red-500 transition-colors">
                        ภาษีมูลค่าเพิ่ม (VAT)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Percent className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <input
                          {...register('vat', {
                            min: { value: 0, message: 'ภาษีมูลค่าเพิ่มต้องมากกว่าหรือเท่ากับ 0' },
                            max: { value: 100, message: 'ภาษีมูลค่าเพิ่มต้องไม่เกิน 100' },
                            valueAsNumber: true,
                          })}
                          type="number"
                          step="0.01"
                          className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all text-gray-800 placeholder-gray-400"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-gray-400 font-medium">%</span>
                        </div>
                      </div>
                      {errors.vat && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.vat.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(220, 38, 38, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {loading ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
                </motion.button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminShopSettingPage;


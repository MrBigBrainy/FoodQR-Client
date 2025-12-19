import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Save, Store, MapPin, Receipt, Percent, CreditCard, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import RedWineLoader from '@/components/loader/RedWineLoader';
import api from '@/api/axios';
import { getStoreById, updateStoreById } from '@/api/store.api';
import AddDropZone from '@/components/addmenu/AddDropZone';
import { storage } from '@/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

function AdminShopSettingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const currentLogoUrl = watch('logoUrl');

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
      } finally {
        setIsFetching(false);
      }
    };
    fetchShopSettings();
  }, [storeId, reset]);

  const handleImageUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `shops/${storeId}/logo_${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        setIsUploading(false);
        toast.error('อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setValue('logoUrl', downloadURL);
        setIsUploading(false);
        setUploadProgress(100);
        toast.success('อัปโหลดรูปภาพสำเร็จ');
      }
    );
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("logoUrl",data.logoUrl)
      const shopData = {
        name: data.name,
        address: data.address,
        serviceCharge: parseFloat(data.serviceCharge),
        vat: parseFloat(data.vat),
        logoUrl: data.logoUrl,
      };
      console.log('Shop settings saved:', shopData);

      await updateStoreById(1, shopData);

      toast.success('บันทึกการตั้งค่าร้านค้าสำเร็จ!');
    } catch (error) {
      console.error('Error saving shop settings:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกการตั้งค่า');
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
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 shrink-0"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg shadow-red-200">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              ตั้งค่าระบบและร้านค้า
            </h1>
          </div>
          <p className="text-gray-600 text-sm ml-14">
            จัดการข้อมูลร้านค้า โลโก้ และตั้งค่าภาษีมูลค่าเพิ่ม
          </p>
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-6 pr-2 custom-scrollbar">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isFetching ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <RedWineLoader scale={1} />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6 max-w-3xl mx-auto">
              
              <motion.div 
                variants={itemVariants} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 via-white to-orange-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Store className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">ข้อมูลร้านค้า</h3>
                      <p className="text-xs text-gray-500 mt-0.5">จัดการข้อมูลพื้นฐานของร้านค้า</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-8">
                  {/* Logo Upload Section */}
                  <div className="group">
                    <label className="block text-gray-800 text-sm font-bold mb-4 group-focus-within:text-red-600 transition-colors flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-red-500" />
                      โลโก้ร้านค้า
                    </label>
                    
                    <div className="space-y-4">
                      {/* Show DropZone ONLY if no logo and not uploading */}
                      {!currentLogoUrl && !isUploading && (
                        <AddDropZone onFileSelect={handleImageUpload} />
                      )}

                      {/* Upload Progress */}
                      <AnimatePresence>
                        {isUploading && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                                กำลังอัปโหลด...
                              </span>
                              <span className="text-sm font-bold text-red-600">{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-red-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Current Logo Display (Replaces DropZone) */}
                      {currentLogoUrl && !isUploading && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group/image"
                        >
                          <div className="relative w-full h-[220px] rounded-xl overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center group-hover/image:border-red-300 shadow-md group-hover/image:shadow-lg transition-all duration-300">
                            <img 
                              src={currentLogoUrl} 
                              alt="Shop Logo" 
                              className="h-full object-contain p-4"
                            />
                            
                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity flex items-end justify-center pb-6">
                              <motion.button
                                type="button"
                                onClick={() => setValue('logoUrl', '')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2.5 bg-white text-red-600 rounded-xl font-bold shadow-xl hover:bg-red-50 transition-colors flex items-center gap-2 border border-red-100"
                              >
                                <ImageIcon className="w-4 h-4" />
                                เปลี่ยนรูปภาพ
                              </motion.button>
                            </div>
                          </div>
                          <p className="text-center text-xs text-gray-500 mt-3 font-medium">
                            คลิกที่รูปเพื่อเปลี่ยนโลโก้
                          </p>
                        </motion.div>
                      )}
                    </div>
                    <input type="hidden" {...register('logoUrl')} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shop Name */}
                    <div className="group md:col-span-2">
                      <label className="block text-gray-800 text-sm font-bold mb-2 group-focus-within:text-red-600 transition-colors flex items-center gap-2">
                        <Store className="w-4 h-4 text-red-500" />
                        ชื่อร้านค้า <span className="text-xs text-gray-500 font-normal">(จะแสดงในบิล)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Store className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <input
                          {...register('name', { required: 'กรุณากรอกชื่อร้านค้า' })}
                          type="text"
                          placeholder="เช่น Na-ni-no-Sushi POS"
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 shadow-sm hover:border-gray-300"
                        />
                      </div>
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-2 ml-1 font-medium flex items-center gap-1"
                        >
                          <span>⚠️</span> {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Shop Address */}
                    <div className="group md:col-span-2">
                      <label className="block text-gray-800 text-sm font-bold mb-2 group-focus-within:text-red-600 transition-colors flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        ที่อยู่ร้านค้า <span className="text-xs text-gray-500 font-normal">(สำหรับออกใบเสร็จ)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3.5 left-4 pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        </div>
                        <textarea
                          {...register('address', { required: 'กรุณากรอกที่อยู่ร้านค้า' })}
                          rows="3"
                          placeholder="เช่น 123/4 Central District, Bangkok"
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 resize-none shadow-sm hover:border-gray-300"
                        />
                      </div>
                      {errors.address && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-2 ml-1 font-medium flex items-center gap-1"
                        >
                          <span>⚠️</span> {errors.address.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8 mt-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Receipt className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">ตั้งค่าภาษีและค่าบริการ</h3>
                        <p className="text-xs text-gray-500 mt-0.5">กำหนดอัตราภาษีมูลค่าเพิ่มและค่าบริการ</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Service Charge */}
                      <div className="group">
                        <label className="block text-gray-800 text-sm font-bold mb-2 group-focus-within:text-red-600 transition-colors flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-red-500" />
                          ค่าบริการ (Service Charge)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                            placeholder="0.00"
                            className="w-full pl-12 pr-14 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 shadow-sm hover:border-gray-300"
                          />
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span className="text-gray-500 font-bold">%</span>
                          </div>
                        </div>
                        {errors.serviceCharge && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-2 ml-1 font-medium flex items-center gap-1"
                          >
                            <span>⚠️</span> {errors.serviceCharge.message}
                          </motion.p>
                        )}
                      </div>

                      {/* VAT */}
                      <div className="group">
                        <label className="block text-gray-800 text-sm font-bold mb-2 group-focus-within:text-red-600 transition-colors flex items-center gap-2">
                          <Percent className="w-4 h-4 text-red-500" />
                          ภาษีมูลค่าเพิ่ม (VAT)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                            placeholder="0.00"
                            className="w-full pl-12 pr-14 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 shadow-sm hover:border-gray-300"
                          />
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <span className="text-gray-500 font-bold">%</span>
                          </div>
                        </div>
                        {errors.vat && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-2 ml-1 font-medium flex items-center gap-1"
                          >
                            <span>⚠️</span> {errors.vat.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.3), 0 10px 10px -5px rgba(220, 38, 38, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || isUploading}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white rounded-2xl font-bold text-lg hover:from-red-700 hover:via-red-600 hover:to-red-700 transition-all duration-300 shadow-xl shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none relative overflow-hidden group"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Save className="w-6 h-6" />
                )}
                <span className="relative z-10">
                  {loading ? 'กำลังบันทึก...' : isUploading ? 'กำลังอัปโหลดรูปภาพ...' : 'บันทึกการตั้งค่า'}
                </span>
              </motion.button>
            </div>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminShopSettingPage;


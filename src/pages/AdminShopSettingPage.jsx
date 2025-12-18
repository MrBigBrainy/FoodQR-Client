import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Save, Store, MapPin, Receipt, Percent, CreditCard, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
            <div className="space-y-6 max-w-3xl mx-auto">
              
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-gray-400" />
                    <h3 className="font-semibold text-gray-800">ข้อมูลร้านค้า</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-8">
                  {/* Logo Upload Section */}
                  <div className="group">
                    <label className="block text-gray-700 text-sm font-medium mb-4 group-focus-within:text-red-500 transition-colors">
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
                          <div className="relative w-full h-[220px] rounded-lg overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center group-hover/image:border-red-100 transition-colors">
                            <img 
                              src={currentLogoUrl} 
                              alt="Shop Logo" 
                              className="h-full object-contain"
                            />
                            
                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                              <button
                                type="button"
                                onClick={() => setValue('logoUrl', '')}
                                className="px-4 py-2 bg-white text-red-600 rounded-lg font-medium shadow-lg hover:bg-red-50 transition-colors transform hover:scale-105 active:scale-95 flex items-center gap-2"
                              >
                                <ImageIcon className="w-4 h-4" />
                                เปลี่ยนรูปภาพ
                              </button>
                            </div>
                          </div>
                          <p className="text-center text-xs text-gray-400 mt-2">
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
                    <div className="group md:col-span-2">
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

                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Receipt className="w-5 h-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-800">ตั้งค่าภาษีและค่าบริการ</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(220, 38, 38, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || isUploading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {loading ? 'กำลังบันทึก...' : isUploading ? 'กำลังอัปโหลดรูปภาพ...' : 'บันทึกการตั้งค่า'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminShopSettingPage;


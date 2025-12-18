import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Save } from 'lucide-react';
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
      // taxId: '',
      serviceCharge: '',
      vat: '',
    },
  });

  const [selectedTheme, setSelectedTheme] = useState('red');
  const [loading, setLoading] = useState(false);
  const [storeId] = useState(1); // TODO: Get from auth context or localStorage

  const themeColors = [
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
  ];
  // Fetch shop settings on component mount
  useEffect(() => {
    const fetchShopSettings = async () => {
      try {
        // hard code 
        const res = await getStoreById(1);

        const data = res.data.store
        console.log("✅ ข้อมูลที่ได้:", data);
        // reset(res.data.store)

        // แจ้งพี่วี เรื่อง data ไม่ตรงกัน
        reset({
          // logoUrl: data.logoUrl,
          name: data.name,
          address: data.address,
          // shopPhone: data.phone,
          // taxId: data.taxId,
          serviceCharge: data.serviceCharge,
          vat: data.vat,
          // hardcode
          id: data.id,
        })

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
        // logoUrl: data.logoUrl,
        name: data.name,
        address: data.address,
        // taxId: data.taxId,
        serviceCharge: parseFloat(data.serviceCharge),
        vat: parseFloat(data.vat),
      };
      console.log('Shop settings saved:', shopData);

      // put data to backend 
      const res = await updateStoreById(1, shopData);

      alert('บันทึกการตั้งค่าร้านค้าสำเร็จ!');
    } catch (error) {
      console.error('Error saving shop settings:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกการตั้งค่า');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ตั้งค่าระบบและร้านค้า
        </h2>
        <p className="text-gray-500">จัดการข้อมูลร้านค้าและธีมสี</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Shop Details and Tax Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-purple-600 mb-6">
            รายละเอียดร้านค้าและภาษี
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Logo URL */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                URL โลโก้ร้านค้า
              </label>
              <input
                {...register('logoUrl')}
                type="url"
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
              />
              {errors.logoUrl && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.logoUrl.message}
                </p>
              )}
            </div>

            {/* Shop Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ชื่อร้านค้า (จะแสดงในบิล)
              </label>
              <input
                {...register('name', { required: 'กรุณากรอกชื่อร้านค้า' })}
                type="text"
                placeholder="เช่น Na-ni-no-Sushi POS"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
              />
              {errors.shopName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.shopName.message}
                </p>
              )}
            </div>

            {/* Shop Address */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ที่อยู่ร้านค้า (สำหรับออกใบเสร็จ)
              </label>
              <input
                {...register('address', {
                  required: 'กรุณากรอกที่อยู่ร้านค้า',
                })}
                type="text"
                placeholder="เช่น 123/4 Central District, Bangkok"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
              />
              {errors.shopAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.shopAddress.message}
                </p>
              )}
            </div>

            {/* Shop Phone */}
            {/* <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                เบอร์โทรศัพท์ร้านค้า
              </label>
              <input
                // {...register('shopPhone')}
                type="tel"
                placeholder="เช่น 02-123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
              />
              {errors.shopPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.shopPhone.message}
                </p>
              )}
            </div> */}

            {/* Tax ID */}
            {/* <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                เลขประจำตัวผู้เสียภาษี
              </label>
              <input
                {...register('taxId')}
                type="text"
                placeholder="เช่น 0105512345678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
              />
              {errors.taxId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.taxId.message}
                </p>
              )}
            </div> */}

            {/* Service Charge */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ค่าบริการ (%)
              </label>
              <input
                {...register('serviceCharge', {
                  min: {
                    value: 0,
                    message: 'ค่าบริการต้องมากกว่าหรือเท่ากับ 0',
                  },
                  max: { value: 100, message: 'ค่าบริการต้องไม่เกิน 100' },
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="เช่น 10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
              />
              {errors.serviceCharge && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serviceCharge.message}
                </p>
              )}
            </div>

            {/* VAT */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                ภาษีมูลค่าเพิ่ม (%)
              </label>
              <input
                {...register('vat', {
                  min: {
                    value: 0,
                    message: 'ภาษีมูลค่าเพิ่มต้องมากกว่าหรือเท่ากับ 0',
                  },
                  max: {
                    value: 100,
                    message: 'ภาษีมูลค่าเพิ่มต้องไม่เกิน 100',
                  },
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="เช่น 7"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
              />
              {errors.vat && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.vat.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-5 h-5" />
              {loading ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่าร้านค้า'}
            </button>
          </form>
        </div>

        {/* Right Column: Theme Color Selection
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-purple-600 mb-6">เลือกธีมสีร้าน</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {themeColors.map((theme) => (
                            <button
                                key={theme.value}
                                onClick={() => setSelectedTheme(theme.value)}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                    selectedTheme === theme.value
                                        ? 'border-gray-900 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className={`w-full h-16 ${theme.color} rounded mb-3`}></div>
                                <p className="text-sm font-medium text-gray-700">{theme.name}</p>
                            </button>
                        ))}
                    </div> */}

        {/* Preview */}
        {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">ตัวอย่างธีมสีที่เลือก:</p>
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 ${themeColors.find(t => t.value === selectedTheme)?.color} rounded-full`}></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {themeColors.find(t => t.value === selectedTheme)?.name}
                                </p>
                                <p className="text-xs text-gray-500">ธีมสีปัจจุบัน</p>
                            </div>
                        </div>
                    </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default AdminShopSettingPage;

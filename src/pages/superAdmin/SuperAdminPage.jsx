import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api/axios';
import SuperAdminMenu from './superAdminMenu';
import SuperAdminTable from './superAdminTable';
import SuperAdminManage from './superAdminManage';

import { Check, FileCog } from 'lucide-react';


function SuperAdminPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Form for Step 1: Shop Information
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            shopName: "Nanino Sushi",
            shopAddress: "123/4 Japan Town",
            vatRate: "7",
            serviceCharge: "10"
        }
    });

    const steps = [
        {
            number: 1,
            title: "สร้างข้อมูลร้านค้า (Shop/VAT)",
            description: "ชื่อร้าน, ที่อยู่, อัตราภาษีและค่าบริการ"
        },
        {
            number: 2,
            title: "สร้างเมนูอาหารเริ่มต้น",
            description: "กำหนดหมวดหมู่และรายการอาหารหลัก"
        },
        {
            number: 3,
            title: "สร้างโต๊ะและพื้นที่บริการ",
            description: "กำหนดจำนวนโต๊ะ, หมายเลขโต๊ะ และจำนวนที่นั่ง"
        },
        {
            number: 4,
            title: "สร้างบัญชีผู้ดูแลร้าน/ครัว",
            description: "การจำกัดสิทธิ์การใช้งานสำหรับ Admin, Manager และ Chef"
        }
    ];

    const onSubmitStep1 = async (data) => {
        try {
            // TODO: Call API to create shop/store
            // const response = await api.post('/admin/shop', {
            //     shopName: data.shopName,
            //     shopAddress: data.shopAddress,
            //     vatRate: parseFloat(data.vatRate),
            //     serviceCharge: parseFloat(data.serviceCharge)
            // });
            
            console.log("Shop data:", data);
            // Move to next step
            setCurrentStep(2);
        } catch (error) {
            console.error("Error creating shop:", error);
            alert("เกิดข้อผิดพลาดในการสร้างข้อมูลร้านค้า");
        }
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <form onSubmit={handleSubmit(onSubmitStep1)} className="space-y-6">
                        {/* Shop Name */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                ชื่อร้านค้า (เช่น Na-ni-no-Sushi) <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("shopName", { required: "กรุณากรอกชื่อร้านค้า" })}
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                                placeholder="เช่น Na-ni-no-Sushi"
                            />
                            {errors.shopName && (
                                <p className="text-red-500 text-xs mt-1">{errors.shopName.message}</p>
                            )}
                        </div>

                        {/* Shop Address */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                ที่อยู่ร้านค้า <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                {...register("shopAddress", { required: "กรุณากรอกที่อยู่ร้านค้า" })}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 resize-none"
                                placeholder="กรอกที่อยู่ร้านค้า"
                            />
                            {errors.shopAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.shopAddress.message}</p>
                            )}
                        </div>

                        {/* VAT Rate */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                อัตราภาษีมูลค่าเพิ่ม (%) <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("vatRate", { 
                                    required: "กรุณากรอกอัตราภาษี",
                                    min: { value: 0, message: "อัตราภาษีต้องมากกว่าหรือเท่ากับ 0" },
                                    max: { value: 100, message: "อัตราภาษีต้องไม่เกิน 100" },
                                    valueAsNumber: true
                                })}
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                                placeholder="เช่น 7"
                            />
                            {errors.vatRate && (
                                <p className="text-red-500 text-xs mt-1">{errors.vatRate.message}</p>
                            )}
                        </div>

                        {/* Service Charge */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                ค่าบริการ (Service Charge %) <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("serviceCharge", { 
                                    required: "กรุณากรอกค่าบริการ",
                                    min: { value: 0, message: "ค่าบริการต้องมากกว่าหรือเท่ากับ 0" },
                                    max: { value: 100, message: "ค่าบริการต้องไม่เกิน 100" },
                                    valueAsNumber: true
                                })}
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                                placeholder="เช่น 10"
                            />
                            {errors.serviceCharge && (
                                <p className="text-red-500 text-xs mt-1">{errors.serviceCharge.message}</p>
                            )}
                        </div>
                    </form>
                );
            case 2:
                return (
                    <SuperAdminMenu onNext={handleNext} onBack={handleBack} />
                );
            case 3:
                return (
                    <SuperAdminTable onNext={handleNext} onBack={handleBack} />
                );
            case 4:
                return (
                    <SuperAdminManage onNext={handleNext} onBack={handleBack} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                                <FileCog className="w-6 h-6 text-white" />
                            <i className="fas fa-cog text-white text-xl"></i>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Super Admin Setup Wizard</h1>
                    </div>
                    <p className="text-red-100 mt-2 text-sm">ตั้งค่าร้านค้าเริ่มต้น {totalSteps} ขั้นตอน</p>
                </div>

                {/* Progress Indicator */}
                <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                                            currentStep === step.number
                                                ? 'bg-red-600 text-white shadow-lg scale-110'
                                                : currentStep > step.number
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-300 text-gray-600'
                                        }`}
                                    >
                                        {currentStep > step.number ? (
                                            <Check className="w-6 h-6 text-white" />    
                                        ) : (
                                            step.number
                                        )}
                                    </div>
                                    <p
                                        className={`text-xs mt-2 text-center max-w-[120px] ${
                                            currentStep === step.number
                                                ? 'text-red-600 font-semibold'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {step.title}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                                            currentStep > step.number
                                                ? 'bg-green-500'
                                                : 'bg-gray-300'
                                        }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-8 py-8">
                    {/* Step Title */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-purple-700 mb-2">
                            {steps[currentStep - 1].title}
                        </h2>
                        {steps[currentStep - 1].description && (
                            <p className="text-gray-600 text-sm">
                                {steps[currentStep - 1].description}
                            </p>
                        )}
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">
                        {renderStepContent()}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                            currentStep === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}
                    >
                        ย้อนกลับ
                    </button>
                    {currentStep === 1 ? (
                        <button
                            onClick={handleSubmit(onSubmitStep1)}
                            className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg"
                            
                        >
                            ถัดไป
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={currentStep === totalSteps}
                            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                currentStep === totalSteps
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
                            }`}
                        >
                            {currentStep === totalSteps ? 'เสร็จสิ้นการตั้งค่า' : 'ถัดไป'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SuperAdminPage;


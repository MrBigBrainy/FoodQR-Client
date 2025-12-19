import React, { useState, useEffect } from "react";
import { 
  Ticket, 
  DollarSign, 
  Percent, 
  FileText, 
  Hash, 
  Calendar, 
  Clock 
} from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import DateTimePicker from "@/components/DateTimePicker";

function EditDiscountForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percent",
    amount: 0,
    name: "",
    maxCount: 0,
    startTime: "",
    endTime: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || "",
        discountType: initialData.discountType || "percent",
        amount: initialData.amount || 0,
        name: initialData.description || "", // Mapping description to name as per DiscountList mapping
        maxCount: initialData.maxCount || 0,
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isNumericField =
      type === "number" || name === "amount" || name === "maxCount";

    const finalValue =
      type === "checkbox"
        ? checked
        : isNumericField && value === ""
        ? ""
        : isNumericField
        ? Number(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleTypeSelect = (value) => {
    setFormData((prev) => ({ ...prev, discountType: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Coupon Code */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          รหัสคูปอง <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Ticket size={18} />
          </span>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="เช่น: SAVE10"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        {/* Discount Type */}
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ประเภทส่วนลด <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={formData.discountType}
            onChange={handleTypeSelect}
            options={[
              { value: "baht", label: "ลดเป็นบาท (฿)" },
              { value: "percent", label: "ลดเป็น %" },
            ]}
          />
        </div>

        {/* Amount */}
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            มูลค่าส่วนลด <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              name="amount"
              value={
                formData.amount === 0 && formData.amount !== ""
                  ? ""
                  : formData.amount
              }
              onChange={handleChange}
              min="0"
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Coupon Name */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          รายละเอียดคูปอง
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="เช่น: ส่วนลด 10% สำหรับทุกเมนู"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {/* Max Count */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          จำกัดสิทธิ์คงเหลือ (ใส่ 0 หากไม่จำกัด)
        </label>
        <div className="relative">
          <input
            type="number"
            id="maxCount"
            name="maxCount"
            value={formData.maxCount}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <DateTimePicker
            label="เวลาเริ่มต้น"
            value={formData.startTime}
            onChange={(value) => setFormData(prev => ({ ...prev, startTime: value }))}
            required
          />
        </div>

        <div className="w-1/2">
          <DateTimePicker
            label="เวลาสิ้นสุด"
            value={formData.endTime}
            onChange={(value) => setFormData(prev => ({ ...prev, endTime: value }))}
            required
          />
        </div>
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-red-500 checked:bg-red-500 hover:border-red-400"
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <label
          htmlFor="isActive"
          className="text-sm font-bold text-gray-700 cursor-pointer select-none"
        >
          เปิดใช้งานคูปอง
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
        >
          บันทึกการแก้ไข
        </button>
      </div>
    </form>
  );
}

export default EditDiscountForm;

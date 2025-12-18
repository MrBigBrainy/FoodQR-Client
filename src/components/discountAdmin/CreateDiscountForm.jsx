import axios from "axios";
import React, { useState } from "react";
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

const MOCK_AUTH = {
  storeId: 1,
  token: "MOCK_ADMIN_JWT_TOKEN",
};

function CreateDiscountForm({ onCouponCreated }) {
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    code: "",
    discountType: "baht",
    amount: 0,
    name: "",
    maxCount: 0,
    startTime: getCurrentDateTime(),
    endTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const isNumericField =
      type === "number" || name === "amount" || name === "maxCount";

    const finalValue =
      isNumericField && value === ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!formData.code || formData.amount <= 0) {
      setSubmitError("กรุณากรอกรหัสคูปอง ชื่อ และมูลค่าส่วนลดให้ถูกต้อง");
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      setSubmitError("กรุณาเลือกวันส่วนลดให้ถูกต้อง");
      return;
    }

    const payload = {
      code: formData.code,
      discountType: formData.discountType,
      amount: formData.amount,
      maxCount: formData.maxCount !== "" ? formData.maxCount : null,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/discount/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${MOCK_AUTH.token}`,
          },
        }
      );

      console.log("Backend Response (Axios):", response.data);
      alert(`✅ สร้างคูปอง ${formData.code} สำเร็จ!`);

      if (onCouponCreated) {
        onCouponCreated();
      }

      setFormData({
        code: "",
        discountType: "baht",
        amount: 0,
        name: "",
        maxCount: 0,
        startTime: getCurrentDateTime(),
        endTime: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setSubmitError("ชื่อคูปองนี้ถูกใช้อยู่หรือกำลังใช้อยู่");
      } else {
        setSubmitError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {submitError && (
        <div className="text-red-600 text-sm p-2 bg-red-100 rounded mb-4">
          {submitError}
        </div>
      )}
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
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FileText size={18} />
            </span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="เช่น: ส่วนลด 10% สำหรับทุกเมนู"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Max Count */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            จำกัดสิทธิ์คงเหลือ (ใส่ 0 หากไม่จำกัด)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Hash size={18} />
            </span>
            <input
              type="number"
              id="maxCount"
              name="maxCount"
              value={formData.maxCount}
              onChange={handleChange}
              min="0"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* Start Time */}
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              เวลาเริ่มต้น <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <Calendar size={18} />
              </span>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white accent-red-600"
              />
            </div>
          </div>

          {/* End Time */}
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              เวลาสิ้นสุด <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <Clock size={18} />
              </span>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white accent-red-600"
              />
            </div>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none mt-2"
        >
          {isSubmitting ? "กำลังสร้าง..." : "สร้างคูปอง"}
        </button>
      </form>
    </div>
  );
}

export default CreateDiscountForm;

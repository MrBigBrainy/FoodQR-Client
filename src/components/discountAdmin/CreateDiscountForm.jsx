import axios from "axios";
import React, { useState } from "react";

const MOCK_AUTH = {
  storeId: 1,
  token: "MOCK_ADMIN_JWT_TOKEN",
};

function CreateDiscountForm({ onCouponCreated }) {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "baht",
    amount: 0,
    name: "",
    maxCount: 0,
    startTime: "",
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
      // const response = await axios.post(
      //   "https://foodqr-server.onrender.com/api/discount/create",
      //   payload,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${MOCK_AUTH.token}`,
      //     },
      //   }
      // );
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
        startTime: "",
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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        สร้างคูปองใหม่
      </h3>
      {submitError && (
        <div className="text-red-600 text-sm p-2 bg-red-100 rounded mb-4">
          {submitError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="เช่น: SAVE10"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="discountType"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <select
              id="discountType"
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="baht">ลดเป็นบาท (฿)</option>
              <option value="percent">ลดเป็น %</option>
            </select>
          </div>

          <div className="w-1/2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            ></label>
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="เช่น: ส่วนลด 10% สำหรับทุกเมนู"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="maxCount"
            className="block text-sm font-medium text-gray-700"
          >
            จำกัดสิทธิ์คงเหลือ (ใส่ 0 หากไม่จำกัด)
          </label>
          <input
            type="number"
            id="maxCount"
            name="maxCount"
            value={formData.maxCount}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              เวลาเริ่มต้น
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              เวลาสิ้นสุด
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-150"
        >
          {isSubmitting ? "กำลังสร้าง..." : "สร้างคูปอง"}
        </button>
      </form>
    </div>
  );
}

export default CreateDiscountForm;

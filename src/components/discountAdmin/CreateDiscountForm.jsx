import React, { useState } from "react";

function CreateDiscountForm() {
  const [formData, setFormData] = useState({
    code: "",
    type: "fixed_amount",
    value: 0,
    name: "",
    limit: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name || formData.value <= 0) {
      alert("กรุณากรอกข้อมูลโค้ด ชื่อ และมูลค่าส่วนลดให้ถูกต้อง!");
      return;
    }

    console.log("Coupon Data to be submitted:", formData);
    alert(
      `สร้างคูปอง ${formData.code} (มูลค่า ${formData.value} ${
        formData.type === "fixed_amount" ? "บาท" : "%"
      }) สำเร็จ! (Mock)`
    );
    setFormData({
      code: "",
      type: "fixed_amount",
      value: 0,
      name: "",
      limit: 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        สร้างคูปองใหม่
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            รหัสคูปอง (Code)
          </label>
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
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              ประเภท
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="fixed_amount">ลดเป็นบาท (฿)</option>
              <option value="percentage">ลดเป็น %</option>
            </select>
          </div>

          <div className="w-1/2">
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700"
            >
              มูลค่าส่วนลด
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              min="0"
              placeholder="0"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            ชื่อคูปอง
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="เช่น: ส่วนลด 10% สำหรับทุกเมนู"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-gray-700"
          >
            จำกัดสิทธิ์คงเหลือ (ใส่ 0 หากไม่จำกัด)
          </label>
          <input
            type="number"
            id="limit"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-150"
        >
          สร้างคูปอง
        </button>
      </form>
    </div>
  );
}

export default CreateDiscountForm;

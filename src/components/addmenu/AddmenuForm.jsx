import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import AddDropZone from "./AddDropZone";

function AddmenuForm({ onSubmit, onClose }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const price = watch("price") || 0;
  const discount = watch("discount") || 0;
  const netPrice = price - discount;

  const handleFileSelect = (file) => {
    console.log("📸 ได้ไฟล์:", file);
    setSelectedFile(file);
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    const payload = {
      ...data,
      price: Number(data.price),
      discount: Number(data.discount),
      netPrice: Number(price - discount),
      categoryId: Number(data.categoryId),
      menuTypeId: Number(data.menuTypeId),
    };

    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    if (selectedFile) {
      console.log("📸 append file →", selectedFile.name);
      formData.append("imageFile", selectedFile);
    } else {
      console.warn("⚠ No file selected");
    }

    console.log("📤 ส่ง formData ไป backend");

    if (onSubmit) onSubmit(formData);

    reset();
    if (onClose) onClose();
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
        เพิ่มเมนูใหม่
      </h2>
      <div>
        <label className="block text-gray-600 text-sm mb-1">ชื่อเมนู</label>
        <input
          type="text"
          placeholder="ระบุชื่อเมนู"
          {...register("name", { required: true })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-gray-600 text-sm mb-1">ราคา (฿)</label>
          <input
            type="number"
            placeholder="0"
            {...register("price", { required: true, valueAsNumber: true })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">ราคาลด (฿)</label>
          <input
            type="number"
            placeholder="0"
            {...register("discount", { valueAsNumber: true })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-600 text-sm mb-1">หมวดหมู่</label>
        <select
          {...register("categoryId", { required: true })}
          className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-400"
        >
          <option value="1">อาหารจานหลัก</option>
          <option value="2">ของหวาน</option>
          <option value="3">เครื่องดื่ม</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-gray-600 text-sm mb-1">คำอธิบาย</label>
        <textarea
          placeholder="อธิบายเกี่ยวกับเมนูนี้"
          {...register("detail")}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="block text-gray-600 text-sm mb-1">URL รูปภาพ</label>
        <AddDropZone onFileSelect={handleFileSelect} />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-1/2 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="w-1/2 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
        >
          เพิ่มเมนู
        </button>
      </div>
    </form>
  );
}

export default AddmenuForm;

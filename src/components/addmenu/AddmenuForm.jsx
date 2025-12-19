import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AddDropZone from "./AddDropZone";
import { Utensils, DollarSign, Tag, FileText, List, Loader2 } from "lucide-react";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

function AddmenuForm({ onSubmit, onClose, storeId }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const price = watch("price") || 0;
  const discount = watch("discount") || 0;

  const handleFileSelect = (file) => {
    console.log("📸 ได้ไฟล์:", file);
    setSelectedFile(file);
  };

  const uploadImageToFirebase = async (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `menus/${storeId || 'default'}/menu_${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const handleFormSubmit = async (data) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      let imageUrl = "";

      // Upload image to Firebase Storage if file is selected
      if (selectedFile) {
        try {
          imageUrl = await uploadImageToFirebase(selectedFile);
          toast.success("อัปโหลดรูปภาพสำเร็จ!");
        } catch (error) {
          console.error("Failed to upload image:", error);
          toast.error("อัปโหลดรูปภาพไม่สำเร็จ");
          setIsUploading(false);
          return;
        }
      }

      // Prepare payload with imageUrl instead of imageFile
      const payload = {
        ...data,
        price: Number(data.price),
        discount: Number(data.discount),
        netPrice: Number(price - discount),
        categoryId: Number(data.categoryId),
        menuTypeId: Number(data.menuTypeId),
        ...(imageUrl && { imageUrl }), // Only include imageUrl if it exists
      };

      if (onSubmit) {
        await onSubmit(payload);
      }
      
      reset();
      setSelectedFile(null);
      setUploadProgress(0);
      if (onClose) onClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มเมนู");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          ชื่อเมนู <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Utensils size={18} />
          </span>
          <input
            type="text"
            placeholder="ระบุชื่อเมนู"
            {...register("name", { required: true })}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {/* Price & Discount */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ราคา (฿) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <DollarSign size={18} />
            </span>
            <input
              type="number"
              placeholder="0"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ส่วนลด (฿)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Tag size={18} />
            </span>
            <input
              type="number"
              placeholder="0"
              {...register("discount", { valueAsNumber: true })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          หมวดหมู่ <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <List size={18} />
          </span>
          <select
            {...register("categoryId", { required: true })}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 bg-gray-50 focus:bg-white appearance-none"
          >
            <option value="1">อาหารจานหลัก</option>
            <option value="2">ของหวาน</option>
            <option value="3">เครื่องดื่ม</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          คำอธิบาย
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <FileText size={18} />
          </span>
          <textarea
            placeholder="อธิบายเกี่ยวกับเมนูนี้..."
            {...register("detail")}
            rows="3"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white resize-none"
          ></textarea>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          รูปภาพเมนู
        </label>
        <AddDropZone onFileSelect={handleFileSelect} />
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>กำลังอัปโหลด... {Math.round(uploadProgress)}%</span>
          </>
        ) : (
          "เพิ่มเมนู"
        )}
      </button>
    </form>
  );
}

export default AddmenuForm;

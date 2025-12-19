import React, { useState, useEffect } from "react";
import { Utensils, DollarSign, Tag, FileText, List, Image as ImageIcon } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";

function EditMenuForm({ menu, onSave, onCancel }) {
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name || "",
        price: menu.price || 0,
        discount: menu.discount || 0,
        detail: menu.detail || "",
        categoryId: menu.categoryId || 1,
        menuTypeId: menu.menuTypeId || 1,
      });
      setImagePreview(menu.imageUrl || "");
      setSelectedFile(null);
    }
  }, [menu]);

  const netPrice = (formData.price || 0) - (formData.discount || 0);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: Number(value),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(menu.imageUrl || "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    dataToSend.append("id", menu.id);
    for (const key in formData) {
      dataToSend.append(key, String(formData[key]));
    }
    dataToSend.append("netPrice", String(netPrice));
    if (selectedFile) {
      dataToSend.append("imageFile", selectedFile, selectedFile.name);
    } else if (menu.imageUrl) {
      dataToSend.append("imageUrl", menu.imageUrl);
    }

    onSave(menu.id, dataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          รูปภาพเมนู
        </label>
        <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-red-400 transition-colors bg-gray-50">
          {imagePreview ? (
            <div className="relative w-full h-48 mb-3 group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <p className="text-white font-medium">คลิกเพื่อเปลี่ยนรูป</p>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400 relative w-full">
                <ImageIcon size={48} className="mb-2" />
                <p className="text-sm font-medium">คลิกเพื่ออัปโหลดรูปภาพ</p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
          )}
        </div>
      </div>

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
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="ระบุชื่อเมนู"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
            required
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
              name="price"
              value={formData.price || 0}
              onChange={handleChange}
              placeholder="0"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
              required
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
              name="discount"
              value={formData.discount || 0}
              onChange={handleChange}
              placeholder="0"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Net Price Display */}
      <div>
         <label className="block text-gray-700 text-sm font-bold mb-2">
            ราคาสุทธิ (คำนวณอัตโนมัติ)
          </label>
          <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600 font-medium">
            ฿{netPrice}
          </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          หมวดหมู่ <span className="text-red-500">*</span>
        </label>
        <CustomSelect
          value={formData.categoryId || 1}
          onChange={handleCategoryChange}
          icon={List}
          options={[
            { value: 1, label: "อาหารจานหลัก" },
            { value: 2, label: "ของหวาน" },
            { value: 3, label: "เครื่องดื่ม" },
          ]}
        />
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
            name="detail"
            value={formData.detail || ""}
            onChange={handleChange}
            placeholder="อธิบายเกี่ยวกับเมนูนี้..."
            rows="3"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white resize-none"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200 mt-2"
      >
        บันทึกการแก้ไข
      </button>
    </form>
  );
}

export default EditMenuForm;

import React, { useState, useEffect } from "react";

function EditCard({ menu, isVisible, onClose, onSave }) {
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

  if (!isVisible || !menu) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center items-center mb-5">
          <h2 className="text-lg font-bold ">แก้ไขเมนู</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* รูปภาพ (แสดงรูปเก่า) */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              รูปภาพเมนู
            </label>
            <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm"
              />
            </div>
          </div>

          {/* ชื่อเมนู */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              ชื่อเมนู
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* คำอธิบาย */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              คำอธิบาย
            </label>
            <textarea
              name="detail"
              value={formData.detail || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            ></textarea>
          </div>

          {/* ราคา & ส่วนลด */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                ราคาเดิม (฿)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || 0}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                ราคาลด (฿)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount || 0}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                ราคาสุทธิ (฿)
              </label>
              <input
                type="text"
                value={netPrice}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* หมวดหมู่ (categoryId) */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              หมวดหมู่
            </label>
            <select
              name="categoryId"
              value={formData.categoryId || 1}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white"
            >
              <option value={1}>อาหารจานหลัก</option>
              <option value={2}>ของหวาน</option>
              <option value={3}>เครื่องดื่ม</option>
              {/* เพิ่มตัวเลือกอื่น ๆ ตาม Schema */}
            </select>
          </div>

          {/* ประเภทเมนู (menuTypeId) */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              ประเภทเมนู
            </label>
            <select
              name="menuTypeId"
              value={formData.menuTypeId || 1}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white"
            >
              <option value={1}>อาหาร</option>
              <option value={2}>เครื่องดื่ม</option>
              {/* เพิ่มตัวเลือกอื่น ๆ ตาม Schema */}
            </select>
          </div>

          {/* ปุ่มบันทึก/ยกเลิก */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              บันทึกการแก้ไข
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCard;

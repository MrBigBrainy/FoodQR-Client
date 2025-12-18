import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import EditDiscountForm from "@/components/discountAdmin/EditDiscountForm";
import { Trash2, AlertTriangle } from "lucide-react";

const MOCK_AUTH = {
  storeId: 1,
  token: "MOCK_ADMIN_JWT_TOKEN",
};
const ITEMS_PER_PAGE = 5;

function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editData, setEditData] = useState(null);

  const fetchDiscounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://localhost:3000/api/discount/get`, {
        headers: {
          Authorization: `Bearer ${MOCK_AUTH.token}`,
        },
      });

      const mapped = res.data.data.map((d) => ({
        id: d.id,
        code: d.code,
        description: d.name || d.description || "ไม่มีคำอธิบาย",
        value: d.amount,
        type: d.discountType,
        usage_count: d.count,
        usage_limit: d.maxCount || 0,
        status: d.isActive ? "ใช้งาน" : "หมดอายุ",
        raw: d,
      }));

      setDiscounts(mapped);
    } catch (err) {
      console.error("Error Fetch Discounts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [MOCK_AUTH.token]);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  async function handleConfirmDelete() {
    if (!deleteTarget) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/discount/delete/${deleteTarget.id}`,
        {
          headers: {
            Authorization: `Bearer ${MOCK_AUTH.token}`,
          },
        }
      );

      alert("ลบสำเร็จ!");
      setIsDeleteOpen(false);
      setDeleteTarget(null);
      setCurrentPage(1);
      fetchDiscounts();
    } catch (err) {
      console.error("Error deleting:", err.response?.data || err);
      alert("ลบไม่สำเร็จ: " + (err.response?.data?.message || err.message));
    }
  }

  function openEditModal(discount) {
    const d = discount.raw;

    setEditData({
      id: d.id,
      code: d.code,
      discountType: d.discountType,
      amount: d.amount,
      description: d.name || d.description, // Pass description/name correctly
      maxCount: d.maxCount || 0,
      startTime: d.startTime ? d.startTime.slice(0, 16) : "",
      endTime: d.endTime ? d.endTime.slice(0, 16) : "",
      isActive: d.isActive,
      storeId: MOCK_AUTH.storeId,
    });

    setIsEditOpen(true);
  }

  async function handleSaveEdit(formData) {
    if (!formData.code || formData.amount <= 0) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    const finalEditData = {
      ...formData,
      maxCount: formData.maxCount === 0 ? null : formData.maxCount,
      storeId: MOCK_AUTH.storeId,
    };

    try {
       await axios.put(
        `http://localhost:3000/api/discount/update/${editData.id}`,
        finalEditData,
        {
          headers: {
            Authorization: `Bearer ${MOCK_AUTH.token}`,
          },
        }
      );

      alert("แก้ไขสำเร็จ!");
      setIsEditOpen(false);
      fetchDiscounts();
    } catch (err) {
      console.error("Edit error:", err.response?.data || err);
      alert("แก้ไขไม่สำเร็จ: " + (err.response?.data?.message || err.message));
    }
  }

  const combinedFilteredDiscounts = discounts.filter((discount) => {
    const searchMatch =
      discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === "active") {
      return searchMatch && discount.status === "ใช้งาน";
    }
    if (filterStatus === "inactive") {
      return searchMatch && discount.status === "หมดอายุ";
    }
    return searchMatch;
  });
  const filteredDiscount = combinedFilteredDiscounts;

  const totalPages = Math.ceil(filteredDiscount.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentDiscounts = filteredDiscount.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };
  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-red-600">เกิดข้อผิดพลาด: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหารหัส/ชื่อคูปอง..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
        />
      </div>
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        {["all", "active", "inactive"].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusFilterChange(status)}
            className={`py-2 px-4 text-sm font-medium transition duration-150 capitalize ${
              filterStatus === status
                ? "border-b-2 border-red-600 text-red-600 font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {status === "all"
              ? "ทั้งหมด"
              : status === "active"
              ? "ใช้งาน"
              : "ไม่ใช้งาน"}{" "}
            (
            {status === "all"
              ? discounts.length
              : status === "active"
              ? discounts.filter((d) => d.status === "ใช้งาน").length
              : discounts.filter((d) => d.status === "หมดอายุ").length}
            )
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">
                รหัส/ชื่อ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                ส่วนลด
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                ใช้แล้ว
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDiscounts.map((discount) => (
              <tr key={discount.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {discount.code}
                  </div>
                  <div className="text-xs text-gray-500 truncate w-32">
                    {discount.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {discount.type === "baht"
                    ? `฿${discount.value}`
                    : `${discount.value}%`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {discount.usage_count} /{" "}
                  {discount.usage_limit === 0 ? "∞" : discount.usage_limit}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      discount.status === "ใช้งาน"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {discount.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => openEditModal(discount)}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => {
                      setDeleteTarget(discount);
                      setIsDeleteOpen(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}

            {currentDiscounts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  ไม่พบข้อมูลคูปอง
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-100">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            ย้อนกลับ
          </button>

          <span className="text-sm font-medium text-gray-700">
            หน้า {currentPage} จาก {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            ถัดไป
          </button>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="แก้ไขคูปอง"
        modalClassName="max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <EditDiscountForm 
          initialData={editData} 
          onSubmit={handleSaveEdit}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="ยืนยันการลบคูปอง"
        modalClassName="max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            ยืนยันการลบ?
          </h3>
          <p className="text-gray-600 mb-6">
            คุณต้องการลบคูปอง <span className="font-bold text-red-600">{deleteTarget?.code}</span> ใช่หรือไม่? 
            <br />การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleConfirmDelete}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
            >
              ลบเลย
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DiscountList;

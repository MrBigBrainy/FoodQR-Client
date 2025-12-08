import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

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
  const [editData, setEditData] = useState({
    id: "",
    code: "",
    discountType: "percent",
    amount: 0,
    maxCount: 0,
    startTime: "",
    endTime: "",
    isActive: true,
    storeId: MOCK_AUTH.storeId,
  });

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
      maxCount: d.maxCount || 0,
      startTime: d.startTime ? d.startTime.slice(0, 16) : "",
      endTime: d.endTime ? d.endTime.slice(0, 16) : "",
      isActive: d.isActive,
      storeId: MOCK_AUTH.storeId,
    });

    setIsEditOpen(true);
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  async function handleSaveEdit() {
    if (!editData.code || editData.amount <= 0) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    const finalEditData = {
      ...editData,
      maxCount: editData.maxCount === 0 ? null : editData.maxCount,

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
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">แก้ไขคูปอง</h2>

            <label className="text-sm">ชื่อคูปอง</label>
            <input
              className="border p-2 w-full mb-2 px-2"
              name="code"
              value={editData.code}
              onChange={handleEditChange}
              placeholder="Code"
            />
            <label className="text-sm">ประเภทคูปอง</label>
            <select
              className="border p-2 w-full mb-2"
              name="discountType"
              value={editData.discountType}
              onChange={handleEditChange}
            >
              <option value="percent">ลดเป็น %</option>
              <option value="baht">ลดเป็นบาท (฿)</option>
            </select>
            <label className="text-sm">ส่วนลด</label>
            <input
              className="border p-2 w-full mb-2"
              type="number"
              name="amount"
              value={editData.amount}
              onChange={handleEditChange}
              placeholder="Amount"
            />
            <label className="text-sm">จำกัดสิทธิ์คงเหลือ</label>
            <input
              className="border p-2 w-full mb-2"
              type="number"
              name="maxCount"
              value={editData.maxCount}
              onChange={handleEditChange}
              placeholder="Max Count"
            />

            <label className="text-sm">Start Time</label>
            <input
              className="border p-2 w-full mb-2"
              type="datetime-local"
              name="startTime"
              value={editData.startTime}
              onChange={handleEditChange}
            />

            <label className="text-sm">End Time</label>
            <input
              className="border p-2 w-full mb-2"
              type="datetime-local"
              name="endTime"
              value={editData.endTime}
              onChange={handleEditChange}
            />

            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={editData.isActive}
                onChange={handleEditChange}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-700"
              >
                เปิดใช้งานคูปอง
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={handleSaveEdit}
              >
                บันทึก
              </button>
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setIsEditOpen(false)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-bold text-red-600 mb-4">
              ยืนยันการลบคูปอง?
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              ต้องการลบคูปอง <b>{deleteTarget?.code}</b> ใช่หรือไม่?
            </p>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={handleConfirmDelete}
              >
                ลบเลย
              </button>
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setIsDeleteOpen(false)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiscountList;

import axios from "axios";
import AddmenuForm from "../components/addmenu/AddmenuForm";
import MenuCardAdmin from "../components/addmenu/MenuCardAdmin";
import React, { useEffect, useState } from "react";
import EditCard from "@/components/addmenu/EditCard";
import DeleteCard from "@/components/addmenu/DeleteCard";

function AdminAddMenu() {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMenu = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/store/menu");
      setMenus(response.data.data);
    } catch (error) {
      console.error("โหลดเมนูล้มเหลว", error);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    category: "",
    imageUrl: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleCreateMenu = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/store/menu",
        formData
      );
      console.log(" เพิ่มเมนูสำเร็จ:", res.data);
      console.log("test");
      getMenu();
      closeModal();
    } catch (err) {
      console.error(" เพิ่มเมนูล้มเหลว:", err);
    }
  };

  const handleEditClick = (menu) => {
    setSelectedMenu(menu);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (menuId, formData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/store/menu/${menuId}`,
        formData
      );
      console.log("update success");
      getMenu();
    } catch (error) {
      console.log("Failed to update:", error);
    }
    closeModal();
  };

  const handleDeleteClick = (menu) => {
    setSelectedMenu(menu);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (menuId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/store/menu/${menuId}`
      );
      console.log("delete success");
      getMenu();
    } catch (error) {
      console.log("Failed to delete:", error);
    }
    closeModal();
  };
  const closeModal = () => {
    setIsOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedMenu(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          จัดการเมนูอาหาร
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          + เพิ่มเมนู
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 ค้นหาเมนู..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="flex flex-wrap gap-4 ">
        {menus.map((menu) => (
          <MenuCardAdmin
            key={menu.id}
            menu={menu}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center ">
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-xl 
                      max-h-[90vh] overflow-y-auto p-6"
          >
            <AddmenuForm
              onSubmit={handleCreateMenu}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
      <EditCard
        menu={selectedMenu}
        isVisible={isEditModalOpen}
        onClose={closeModal}
        onSave={handleSaveEdit}
      />
      <DeleteCard
        menu={selectedMenu}
        isVisible={isDeleteModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default AdminAddMenu;

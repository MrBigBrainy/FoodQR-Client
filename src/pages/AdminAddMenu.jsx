import axios from "axios";
import AddmenuForm from "../components/addmenu/AddmenuForm";
import MenuCardAdmin from "../components/addmenu/MenuCardAdmin";
import React, { useEffect, useState } from "react";
import EditCard from "@/components/addmenu/EditCard";
import DeleteCard from "@/components/addmenu/DeleteCard";
import { useParams } from "react-router";
import useMenuStore from "@/stores/useMenuStore";
import { getStoreMenu } from "@/api/store.api";
import { motion } from "motion/react";
import { Plus, Search } from "lucide-react";

function AdminAddMenu() {
  const { storeId } = useParams();
  const { setMenu } = useMenuStore.getState();
  const menu = useMenuStore((store) => store.menu);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;

    const getMenu = async () => {
      useMenuStore.getState().setLoading(true);
      try {
        const response = await getStoreMenu(storeId);
        console.log("Menu data:", response.data);
        setMenu(response.data.menu);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        useMenuStore.getState().setLoading(false);
      }
    };

    getMenu();
  }, [storeId, setMenu]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getMenu = async () => {
     // Re-fetch logic if needed for updates, though store might handle it.
     // For now reusing the logic from useEffect but as a function if needed by child components
      if (!storeId) return;
      try {
        const response = await getStoreMenu(storeId);
        setMenu(response.data.menu);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
  };

  const handleCreateMenu = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/store/menu",
        formData
      );
      console.log(" เพิ่มเมนูสำเร็จ:", res.data);
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

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 pt-6 max-w-7xl mx-auto min-h-screen flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            จัดการเมนูอาหาร
          </h1>
          <p className="text-gray-500 text-sm">
            เพิ่ม ลบ แก้ไข รายการอาหารของคุณ
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-200 flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          <span>เพิ่มเมนู</span>
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="ค้นหาเมนู..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-white shadow-sm"
        />
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMenu.map((menu) => (
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6"
          >
            <AddmenuForm
              onSubmit={handleCreateMenu}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
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
    </motion.div>
  );
}

export default AdminAddMenu;


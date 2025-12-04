import AddmenuForm from '../components/addmenu/AddmenuForm';
import MenuCardAdmin from '../components/addmenu/MenuCardAdmin';
import React, { useState } from 'react'

function AdminAddMenu() {
    const [menus, setMenus] = useState([
        {
            id: 1,
            name: "ซูชิเนื้อยูคิมากิโรล",
            price: 220,
            discount: 10,
            netPrice: 210,
            category: "ซูชิ",
            imageUrl: "https://images.unsplash.com/photo-1604908177522-050b22a9d19f",
            isAvailable: false,
        },
        {
            id: 2,
            name: "ข้าวหน้าแซลมอน",
            price: 180,
            discount: 20,
            netPrice: 160,
            category: "ข้าว",
            imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
            isAvailable: true,
        },
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        discount: "",
        category: "",
        imageUrl: "",
    });

    const handleCreateMenu = async (data) => {
        try {
            // const res = await axios.post("http://localhost:3000/api/menu", data);
            // console.log("✅ เพิ่มเมนูสำเร็จ:", res.data);
            console.log('test')
        } catch (err) {
            console.error("❌ เพิ่มเมนูล้มเหลว:", err);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">จัดการเมนูอาหาร</h2>
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
                        onEdit={() => alert(`แก้ไขเมนู: ${menu.name}`)}
                        onDelete={() => alert(`ลบเมนู: ${menu.name}`)}
                    />
                ))}
            </div>


            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 backdrop-blur bg-white/30  bg-opacity-30 flex justify-center items-center">
                    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[500px]">
                        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">เพิ่มเมนูใหม่</h2> */}
                        <AddmenuForm onSubmit={handleCreateMenu} onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminAddMenu

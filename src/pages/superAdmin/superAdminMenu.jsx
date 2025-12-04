import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api/axios';
import { Search, Plus, X, Pencil, Trash } from 'lucide-react';

function SuperAdminMenu({ onNext, onBack }) {
    const [categories, setCategories] = useState([
        { id: 1, name: 'ซูชิ' },
        { id: 2, name: 'ซาซิมิ' },
        { id: 3, name: 'เครื่องดื่ม' }
    ]);
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'แซลมอนมากิ', price: 120.00, categoryId: 1, categoryName: 'ซูชิ' },
        { id: 2, name: 'ชาเขียว', price: 40.00, categoryId: 3, categoryName: 'เครื่องดื่ม' }
    ]);
    const [showMenuItemForm, setShowMenuItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [storeId] = useState(() => {
        return localStorage.getItem('storeId') || 1;
    });

    // Form for adding category
    const { register: registerCategory, handleSubmit: handleSubmitCategory, reset: resetCategory } = useForm();

    // Form for adding/editing menu item
    const { register: registerMenuItem, handleSubmit: handleSubmitMenuItem, reset: resetMenuItem, watch } = useForm({
        defaultValues: {
            itemName: '',
            price: '',
            categoryId: '',
            description: ''
        }
    });

    const selectedCategoryId = watch('categoryId');

    const onSubmitCategory = async (data) => {
        if (!data.categoryName || data.categoryName.trim() === '') return;
        
        try {
            // TODO: Call API to create category
            // const response = await api.post('/super-admin/menu/category', {
            //     storeId: storeId,
            //     categoryName: data.categoryName
            // });
            
            const newCategory = {
                id: categories.length + 1,
                name: data.categoryName
            };
            setCategories([...categories, newCategory]);
            resetCategory();
        } catch (error) {
            console.error('Error creating category:', error);
            alert('เกิดข้อผิดพลาดในการสร้างหมวดหมู่');
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?')) {
            return;
        }
        
        try {
            // TODO: Call API to delete category
            // await api.delete(`/super-admin/menu/category/${categoryId}`);
            
            setCategories(categories.filter(cat => cat.id !== categoryId));
            // Also remove menu items in this category
            setMenuItems(menuItems.filter(item => item.categoryId !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('เกิดข้อผิดพลาดในการลบหมวดหมู่');
        }
    };

    const onSubmitMenuItem = async (data) => {
        try {
            const category = categories.find(cat => cat.id === parseInt(data.categoryId));
            
            // TODO: Call API to create/update menu item
            // if (editingItem) {
            //     await api.put(`/super-admin/menu/item/${editingItem.id}`, {
            //         itemName: data.itemName,
            //         price: parseFloat(data.price),
            //         categoryId: parseInt(data.categoryId),
            //         description: data.description
            //     });
            // } else {
            //     await api.post('/super-admin/menu/item', {
            //         storeId: storeId,
            //         categoryId: parseInt(data.categoryId),
            //         itemName: data.itemName,
            //         price: parseFloat(data.price),
            //         description: data.description
            //     });
            // }
            
            if (editingItem) {
                // Update existing item
                setMenuItems(menuItems.map(item => 
                    item.id === editingItem.id 
                        ? { ...item, name: data.itemName, price: parseFloat(data.price), categoryId: parseInt(data.categoryId), categoryName: category.name }
                        : item
                ));
            } else {
                // Add new item
                const newItem = {
                    id: menuItems.length + 1,
                    name: data.itemName,
                    price: parseFloat(data.price),
                    categoryId: parseInt(data.categoryId),
                    categoryName: category.name,
                    description: data.description
                };
                setMenuItems([...menuItems, newItem]);
            }
            
            resetMenuItem();
            setShowMenuItemForm(false);
            setEditingItem(null);
        } catch (error) {
            console.error('Error saving menu item:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกรายการอาหาร');
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        resetMenuItem({
            itemName: item.name,
            price: item.price,
            categoryId: item.categoryId.toString(),
            description: item.description || ''
        });
        setShowMenuItemForm(true);
    };

    const handleDeleteItem = async (itemId) => {
        if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
            return;
        }
        
        try {
            // TODO: Call API to delete menu item
            // await api.delete(`/super-admin/menu/item/${itemId}`);
            
            setMenuItems(menuItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert('เกิดข้อผิดพลาดในการลบรายการอาหาร');
        }
    };

    const handleCancelForm = () => {
        resetMenuItem();
        setShowMenuItemForm(false);
        setEditingItem(null);
    };

    return (
        <div className="w-full space-y-8">
            {/* Section 1: Manage Menu Categories */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">1. จัดการหมวดหมู่เมนู</h3>
                
                {/* Existing Categories */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center gap-2 bg-purple-400 text-white px-4 py-2 rounded-full"
                            >
                                <span>{category.name}</span>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="hover:text-red-200 transition-colors ml-2 cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-1 flex items-center justify-center w-5 h-5"
                                    title="ลบหมวดหมู่" 
                                >
                                    <X size={12} className="text-purple-600 group-hover:text-purple-700"/>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add New Category Form */}
                <form onSubmit={handleSubmitCategory(onSubmitCategory)} className="flex gap-2">
                    <input
                        {...registerCategory('categoryName')}
                        type="text"
                        placeholder="เพิ่มหมวดหมู่ใหม่"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                    <button
                        type="submit"
                        className="bg-purple-400 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition-colors flex items-center justify-center"
                    >
                        <Plus size={20} />
                    </button>
                </form>
            </div>

            {/* Section 2: Add Initial Menu Items */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    2. เพิ่มรายการอาหารเริ่มต้น ({menuItems.length} รายการ)
                </h3>

                {/* Add Menu Item Button */}
                {!showMenuItemForm && (
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setShowMenuItemForm(true)}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold"
                        >
                            <Plus size={20} />
                            เพิ่มรายการอาหาร
                        </button>
                    </div>
                )}

                {/* Menu Item Form */}
                {showMenuItemForm && (
                    <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                        <h4 className="text-md font-semibold text-gray-800 mb-4">
                            {editingItem ? 'แก้ไขรายการอาหาร' : 'เพิ่มรายการอาหารใหม่'}
                        </h4>
                        <form onSubmit={handleSubmitMenuItem(onSubmitMenuItem)} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    ชื่อรายการ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...registerMenuItem('itemName', { required: 'กรุณากรอกชื่อรายการ' })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                                    placeholder="เช่น แซลมอนมากิ"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        ราคา (฿) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        {...registerMenuItem('price', { 
                                            required: 'กรุณากรอกราคา',
                                            min: { value: 0, message: 'ราคาต้องมากกว่าหรือเท่ากับ 0' },
                                            valueAsNumber: true
                                        })}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                                        placeholder="เช่น 120.00"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        หมวดหมู่ <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...registerMenuItem('categoryId', { required: 'กรุณาเลือกหมวดหมู่' })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                                    >
                                        <option value="">เลือกหมวดหมู่</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    คำอธิบาย (ไม่บังคับ)
                                </label>
                                <textarea
                                    {...registerMenuItem('description')}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 resize-none"
                                    placeholder="คำอธิบายรายการอาหาร"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                >
                                    {editingItem ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelForm}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    ยกเลิก
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Menu Items List */}
                {menuItems.length > 0 ? (
                    <div className="space-y-3">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                            >
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        ฿{item.price.toFixed(2)} | หมวด: {item.categoryName}
                                    </p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <button
                                        onClick={() => handleEditItem(item)}
                                        className="text-blue-600 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                                        title="แก้ไข"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="text-red-600 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                        title="ลบ"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>ยังไม่มีรายการอาหาร</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SuperAdminMenu;


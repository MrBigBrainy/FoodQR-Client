import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api/axios';
import { Plus, Pencil, Trash } from 'lucide-react';

function SuperAdminTable({ onNext, onBack }) {
    const [tables, setTables] = useState([
        { id: 1, tableNumber: 'A-1', capacity: 4, tableType: 'indoor' },
        { id: 2, tableNumber: 'B-5', capacity: 2, tableType: 'outdoor' }
    ]);
    const [showTableForm, setShowTableForm] = useState(false);
    const [editingTable, setEditingTable] = useState(null);
    const [storeId] = useState(() => {
        return localStorage.getItem('storeId') || 1;
    });

    // Table types options
    const tableTypes = [
        { value: 'indoor', label: 'ในร้าน (Indoor)' },
        { value: 'outdoor', label: 'นอกร้าน (Outdoor)' },
        { value: 'vip', label: 'VIP' },
        { value: 'bar', label: 'บาร์ (Bar)' },
        { value: 'window', label: 'ริมหน้าต่าง (Window)' }
    ];

    // Form for adding/editing table
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            tableNumber: '',
            capacity: 1,
            tableType: 'indoor'
        }
    });

    const capacity = watch('capacity');

    const onSubmitTable = async (data) => {
        try {
            // TODO: Call API to create/update table
            // if (editingTable) {
            //     await api.put(`/super-admin/tables/${editingTable.id}`, {
            //         tableNumber: data.tableNumber,
            //         capacity: parseInt(data.capacity),
            //         tableType: data.tableType,
            //         storeId: storeId
            //     });
            // } else {
            //     await api.post('/super-admin/tables', {
            //         tableNumber: data.tableNumber,
            //         capacity: parseInt(data.capacity),
            //         tableType: data.tableType,
            //         storeId: storeId
            //     });
            // }
            
            if (editingTable) {
                // Update existing table
                setTables(tables.map(table => 
                    table.id === editingTable.id 
                        ? { ...table, tableNumber: data.tableNumber, capacity: parseInt(data.capacity), tableType: data.tableType }
                        : table
                ));
            } else {
                // Add new table
                const newTable = {
                    id: tables.length + 1,
                    tableNumber: data.tableNumber,
                    capacity: parseInt(data.capacity),
                    tableType: data.tableType
                };
                setTables([...tables, newTable]);
            }
            
            reset();
            setShowTableForm(false);
            setEditingTable(null);
        } catch (error) {
            console.error('Error saving table:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกโต๊ะ');
        }
    };

    const handleEditTable = (table) => {
        setEditingTable(table);
        reset({
            tableNumber: table.tableNumber,
            capacity: table.capacity,
            tableType: table.tableType
        });
        setShowTableForm(true);
    };

    const handleDeleteTable = async (tableId) => {
        if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโต๊ะนี้?')) {
            return;
        }
        
        try {
            // TODO: Call API to delete table
            // await api.delete(`/super-admin/tables/${tableId}`);
            
            setTables(tables.filter(table => table.id !== tableId));
        } catch (error) {
            console.error('Error deleting table:', error);
            alert('เกิดข้อผิดพลาดในการลบโต๊ะ');
        }
    };

    const handleCancelForm = () => {
        reset();
        setShowTableForm(false);
        setEditingTable(null);
    };

    const getTableTypeLabel = (typeValue) => {
        const type = tableTypes.find(t => t.value === typeValue);
        return type ? type.label : typeValue;
    };

    return (
        <div className="w-full space-y-6">
            {/* Instructions */}
            {/* <p className="text-gray-600 text-sm mb-4">
                กำหนดจำนวนโต๊ะ, หมายเลขโต๊ะ และความจุ
            </p> */}

            {/* Existing Tables List */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    รายการโต๊ะที่สร้าง ({tables.length})
                </h3>

                {tables.length > 0 ? (
                    <div className="space-y-3 mb-6">
                        {tables.map((table) => (
                            <div
                                key={table.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                            >
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800 mb-1">{table.tableNumber}</h4>
                                    <p className="text-sm text-gray-600">
                                        ความจุ: {table.capacity} ที่นั่ง | ประเภท: {getTableTypeLabel(table.tableType)}
                                    </p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <button
                                        onClick={() => handleEditTable(table)}
                                        className="text-blue-600 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                                        title="แก้ไข"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTable(table.id)}
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
                    <div className="text-center py-8 text-gray-500 mb-6">
                        <p>ยังไม่มีโต๊ะที่สร้าง</p>
                    </div>
                )}

                {/* Add New Table Form */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">
                        {editingTable ? 'แก้ไขโต๊ะ' : 'เพิ่มโต๊ะใหม่'}
                    </h4>
                    <form onSubmit={handleSubmit(onSubmitTable)} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                หมายเลขโต๊ะ (เช่น A-1) <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('tableNumber', { required: 'กรุณากรอกหมายเลขโต๊ะ' })}
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                                placeholder="เช่น A-1"
                            />
                            {errors.tableNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.tableNumber.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    ประเภทโต๊ะ <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('tableType', { required: 'กรุณาเลือกประเภทโต๊ะ' })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                                >
                                    {tableTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.tableType && (
                                    <p className="text-red-500 text-xs mt-1">{errors.tableType.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    ระบุหมายเลขโต๊ะและความจุ (จำนวนที่นั่ง) <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newCapacity = Math.max(1, capacity - 1);
                                            reset({ ...watch(), capacity: newCapacity });
                                        }}
                                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                    >
                                        -
                                    </button>
                                    <input
                                        {...register('capacity', { 
                                            required: 'กรุณาระบุความจุ',
                                            min: { value: 1, message: 'ความจุต้องมากกว่าหรือเท่ากับ 1' },
                                            valueAsNumber: true
                                        })}
                                        type="number"
                                        min="1"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 text-center"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newCapacity = capacity + 1;
                                            reset({ ...watch(), capacity: newCapacity });
                                        }}
                                        className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                                    >
                                        +
                                    </button>
                                </div>
                                {errors.capacity && (
                                    <p className="text-red-500 text-xs mt-1">{errors.capacity.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                            >
                                {editingTable ? 'บันทึกการแก้ไข' : 'เพิ่มโต๊ะ'}
                            </button>
                            {editingTable && (
                                <button
                                    type="button"
                                    onClick={handleCancelForm}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    ยกเลิก
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminTable;


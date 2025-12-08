import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getTableTypes, createTable, getTables, deleteTable, getZones, createTableType } from '@/api/admin.api';
import Modal from '@/components/Modal';

function TableAdmin() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
            defaultValues: {
            tableName: "",
            tableTypeId: "",
            zoneId: "",
        }
    });

    // Form for creating table types
    const { register: registerTableType, handleSubmit: handleSubmitTableType, formState: { errors: errorsTableType }, reset: resetTableType, watch: watchTableType } = useForm({
        defaultValues: {
            nameType: "",
            minSeat: "",
            maxSeat: "",
        }
    });

    const selectedTableTypeId = watch("tableTypeId");
    const minSeatValue = watchTableType("minSeat");
    
    // Modal states
    const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
    const [isManageTableTypesModalOpen, setIsManageTableTypesModalOpen] = useState(false);

    const [tableTypes, setTableTypes] = useState([]);
    const [zones, setZones] = useState([]);
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storeId, setStoreId] = useState(1); // TODO: Get from auth context or localStorage

    // Fetch table types and zones on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tableTypesRes = await getTableTypes();
                setTableTypes(tableTypesRes.data.tableTypes || []);

                const tablesRes = await getTables();
                setTables(tablesRes.data.tables || []);
                
                // Fetch zones if needed (assuming API exists and is needed)
                // const zonesRes = await getZones(storeId);
                // setZones(zonesRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [storeId]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const tableData = {
                tableName: data.tableName,
                tableTypeId: parseInt(data.tableTypeId),
                storeId: storeId,
                ...(data.zoneId && { zoneId: parseInt(data.zoneId) })
            };
            
            const response = await createTable(tableData);
            console.log("Table created:", response.data);
            
            // Refresh tables list
            const tablesRes = await getTables(storeId);
            setTables(tablesRes.data.tables || []);
            
            // Reset form and close modal
            reset();
            setIsAddTableModalOpen(false);
            alert("สร้างโต๊ะสำเร็จ!");
        } catch (error) {
            console.error("Error creating table:", error);
            alert("เกิดข้อผิดพลาดในการสร้างโต๊ะ");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTable = async (tableId) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโต๊ะนี้?")) {
            return;
        }
        
        try {
            await deleteTable(tableId);
            // Refresh tables list
            const tablesRes = await getTables(storeId);
            setTables(tablesRes.data.tables || []);
            alert("ลบโต๊ะสำเร็จ!");
        } catch (error) {
            console.error("Error deleting table:", error);
            alert("เกิดข้อผิดพลาดในการลบโต๊ะ");
        }
    };

    const onSubmitTableType = async (data) => {
        setLoading(true);
        try {
            const tableTypeData = {
                nameType: data.nameType,
                minSeat: parseInt(data.minSeat),
                maxSeat: parseInt(data.maxSeat),
                storeId: storeId,
            };
            
            const response = await createTableType(tableTypeData);
            console.log("Table type created:", response.data);
            
            // Refresh table types list
            const tableTypesRes = await getTableTypes();
            setTableTypes(tableTypesRes.data.tableTypes || []);
            
            // Reset form
            resetTableType();
            alert("สร้างประเภทโต๊ะสำเร็จ!");
        } catch (error) {
            console.error("Error creating table type:", error);
            alert("เกิดข้อผิดพลาดในการสร้างประเภทโต๊ะ");
        } finally {
            setLoading(false);
        }
    };

    const getSelectedTableType = (tableTypeId) => {
        return tableTypes.find(type => type.id === parseInt(tableTypeId));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">จัดการโต๊ะ</h2>
                    <p className="text-gray-500">จัดการและติดตามสถานะโต๊ะทั้งหมดในร้าน</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsManageTableTypesModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
                    >
                        <i className="fas fa-cog"></i>
                        จัดการประเภทโต๊ะ
                    </button>
                    <button
                        onClick={() => setIsAddTableModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md font-medium"
                    >
                        <i className="fas fa-plus"></i>
                        เพิ่มโต๊ะใหม่
                    </button>
                </div>
            </div>

            {/* Tables Grid */}
            <div className="bg-white p-6 rounded-xl shadow-lg min-h-[500px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        <i className="fas fa-th-large mr-2 text-red-500"></i>
                        ผังโต๊ะ
                    </h3>
                    <span className="text-sm text-gray-500">
                        ทั้งหมด {tables.length} โต๊ะ
                    </span>
                </div>
                
                {tables.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                        <i className="fas fa-chair text-5xl mb-4 opacity-50"></i>
                        <p className="text-lg font-medium">ยังไม่มีโต๊ะในระบบ</p>
                        <button 
                            onClick={() => setIsAddTableModalOpen(true)}
                            className="mt-2 text-red-500 hover:text-red-700 font-medium"
                        >
                            + เพิ่มโต๊ะแรกของคุณ
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {tables.map((table) => {
                            const tableType = tableTypes.find(type => type.id === table.tableTypeId);
                            const zone = zones.find(z => z.id === table.zoneId);
                            
                            return (
                                <div
                                    key={table.id}
                                    className={`relative group p-4 border rounded-xl transition-all duration-200 hover:shadow-md ${
                                        table.status === 'in_use' 
                                            ? 'border-green-200 bg-green-50' 
                                            : table.status === 'call_staff'
                                            ? 'border-yellow-200 bg-yellow-50'
                                            : table.status === 'pay_bill'
                                            ? 'border-blue-200 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-red-200'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="bg-white p-2 rounded-lg shadow-sm">
                                            <i className={`fas fa-chair text-xl ${
                                                table.status === 'in_use' ? 'text-green-500' : 
                                                table.status === 'available' ? 'text-gray-400' : 'text-gray-600'
                                            }`}></i>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteTable(table.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1"
                                            title="ลบโต๊ะ"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>

                                    <h4 className="font-bold text-xl text-gray-800 mb-1">
                                        {table.tableName}
                                    </h4>

                                    {tableType && (
                                        <p className="text-xs text-gray-500 mb-2">
                                            {tableType.nameType} ({tableType.minSeat}-{tableType.maxSeat} ที่นั่ง)
                                        </p>
                                    )}
                                    
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            table.status === 'in_use'
                                                ? 'bg-green-100 text-green-800'
                                                : table.status === 'call_staff'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : table.status === 'pay_bill'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                table.status === 'in_use' ? 'bg-green-500' :
                                                table.status === 'call_staff' ? 'bg-yellow-500' :
                                                table.status === 'pay_bill' ? 'bg-blue-500' :
                                                'bg-gray-400'
                                            }`}></span>
                                            {table.status === 'in_use' && 'มีลูกค้า'}
                                            {table.status === 'call_staff' && 'เรียกพนักงาน'}
                                            {table.status === 'pay_bill' && 'รอชำระเงิน'}
                                            {table.status === 'available' && 'ว่าง'}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => alert(`เปิดออเดอร์สำหรับโต๊ะ ${table.tableName}`)}
                                        className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                                    >
                                        <i className="fas fa-clipboard-list"></i>
                                        เปิดออเดอร์
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add Table Modal */}
            <Modal
                isOpen={isAddTableModalOpen}
                onClose={() => setIsAddTableModalOpen(false)}
                title="เพิ่มโต๊ะใหม่"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Table Name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            ชื่อโต๊ะ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <i className="fas fa-table"></i>
                            </span>
                            <input
                                {...register("tableName", { required: "กรุณากรอกชื่อโต๊ะ" })}
                                type="text"
                                placeholder="เช่น A-1, B-2"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.tableName && (
                            <p className="text-red-500 text-xs mt-1">{errors.tableName.message}</p>
                        )}
                    </div>

                    {/* Table Type */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            ประเภทโต๊ะ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                                <i className="fas fa-chair"></i>
                            </span>
                            <select
                                {...register("tableTypeId", { required: "กรุณาเลือกประเภทโต๊ะ" })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 appearance-none bg-white"
                            >
                                <option value="">เลือกประเภทโต๊ะ</option>
                                {tableTypes?.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.nameType} ({type.minSeat}-{type.maxSeat} ที่นั่ง)
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.tableTypeId && (
                            <p className="text-red-500 text-xs mt-1">{errors.tableTypeId.message}</p>
                        )}
                        {/* Display seat range for selected table type */}
                        {selectedTableTypeId && getSelectedTableType(selectedTableTypeId) && (
                            <p className="text-sm text-gray-600 mt-2">
                                <i className="fas fa-info-circle mr-1"></i>
                                จำนวนที่นั่ง: {getSelectedTableType(selectedTableTypeId).minSeat} - {getSelectedTableType(selectedTableTypeId).maxSeat} ที่นั่ง
                            </p>
                        )}
                    </div>

                    {/* Zone (Optional) */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            โซน (ไม่บังคับ)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                                <i className="fas fa-map-marker-alt"></i>
                            </span>
                            <select
                                {...register("zoneId")}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 appearance-none bg-white"
                            >
                                <option value="">ไม่ระบุโซน</option>
                                {zones.map((zone) => (
                                    <option key={zone.id} value={zone.id}>
                                        {zone.zoneName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-200 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "กำลังสร้าง..." : "สร้างโต๊ะ"}
                    </button>
                </form>
            </Modal>

            {/* Manage Table Types Modal */}
            <Modal
                isOpen={isManageTableTypesModalOpen}
                onClose={() => setIsManageTableTypesModalOpen(false)}
                title="จัดการประเภทโต๊ะ"
            >
                <div className="space-y-6">
                    <form onSubmit={handleSubmitTableType(onSubmitTableType)} className="space-y-4">
                        {/* Table Type Name */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                ชื่อประเภทโต๊ะ <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i className="fas fa-tag"></i>
                                </span>
                                <input
                                    {...registerTableType("nameType", { required: "กรุณากรอกชื่อประเภทโต๊ะ" })}
                                    type="text"
                                    placeholder="เช่น โต๊ะคู่, โต๊ะใหญ่"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errorsTableType.nameType && (
                                <p className="text-red-500 text-xs mt-1">{errorsTableType.nameType.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Min Seat */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    ที่นั่งขั้นต่ำ <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fas fa-users"></i>
                                    </span>
                                    <input
                                        {...registerTableType("minSeat", { 
                                            required: "ระบุ",
                                            min: { value: 1, message: "> 0" },
                                            valueAsNumber: true
                                        })}
                                        type="number"
                                        min="1"
                                        placeholder="เช่น 2"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 placeholder-gray-400"
                                    />
                                </div>
                                {errorsTableType.minSeat && (
                                    <p className="text-red-500 text-xs mt-1">{errorsTableType.minSeat.message}</p>
                                )}
                            </div>

                            {/* Max Seat */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    ที่นั่งสูงสุด <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i className="fas fa-users"></i>
                                    </span>
                                    <input
                                        {...registerTableType("maxSeat", { 
                                            required: "ระบุ",
                                            min: { value: 1, message: "> 0" },
                                            valueAsNumber: true,
                                            validate: (value) => {
                                                const minSeat = parseInt(minSeatValue) || 0;
                                                if (minSeat > 0 && value < minSeat) {
                                                    return "ต้อง >= ขั้นต่ำ";
                                                }
                                                return true;
                                            }
                                        })}
                                        type="number"
                                        min="1"
                                        placeholder="เช่น 4"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 placeholder-gray-400"
                                    />
                                </div>
                                {errorsTableType.maxSeat && (
                                    <p className="text-red-500 text-xs mt-1">{errorsTableType.maxSeat.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? "กำลังสร้าง..." : "สร้างประเภทโต๊ะ"}
                        </button>
                    </form>

                    {/* Display existing table types */}
                    {tableTypes.length > 0 && (
                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">ประเภทโต๊ะที่มีอยู่:</p>
                            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                {tableTypes?.map((type) => (
                                    <div key={type.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <span className="text-sm font-medium text-gray-700">
                                            {type.nameType}
                                        </span>
                                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                                            {type.minSeat}-{type.maxSeat} ที่นั่ง
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default TableAdmin;


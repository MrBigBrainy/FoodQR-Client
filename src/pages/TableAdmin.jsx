import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getTableTypes, createTable, getTables, deleteTable, getZones, createTableType } from '@/api/admin.api';

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
    const [showTableTypeForm, setShowTableTypeForm] = useState(false);

    const [tableTypes, setTableTypes] = useState([]);
    const [zones, setZones] = useState([]);
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storeId, setStoreId] = useState(1); // TODO: Get from auth context or localStorage

    // Fetch table types and zones on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const [tableTypesRes, zonesRes, tablesRes] = await Promise.all([
                //     // getTableTypes(storeId),
                //     // getZones(storeId),
                //     // getTables(storeId)
                //     // getTableTypes(1),
                //     // getZones(1),
                //     // getTables(1)
                // ]);
                const tableTypes = await getTableTypes();
                console.log(tableTypes.data.tableTypes)
                setTableTypes(tableTypes.data.tableTypes || []);


                const tables = await getTables();
                console.log(tables.data.tables)
                setTables(tables.data.tables || []);
                // console.log("tableTypes.data", tableTypesRes.data);
                // setZones(zonesRes.data || []);
                // setTables(tablesRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [storeId]);

    useEffect(() => {
        console.log("tableTypes", tableTypes);
        console.log("tables", tables)
    }, [tableTypes, tables])

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
            setTables(tablesRes.data || []);
            
            // Reset form
            reset();
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
            setTables(tablesRes.data || []);
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
            // const tableTypesRes = await getTableTypes(storeId);
            const tableTypes = await getTableTypes();
            setTableTypes(tableTypes || []);
            
            // Reset form and close
            resetTableType();
            setShowTableTypeForm(false);
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
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">จัดการโต๊ะ</h2>
                <p className="text-gray-500">จัดการและติดตามสถานะโต๊ะทั้งหมด</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Create Table Form */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Create Table Type Form */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">จัดการประเภทโต๊ะ</h3>
                            <button
                                onClick={() => setShowTableTypeForm(!showTableTypeForm)}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                                {showTableTypeForm ? (
                                    <><i className="fas fa-chevron-up mr-1"></i>ซ่อน</>
                                ) : (
                                    <><i className="fas fa-plus mr-1"></i>เพิ่มประเภทโต๊ะ</>
                                )}
                            </button>
                        </div>

                        {showTableTypeForm && (
                            <form onSubmit={handleSubmitTableType(onSubmitTableType)} className="space-y-4 border-t pt-4">
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

                                {/* Min Seat */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        จำนวนที่นั่งขั้นต่ำ <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <i className="fas fa-users"></i>
                                        </span>
                                        <input
                                            {...registerTableType("minSeat", { 
                                                required: "กรุณากรอกจำนวนที่นั่งขั้นต่ำ",
                                                min: { value: 1, message: "จำนวนที่นั่งต้องมากกว่า 0" },
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
                                        จำนวนที่นั่งสูงสุด <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <i className="fas fa-users"></i>
                                        </span>
                                        <input
                                            {...registerTableType("maxSeat", { 
                                                required: "กรุณากรอกจำนวนที่นั่งสูงสุด",
                                                min: { value: 1, message: "จำนวนที่นั่งต้องมากกว่า 0" },
                                                valueAsNumber: true,
                                                validate: (value) => {
                                                    const minSeat = parseInt(minSeatValue) || 0;
                                                    if (minSeat > 0 && value < minSeat) {
                                                        return "จำนวนที่นั่งสูงสุดต้องมากกว่าหรือเท่ากับจำนวนที่นั่งขั้นต่ำ";
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

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? "กำลังสร้าง..." : "สร้างประเภทโต๊ะ"}
                                </button>
                            </form>
                        )}

                        {/* Display existing table types */}
                        {tableTypes.length > 0 && (
                            <div className="mt-4 border-t pt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">ประเภทโต๊ะที่มีอยู่:</p>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {tableTypes?.map((type) => (
                                        <div key={type.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <span className="text-sm text-gray-700">
                                                {type.nameType} ({type.minSeat}-{type.maxSeat} ที่นั่ง)
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Create Table Form */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">เพิ่มโต๊ะใหม่</h3>
                        
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
                    </div>
                </div>

                {/* Right Column: Tables List */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">รายการโต๊ะทั้งหมด</h3>
                        
                        {tables.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <i className="fas fa-table text-4xl mb-4"></i>
                                <p>ยังไม่มีโต๊ะ</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tables.map((table) => {
                                    const tableType = tableTypes.find(type => type.id === table.tableTypeId);
                                    const zone = zones.find(z => z.id === table.zoneId);
                                    
                                    return (
                                        <div
                                            key={table.id}
                                            className={`p-4 border-2 rounded-lg ${
                                                table.status === 'in_use' 
                                                    ? 'border-green-500 bg-green-50' 
                                                    : table.status === 'call_staff'
                                                    ? 'border-yellow-500 bg-yellow-50'
                                                    : table.status === 'pay_bill'
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300 bg-white'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-800">
                                                        {table.tableName || `โต๊ะ #${table.id}`}
                                                    </h4>
                                                    {zone && (
                                                        <p className="text-sm text-gray-600">
                                                            <i className="fas fa-map-marker-alt mr-1"></i>
                                                            {zone.zoneName}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteTable(table.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                    title="ลบโต๊ะ"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            
                                            {tableType && (
                                                <div className="mb-2">
                                                    <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                                        {tableType.nameType}
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        ({tableType.minSeat}-{tableType.maxSeat} ที่นั่ง)
                                                    </span>
                                                </div>
                                            )}
                                            
                                            <div className="mt-2">
                                                <span className={`inline-block px-2 py-1 text-xs rounded ${
                                                    table.status === 'in_use'
                                                        ? 'bg-green-200 text-green-800'
                                                        : table.status === 'call_staff'
                                                        ? 'bg-yellow-200 text-yellow-800'
                                                        : table.status === 'pay_bill'
                                                        ? 'bg-blue-200 text-blue-800'
                                                        : 'bg-gray-200 text-gray-800'
                                                }`}>
                                                    {table.status === 'in_use' && 'มีลูกค้า'}
                                                    {table.status === 'call_staff' && 'เรียกพนักงาน'}
                                                    {table.status === 'pay_bill' && 'รอชำระเงิน'}
                                                    {table.status === 'available' && 'ว่าง'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableAdmin;

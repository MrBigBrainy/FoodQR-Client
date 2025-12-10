import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { getTableTypes, createTable, getTables, deleteTable, createTableType } from '@/api/admin.api';
import Modal from '@/components/Modal';
import CustomSelect from '@/components/CustomSelect';
import { createOrder } from '@/api/order.api';
import { useParams } from 'react-router';
import { updateTableStatus } from '@/api/table.api';
import CoffeeLoader from '@/components/loader/coffeeLoader';
import { motion, AnimatePresence } from 'motion/react';
import { socket } from '@/lib/socket';
import { 
  Plus, 
  Settings, 
  Trash2, 
  Users, 
  Armchair, 
  MapPin, 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  CreditCard,
  UtensilsCrossed,
  Info,
  Minus,
  XCircle,
  LogOut,
  ChevronDown
} from 'lucide-react';

function TableAdmin() {
    const {storeId} = useParams();
    const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm({
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
    
    // Open Order Modal State
    const [isOpenOrderModalOpen, setIsOpenOrderModalOpen] = useState(false);
    const [selectedTableForOrder, setSelectedTableForOrder] = useState(null);
    const [customerCount, setCustomerCount] = useState(1);

    const [tableTypes, setTableTypes] = useState([]);
    const [zones, setZones] = useState([]);
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch table types and zones on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const tableTypesRes = await getTableTypes();
                setTableTypes(tableTypesRes.data.tableTypes || []);

                const tablesRes = await getTables();
                setTables(tablesRes.data.tables || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [storeId]);

    useEffect(() => console.log(tables), [tables]);

    useEffect(() => {
  socket.on('statusTableUpdated', (updatedTable) => {
    setTables((prev) =>
      prev.map(o => o.id === updatedTable.id ? updatedTable : o)
    );
  });

  return () => socket.off('statusTableUpdated');
}, []);


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
            toast.success("สร้างโต๊ะสำเร็จ!");
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

    // Open Order Handlers
    const handleOpenOrderClick = (table) => {
        setSelectedTableForOrder(table);
        setCustomerCount(1); // Default to 1 customer
        setIsOpenOrderModalOpen(true);
    };

    const handleCloseOrder = async (table) => {
        if (!window.confirm(`ต้องการปิดออเดอร์และเคลียร์โต๊ะ ${table.tableName} ใช่หรือไม่?`)) {
            return;
        }

        try {
            const tableStatusData = {
                storeId: storeId,
                tableId: table.id,
                status: "available"
            }
            await updateTableStatus(tableStatusData)
            
            alert(`ปิดออเดอร์โต๊ะ ${table.tableName} เรียบร้อยแล้ว`);
            
            // Refresh tables to show new status
            const tablesRes = await getTables(storeId);
            setTables(tablesRes.data.tables || []);
            
        } catch (error) {
            console.error("Error closing table:", error);
            alert("เกิดข้อผิดพลาดในการปิดออเดอร์");
        }
    };

    const handleConfirmOpenOrder = async () => {
        if (!selectedTableForOrder) return;

        try {
            const orderData = {
                storeId: storeId,
                customerCount: customerCount,
                tableId: selectedTableForOrder.id,
            }
            await createOrder(orderData)

            const tableStatusData = {
                storeId: storeId,
                tableId: selectedTableForOrder.id,
                status: "in_use"
            }
            await updateTableStatus(tableStatusData)
            console.log(`Opening table ${selectedTableForOrder.tableName} with ${customerCount} customers`);
            
            // Open billing page in new tab
            window.open(`/billing?tableName=${encodeURIComponent(selectedTableForOrder.tableName)}`, '_blank');

            toast.success(`เปิดโต๊ะ ${selectedTableForOrder.tableName} สำหรับ ${customerCount} ท่าน เรียบร้อยแล้ว`);
            setIsOpenOrderModalOpen(false);
            setSelectedTableForOrder(null);
            
            // Refresh tables to show new status
            const tablesRes = await getTables(storeId);
            setTables(tablesRes.data.tables || []);
            
        } catch (error) {
            console.error("Error opening table:", error);
            alert("เกิดข้อผิดพลาดในการเปิดโต๊ะ");
        }
    };

    const adjustCustomerCount = (amount) => {
        setCustomerCount(prev => {
            const newValue = prev + amount;
            return newValue < 1 ? 1 : newValue;
        });
    };

    const getStatusStyles = (status) => {
        switch(status) {
            case 'in_use': return {
                card: 'bg-gradient-to-br from-white to-red-50 border-red-200 shadow-red-100',
                iconBg: 'bg-red-100 text-red-600',
                badge: 'bg-red-100 text-red-700 border-red-200',
                dot: 'bg-red-500',
                button: 'bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 shadow-sm'
            };
            case 'call_staff': return {
                card: 'bg-gradient-to-br from-white to-yellow-50 border-yellow-300 shadow-yellow-100',
                iconBg: 'bg-yellow-100 text-yellow-600',
                badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                dot: 'bg-yellow-500',
                button: 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-200'
            };
            case 'pay_bill': return {
                card: 'bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-blue-100',
                iconBg: 'bg-blue-100 text-blue-600',
                badge: 'bg-blue-100 text-blue-700 border-blue-200',
                dot: 'bg-blue-500',
                button: 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
            };
            case 'available': return {
                card: 'bg-white border-gray-200 hover:border-green-300 shadow-sm hover:shadow-green-100',
                iconBg: 'bg-green-50 text-green-600',
                badge: 'bg-green-50 text-green-700 border-green-100',
                dot: 'bg-green-500',
                button: 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
            };
            default: return {
                card: 'bg-white border-gray-200',
                iconBg: 'bg-gray-100 text-gray-600',
                badge: 'bg-gray-100 text-gray-600 border-gray-200',
                dot: 'bg-gray-400',
                button: 'bg-gray-800 text-white'
            };
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'in_use': return <UtensilsCrossed size={20} />;
            case 'call_staff': return <Clock size={20} />;
            case 'pay_bill': return <CreditCard size={20} />;
            case 'available': return <CheckCircle2 size={20} />;
            default: return <Armchair size={20} />;
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'in_use': return 'มีลูกค้า';
            case 'call_staff': return 'เรียกพนักงาน';
            case 'pay_bill': return 'รอชำระเงิน';
            case 'available': return 'ว่าง';
            default: return 'ไม่ทราบสถานะ';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">จัดการโต๊ะ</h2>
                    <p className="text-gray-500">จัดการและติดตามสถานะโต๊ะทั้งหมดในร้าน</p>
                </div>
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsManageTableTypesModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-medium"
                    >
                        <Settings size={18} />
                        จัดการประเภทโต๊ะ
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsAddTableModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-200 font-medium"
                    >
                        <Plus size={18} />
                        เพิ่มโต๊ะใหม่
                    </motion.button>
                </div>
            </div>

            {/* Tables Grid */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Armchair className="text-red-500" />
                        ผังโต๊ะ
                    </h3>
                    <span className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        ทั้งหมด {tables.length} โต๊ะ
                    </span>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <CoffeeLoader scale={0.6} />
                    </div>
                ) : tables.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-80 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <Armchair size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium text-gray-500">ยังไม่มีโต๊ะในระบบ</p>
                        <button 
                            onClick={() => setIsAddTableModalOpen(true)}
                            className="mt-2 text-red-600 hover:text-red-700 font-medium hover:underline"
                        >
                            + เพิ่มโต๊ะแรกของคุณ
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <AnimatePresence>
                            {tables.map((table) => {
                                const tableType = tableTypes.find(type => type.id === table.tableTypeId);
                                const styles = getStatusStyles(table.status);
                                
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={table.id}
                                        className={`relative group p-5 border rounded-2xl transition-all duration-300 hover:shadow-lg ${styles.card}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-xl shadow-sm ${styles.iconBg}`}>
                                                {getStatusIcon(table.status)}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteTable(table.id)}
                                                className="opacity-0 group-hover:opacity-100 transition-all text-gray-400 hover:text-red-500 p-1.5 hover:bg-white rounded-lg"
                                                title="ลบโต๊ะ"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <h4 className="font-bold text-2xl mb-1 tracking-tight text-gray-800">
                                            {table.tableName}
                                        </h4>

                                        {tableType && (
                                            <p className="text-xs font-medium text-gray-500 mb-3 flex items-center gap-1">
                                                <Users size={12} />
                                                {tableType.nameType} ({tableType.minSeat}-{tableType.maxSeat} ที่นั่ง)
                                            </p>
                                        )}
                                        
                                        <div className="mt-4 mb-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${styles.badge}`}>
                                                <span className={`w-2 h-2 rounded-full mr-2 ${styles.dot} animate-pulse`}></span>
                                                {getStatusText(table.status)}
                                            </span>
                                        </div>

                                        {table.status === 'in_use' ? (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleCloseOrder(table)}
                                                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${styles.button}`}
                                            >
                                                <LogOut size={16} />
                                                ปิดออเดอร์
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleOpenOrderClick(table)}
                                                className={`w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 ${styles.button}`}
                                            >
                                                <ClipboardList size={16} />
                                                เปิดออเดอร์
                                            </motion.button>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            ชื่อโต๊ะ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Armchair size={18} />
                            </span>
                            <input
                                {...register("tableName", { required: "กรุณากรอกชื่อโต๊ะ" })}
                                type="text"
                                placeholder="เช่น A-1, B-2"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                            />
                        </div>
                        {errors.tableName && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.tableName.message}</p>
                        )}
                    </div>

                    {/* Table Type */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            ประเภทโต๊ะ <span className="text-red-500">*</span>
                        </label>
                            <Controller
                                name="tableTypeId"
                                control={control}
                                rules={{ required: "กรุณาเลือกประเภทโต๊ะ" }}
                                render={({ field }) => (
                                    <CustomSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={tableTypes.map(type => ({
                                            value: type.id,
                                            label: `${type.nameType} (${type.minSeat}-${type.maxSeat} ที่นั่ง)`
                                        }))}
                                        placeholder="เลือกประเภทโต๊ะ"
                                        icon={Users}
                                        error={errors.tableTypeId}
                                    />
                                )}
                            />
                        {errors.tableTypeId && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.tableTypeId.message}</p>
                        )}
                        {/* Display seat range for selected table type */}
                        {selectedTableTypeId && getSelectedTableType(selectedTableTypeId) && (
                            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1 bg-red-50 p-2 rounded-lg border border-red-100">
                                <Info size={14} className="text-red-500" />
                                <span className="text-red-700 font-medium">จำนวนที่นั่ง:</span> {getSelectedTableType(selectedTableTypeId).minSeat} - {getSelectedTableType(selectedTableTypeId).maxSeat} ที่นั่ง
                            </p>
                        )}
                    </div>

                    {/* Zone (Optional) */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            โซน (ไม่บังคับ)
                        </label>
                            <Controller
                                name="zoneId"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={zones.map(zone => ({
                                            value: zone.id,
                                            label: zone.zoneName
                                        }))}
                                        placeholder="ไม่ระบุโซน"
                                        icon={MapPin}
                                    />
                                )}
                            />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none mt-2"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                ชื่อประเภทโต๊ะ <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Settings size={18} />
                                </span>
                                <input
                                    {...registerTableType("nameType", { required: "กรุณากรอกชื่อประเภทโต๊ะ" })}
                                    type="text"
                                    placeholder="เช่น โต๊ะคู่, โต๊ะใหญ่"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                />
                            </div>
                            {errorsTableType.nameType && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errorsTableType.nameType.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Min Seat */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    ที่นั่งขั้นต่ำ <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Users size={18} />
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
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                    />
                                </div>
                                {errorsTableType.minSeat && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">{errorsTableType.minSeat.message}</p>
                                )}
                            </div>

                            {/* Max Seat */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    ที่นั่งสูงสุด <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Users size={18} />
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
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                    />
                                </div>
                                {errorsTableType.maxSeat && (
                                    <p className="text-red-500 text-xs mt-1 font-medium">{errorsTableType.maxSeat.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none mt-2"
                        >
                            {loading ? "กำลังสร้าง..." : "สร้างประเภทโต๊ะ"}
                        </button>
                    </form>

                    {/* Display existing table types */}
                    {tableTypes.length > 0 && (
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-sm font-bold text-gray-700 mb-3">ประเภทโต๊ะที่มีอยู่:</p>
                            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                                {tableTypes?.map((type) => (
                                    <div key={type.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:border-red-100 transition-colors">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {type.nameType}
                                        </span>
                                        <span className="text-xs font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                                            {type.minSeat}-{type.maxSeat} ที่นั่ง
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>

            {/* Open Order Modal */}
            <Modal
                isOpen={isOpenOrderModalOpen}
                onClose={() => setIsOpenOrderModalOpen(false)}
                title=""
                backdropClassName="bg-black/40 backdrop-blur-md"
                modalClassName="max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50"
            >
                <div className="pt-2 pb-6 px-4">
                    {/* Header Section */}
                    <div className="text-center mb-8 relative">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-red-50 to-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-red-100/50 border border-red-50 relative z-10">
                            <UtensilsCrossed className="text-red-500 drop-shadow-sm" size={32} strokeWidth={2} />
                        </div>
                        {/* Decorative background blur behind icon */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -z-0"></div>
                        
                        <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-1">
                            เปิดโต๊ะ {selectedTableForOrder?.tableName}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium">
                            ระบุจำนวนลูกค้าที่จะใช้บริการ
                        </p>
                    </div>

                    {/* Counter Section */}
                    <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 mb-8 relative overflow-hidden group">
                        {/* Subtle pattern */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        
                        <div className="flex items-center justify-between relative z-10">
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => adjustCustomerCount(-1)}
                                className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:shadow-lg hover:shadow-red-50 flex items-center justify-center transition-all duration-300"
                            >
                                <Minus size={22} strokeWidth={2.5} />
                            </motion.button>
                            
                            <div className="text-center relative">
                                <input
                                    type="number"
                                    min="1"
                                    value={customerCount}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === '') {
                                            setCustomerCount('');
                                        } else {
                                            const num = parseInt(val);
                                            if (!isNaN(num) && num >= 1) setCustomerCount(num);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (customerCount === '' || customerCount < 1) setCustomerCount(1);
                                    }}
                                    className="block w-32 text-6xl font-black text-gray-800 text-center bg-transparent border-b-2 border-gray-200 focus:border-red-500 focus:outline-none p-0 pb-2 tabular-nums leading-none tracking-tighter appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none transition-colors"
                                />
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 block">
                                    ท่าน
                                </span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => adjustCustomerCount(1)}
                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-200 hover:shadow-red-300 hover:from-red-600 hover:to-red-700 flex items-center justify-center transition-all duration-300"
                            >
                                <Plus size={22} strokeWidth={2.5} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsOpenOrderModalOpen(false)}
                            className="px-4 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors text-sm"
                        >
                            ยกเลิก
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConfirmOpenOrder}
                            className="px-4 py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <span>ยืนยันเปิดโต๊ะ</span>
                            <CheckCircle2 size={18} className="text-white" />
                        </motion.button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TableAdmin;


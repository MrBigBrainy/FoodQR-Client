import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api/axios';
import { Plus, Pencil, Trash, ChevronDown } from 'lucide-react';

function SuperAdminManage({ onNext, onBack }) {
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Admin', role: 'admin', roleLabel: 'ร้าน', description: 'ผู้ดูแลระบบ' },
        { id: 2, name: 'Chef', role: 'chef', roleLabel: 'ครัว', description: 'หัวหน้าครัว' }
    ]);
    const [editingAccount, setEditingAccount] = useState(null);
    const [storeId] = useState(() => {
        return localStorage.getItem('storeId') || 1;
    });

    // Staff role options
    const staffRoles = [
        { value: 'admin', label: 'Admin', roleLabel: 'ร้าน', description: 'ผู้ดูแลระบบ' },
        { value: 'manager', label: 'Manager', roleLabel: 'ร้าน', description: 'ผู้จัดการ' },
        { value: 'chef', label: 'Chef', roleLabel: 'ครัว', description: 'หัวหน้าครัว' }
    ];

    // Form for adding/editing account
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            staffName: '',
            role: 'admin'
        }
    });

    const selectedRole = watch('role');

    const onSubmitAccount = async (data) => {
        try {
            const roleData = staffRoles.find(r => r.value === data.role);
            
            // TODO: Call API to create/update account
            // if (editingAccount) {
            //     await api.put(`/super-admin/accounts/${editingAccount.id}`, {
            //         name: data.staffName,
            //         role: data.role,
            //         storeId: storeId
            //     });
            // } else {
            //     await api.post('/super-admin/accounts', {
            //         name: data.staffName,
            //         role: data.role,
            //         storeId: storeId
            //     });
            // }
            
            if (editingAccount) {
                // Update existing account
                setAccounts(accounts.map(account => 
                    account.id === editingAccount.id 
                        ? { 
                            ...account, 
                            name: data.staffName, 
                            role: data.role,
                            roleLabel: roleData.roleLabel,
                            description: roleData.description
                        }
                        : account
                ));
            } else {
                // Add new account
                const newAccount = {
                    id: accounts.length + 1,
                    name: data.staffName,
                    role: data.role,
                    roleLabel: roleData.roleLabel,
                    description: roleData.description
                };
                setAccounts([...accounts, newAccount]);
            }
            
            reset();
            setEditingAccount(null);
        } catch (error) {
            console.error('Error saving account:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกบัญชี');
        }
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        reset({
            staffName: account.name,
            role: account.role
        });
    };

    const handleDeleteAccount = async (accountId) => {
        if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีนี้?')) {
            return;
        }
        
        try {
            // TODO: Call API to delete account
            // await api.delete(`/super-admin/accounts/${accountId}`);
            
            setAccounts(accounts.filter(account => account.id !== accountId));
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('เกิดข้อผิดพลาดในการลบบัญชี');
        }
    };

    const handleCancelForm = () => {
        reset();
        setEditingAccount(null);
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'text-blue-600';
            case 'manager':
                return 'text-green-600';
            case 'chef':
                return 'text-orange-600';
            default:
                return 'text-gray-600';
        }
    };

    const getRoleBgColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-blue-50';
            case 'manager':
                return 'bg-green-50';
            case 'chef':
                return 'bg-orange-50';
            default:
                return 'bg-gray-50';
        }
    };

    return (
        <div className="w-full space-y-6">
            {/* Instructions */}
            {/* <p className="text-gray-600 text-sm mb-4">
                ตั้งรหัสผ่านสำหรับ Admin, Manager และ Chef
            </p> */}

            {/* Existing Accounts List */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    รายการบัญชี ({accounts.length})
                </h3>

                {accounts.length > 0 ? (
                    <div className="space-y-3 mb-6">
                        {accounts.map((account) => {
                            const roleData = staffRoles.find(r => r.value === account.role);
                            return (
                                <div
                                    key={account.id}
                                    className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800 mb-1">
                                            {account.name} ({account.roleLabel})
                                        </h4>
                                        <p className={`text-sm ${getRoleColor(account.role)}`}>
                                            {account.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <button
                                            onClick={() => handleEditAccount(account)}
                                            className="text-blue-600 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                                            title="แก้ไข"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAccount(account.id)}
                                            className="text-red-600 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                            title="ลบ"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 mb-6">
                        <p>ยังไม่มีบัญชีที่สร้าง</p>
                    </div>
                )}

                {/* Add New Account Form */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">
                        {editingAccount ? 'แก้ไขบัญชี' : 'เพิ่มบัญชีใหม่'}
                    </h4>
                    <form onSubmit={handleSubmit(onSubmitAccount)} className="space-y-4">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    ชื่อพนักงาน/ผู้ดูแล <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('staffName', { required: 'กรุณากรอกชื่อพนักงาน/ผู้ดูแล' })}
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                                    placeholder="ชื่อพนักงาน/ผู้ดูแล"
                                />
                                {errors.staffName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.staffName.message}</p>
                                )}
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Staff <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        {...register('role', { required: 'กรุณาเลือกประเภท Staff' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 appearance-none pr-10"
                                    >
                                        {staffRoles.map((role) => (
                                            <option key={role.value} value={role.value}>
                                                {role.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown 
                                        size={20} 
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                                    />
                                </div>
                                {errors.role && (
                                    <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                                )}
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center min-w-[50px]"
                                    title={editingAccount ? 'บันทึกการแก้ไข' : 'เพิ่มบัญชี'}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {editingAccount && (
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleCancelForm}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    ยกเลิก
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminManage;


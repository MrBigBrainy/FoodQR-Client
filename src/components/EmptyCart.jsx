import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';


const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="bg-gray-100 rounded-full p-8 mb-6 flex items-center justify-center w-32 h-32">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">ตะกร้าว่างเปล่า</h2>
            <p className="text-gray-500 mb-8">เพิ่มเมนูอาหารเข้าตะกร้า</p>
            <Link to="/" className="bg-[#C10007] text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-[#a30006] transition-colors w-full max-w-xs cursor-pointer">
                เลือกเมนูอาหาร
            </Link>
        </div>
    );
};

export default EmptyCart;

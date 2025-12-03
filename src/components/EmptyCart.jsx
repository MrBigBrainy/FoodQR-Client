import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from "motion/react";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] h-full pb-16 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="relative mb-8"
            >
                {/* Decorative background elements */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-60 transform -translate-y-2"
                />
                
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="relative bg-white p-8 rounded-full shadow-xl ring-1 ring-gray-100"
                >
                    <ShoppingCart className="w-20 h-20 text-[#C10007]" strokeWidth={1.5} />
                    
                    {/* Floating badge */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-2 -right-2 bg-gray-900 text-white text-md font-bold px-3 py-1 rounded-full shadow-lg"
                    >
                        0
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center max-w-md"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">
                    ตะกร้าของคุณว่างเปล่า
                </h2>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    ดูเหมือนว่าคุณยังไม่ได้เลือกเมนูอาหารเลย <br/>
                    ลองดูเมนูแนะนำของเราสิ!
                </p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center justify-center gap-2 bg-[#C10007] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-[#a30006] hover:shadow-xl transition-all duration-300"
                    >
                        <span>เลือกเมนูอาหาร</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default EmptyCart;

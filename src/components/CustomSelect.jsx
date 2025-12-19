import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ 
    value, 
    onChange, 
    options = [], 
    placeholder = "Select option", 
    icon: Icon,
    error,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger Button */}
            <div 
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`
                    w-full ${Icon ? 'pl-10' : 'pl-4'} pr-10 py-3 border rounded-xl cursor-pointer transition-all duration-200
                    flex items-center justify-between bg-gray-50 hover:bg-white
                    ${isOpen ? 'ring-2 ring-red-500/20 border-red-500 bg-white' : 'border-gray-200'}
                    ${error ? 'border-red-500 ring-2 ring-red-500/20' : ''}
                    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                `}
            >
                {Icon && (
                    <span className="absolute left-3 text-gray-400">
                        <Icon size={18} />
                    </span>
                )}
                
                <span className={`block truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-800'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <span className={`absolute right-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                </span>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar p-1.5"
                    >
                        {options.length === 0 ? (
                            <div className="p-3 text-center text-gray-400 text-sm">
                                ไม่มีข้อมูล
                            </div>
                        ) : (
                            options.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`
                                        flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-colors mb-0.5 last:mb-0
                                        ${value === option.value 
                                            ? 'bg-red-50 text-red-600' 
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                                        }
                                    `}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <Check size={16} className="text-red-600" />
                                    )}
                                </div>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;

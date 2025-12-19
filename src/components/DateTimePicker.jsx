import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, X, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DateTimePicker = ({ label, value, onChange, minDate, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse initial value or use current date
  const initialDate = value ? new Date(value) : new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [viewDate, setViewDate] = useState(initialDate); // For navigating months

  // Time state
  const [time, setTime] = useState({
    hours: initialDate.getHours(),
    minutes: initialDate.getMinutes()
  });

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setViewDate(date);
      setTime({
        hours: date.getHours(),
        minutes: date.getMinutes()
      });
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const handleDateClick = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    newDate.setHours(time.hours);
    newDate.setMinutes(time.minutes);
    
    setSelectedDate(newDate);
    updateParent(newDate);
  };

  const handleTimeChange = (type, val) => {
    let newTime = { ...time };
    if (type === 'hours') {
      newTime.hours = Math.min(23, Math.max(0, parseInt(val) || 0));
    } else {
      newTime.minutes = Math.min(59, Math.max(0, parseInt(val) || 0));
    }
    setTime(newTime);
    
    const newDate = new Date(selectedDate);
    newDate.setHours(newTime.hours);
    newDate.setMinutes(newTime.minutes);
    updateParent(newDate);
  };

  const updateParent = (date) => {
    // Format to YYYY-MM-DDTHH:mm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    onChange(`${year}-${month}-${day}T${hours}:${minutes}`);
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(viewDate);
    const startDay = firstDayOfMonth(viewDate);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    // Days of current month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), i);
      const isSelected = selectedDate.getDate() === i && 
                        selectedDate.getMonth() === viewDate.getMonth() && 
                        selectedDate.getFullYear() === viewDate.getFullYear();
      const isToday = new Date().getDate() === i && 
                      new Date().getMonth() === viewDate.getMonth() && 
                      new Date().getFullYear() === viewDate.getFullYear();

      days.push(
        <button
          key={i}
          onClick={(e) => { e.preventDefault(); handleDateClick(i); }}
          className={`
            h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
            ${isSelected 
              ? 'bg-red-600 text-white shadow-md shadow-red-200' 
              : isToday 
                ? 'bg-red-50 text-red-600 font-bold border border-red-200'
                : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  // Format display value to match design: "31 ธ.ค. 2568 01:07 น."
  const formatDisplayValue = (dateValue) => {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist Era
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} ${hours}:${minutes} น.`;
  };

  const displayValue = value ? formatDisplayValue(value) : '';

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Trigger Input */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full pl-4 pr-4 py-3 border rounded-xl cursor-pointer transition-all duration-200
          flex items-center justify-between bg-gray-50 hover:bg-white
          ${isOpen ? 'ring-2 ring-red-500/20 border-red-500 bg-white' : 'border-gray-200'}
        `}
      >
        <div className="flex items-center gap-3 text-gray-700">
          <span className={`font-medium ${!value ? 'text-gray-400' : 'text-gray-800'}`}>
            {displayValue || 'เลือกวันและเวลา'}
          </span>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full mb-2 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 w-[320px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={(e) => { e.preventDefault(); changeMonth(-1); }}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="font-bold text-gray-800">
                {months[viewDate.getMonth()]} {viewDate.getFullYear() + 543}
              </h3>
              <button 
                onClick={(e) => { e.preventDefault(); changeMonth(1); }}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                <div key={day} className="text-xs font-bold text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {renderCalendarDays()}
            </div>

            {/* Time Picker */}
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-800">เวลา</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Hours Input with Up/Down Buttons */}
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={String(time.hours).padStart(2, '0')}
                    onChange={(e) => handleTimeChange('hours', e.target.value)}
                    className="w-14 px-2 py-2 text-center border border-red-200 rounded-lg text-sm font-medium focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none bg-white"
                  />
                  <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTimeChange('hours', time.hours + 1);
                      }}
                      className="p-0.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ChevronUp size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTimeChange('hours', time.hours - 1);
                      }}
                      className="p-0.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ChevronDown size={12} />
                    </button>
                  </div>
                </div>
                <span className="text-gray-400 text-lg font-medium">:</span>
                {/* Minutes Input with Up/Down Buttons */}
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={String(time.minutes).padStart(2, '0')}
                    onChange={(e) => handleTimeChange('minutes', e.target.value)}
                    className="w-14 px-2 py-2 text-center border border-gray-200 rounded-lg text-sm font-medium focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none bg-white"
                  />
                  <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTimeChange('minutes', time.minutes + 1);
                      }}
                      className="p-0.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ChevronUp size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTimeChange('minutes', time.minutes - 1);
                      }}
                      className="p-0.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ChevronDown size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
              className="w-full mt-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
            >
              ตกลง
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateTimePicker;

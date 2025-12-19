import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Info } from 'lucide-react';
import useUIStore from '@/stores/useUIStore';

const BillSplitInstructionModal = () => {
  const { hasSeenBillSplitInstruction, setHasSeenBillSplitInstruction } = useUIStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal if user hasn't seen the instruction
    if (!hasSeenBillSplitInstruction) {
        // Small delay to ensure it doesn't clash with initial render or other animations
        const timer = setTimeout(() => setIsOpen(true), 500);
        return () => clearTimeout(timer);
    }
  }, [hasSeenBillSplitInstruction]);

  const handleConfirm = () => {
    setHasSeenBillSplitInstruction(true);
    setIsOpen(false);
  };

  const handleClose = () => {
      // If they close via X or backdrop, we can choose to either 
      // set it as seen or just close it for now. 
      // The user request said "when user click ยืนยัน, it will not disturb user again".
      // So maybe just closing it doesn't set the flag? 
      // But usually for UX, closing means "I've seen it". 
      // Let's set it as seen to avoid annoyance.
      setHasSeenBillSplitInstruction(true);
      setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="คำแนะนำ"
      modalClassName="max-w-md"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-2">
          <Info size={32} className="text-orange-500" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-gray-900">แยกบิลได้ง่ายๆ</h4>
          <p className="text-gray-600 leading-relaxed">
            หากต้องการแยกบิล ลูกค้าทุกท่านสามารถ<br />
            <span className="font-semibold text-gray-800">สแกนและสั่งอาหารของตัวเองได้เลยค่ะ</span>
          </p>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-[#C10007] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-200 hover:bg-[#a30006] active:scale-95 transition-all duration-200"
        >
          ยืนยัน
        </button>
      </div>
    </Modal>
  );
};

export default BillSplitInstructionModal;

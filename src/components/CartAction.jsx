import React from "react";
import { ArrowLeft, Bell, Receipt } from "lucide-react";
import { Link } from "react-router";
//onclick bg-color #FF6900
const MenuActions = () => {
  const handleBackClick = () => console.log("Go back to menu clicked");
  const handleCallStaffClick = () => console.log("Call staff clicked");
  const handleCheckBillClick = () => console.log("Check bill clicked");
  //test
  return (
    <div className="bg-white p-4 max-w-lg mx-auto  pt-25 ">
      <Link
        to="/"
        className="flex items-center text-gray-700 cursor-pointer mb-5 w-[90%]"
        // onClick={handleBackClick}
      >
        <ArrowLeft className="w-5 h-5" />

        <span className="ml-2 text-base">กลับไปเลือกเมนู</span>
      </Link>
      <div className="flex space-x-4">
        <div className="flex justify-between w-full space-x-4">
          <button className="bg-[#C10007] flex gap-2 justify-center items-center text-white font-medium py-2 px-3 rounded-lg shadow-md hover:bg-[#a30006] transition-colors w-full cursor-pointer">
            <Bell className="w-5 h-5 mr-2" />
            <p>เรียกพนักงาน</p>
          </button>

          <button className="bg-[#C10007] flex gap-2 justify-center items-center text-white font-medium py-2 px-3 rounded-lg shadow-md hover:bg-[#a30006] transition-colors w-full cursor-pointer">
            <Receipt className="w-5 h-5 mr-2" />
            <p>เช็คบิล</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuActions;

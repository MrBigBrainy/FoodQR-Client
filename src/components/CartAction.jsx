import React from "react";
import { ArrowLeft, Bell } from "lucide-react";
import { Link, useParams } from "react-router";
//onclick bg-color #FF6900
const MenuActions = ({ onCallStaff, staffCalled }) => {
  const { storeId, tableId } = useParams();
  const handleBackClick = () => console.log("Go back to menu clicked");

  //test
  return (
    <div className="bg-white p-4 max-w-lg mx-auto  pt-4 ">
      <Link
        to={`/store/${storeId}/table/${tableId}`}
        className="flex items-center text-gray-700 cursor-pointer mb-5 w-[90%]"
        // onClick={handleBackClick}
      >
        <ArrowLeft className="w-5 h-5" />

        <span className="ml-2 text-base">กลับไปเลือกเมนู</span>
      </Link>
      <div className="flex space-x-4">
        <div className="flex justify-between w-full space-x-4">
          <button 
            onClick={onCallStaff}
            disabled={staffCalled}
            className={`${staffCalled ? 'bg-[#C10007] text-white' : 'bg-white border border-[#C10007] text-[#C10007]'} flex gap-2 justify-center items-center font-medium py-2 px-3 rounded-lg shadow-md transition-colors w-full cursor-pointer`}
          >
            <Bell className={`w-5 h-5 mr-2 ${staffCalled ? 'animate-bounce' : ''}`} />
            <p>{staffCalled ? 'พนักงานกำลังมา...' : 'เรียกพนักงาน'}</p>
          </button>


        </div>
      </div>
    </div>
  );
};

export default MenuActions;

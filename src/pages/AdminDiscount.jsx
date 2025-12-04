import CreateDiscountForm from "@/components/discountAdmin/CreateDiscountForm";
import DiscountData from "@/components/discountAdmin/DiscountData";
import DiscountList from "@/components/discountAdmin/DiscountList";
import React from "react";

function AdminDiscount() {
  return (
    <div className="p-4 md:p-8 pt-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="text-5xl md:text-4xl mr-3 text-red-600 font-extrabold">
            %
          </span>
          <h1 className="text-5xl md:text-3xl font-bold text-gray-800">
            ระบบจัดการส่วนลด
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        <div className="md:col-span-1">
          <CreateDiscountForm />
        </div>
        <div className="md:col-span-2 space-y-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <DiscountData />
          </div>
          <DiscountList />
        </div>
      </div>
    </div>
  );
}

export default AdminDiscount;

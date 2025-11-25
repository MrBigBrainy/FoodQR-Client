import React from "react";

function Header() {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-40 p-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex">
          <div className="font-bold text-xl text-red-600">Food App Logo</div>
          <div className="font-bold text-xl text-red-600">Name</div>
        </div>
        <div className="text-lg text-gray-700 ">Table Number</div>
      </div>
    </header>
  );
}

export default Header;

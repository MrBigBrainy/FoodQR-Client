import React from 'react';

const DeliveryLoader = () => {
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-red-500 to-red-700 overflow-hidden flex items-center justify-center font-['Open_Sans',sans-serif]">
      {/* CSS Styles Block */}
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,600');

        @keyframes speeder {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -3px) rotate(-1deg); }
          20% { transform: translate(-2px, 0px) rotate(1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 3px) rotate(-1deg); }
          60% { transform: translate(-1px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-2px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        @keyframes fazer1 { 0% { left: 0; } 100% { left: -80px; opacity: 0; } }
        @keyframes fazer2 { 0% { left: 0; } 100% { left: -100px; opacity: 0; } }
        @keyframes fazer3 { 0% { left: 0; } 100% { left: -50px; opacity: 0; } }
        @keyframes fazer4 { 0% { left: 0; } 100% { left: -150px; opacity: 0; } }

        @keyframes lf { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf2 { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf3 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }
        @keyframes lf4 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }

        .speeder-container {
          animation: speeder .4s linear infinite;
        }

        .base-span::before {
          content: "";
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: #fafafa;
          position: absolute;
          right: -110px;
          top: -16px;
        }

        .base-span::after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-right: 55px solid #fafafa;
          border-bottom: 16px solid transparent;
          top: -16px;
          right: -98px;
        }

        .face-element::after {
          content: "";
          height: 12px;
          width: 12px;
          background: #fafafa;
          right: 4px;
          top: 7px;
          position: absolute;
          transform: rotate(40deg);
          transform-origin: 50% 50%;
          border-radius: 0 0 0 2px;
        }

        .fazer-line {
          position: absolute;
          height: 1px;
          width: 30px;
          background: #fafafa;
        }
      `}</style>

      {/* Main Body */}
      <div className="speeder-container absolute top-1/2 left-1/2 -ml-[50px]">
        {/* Upper Body Part */}
        <span className="absolute h-[5px] w-[35px] bg-[#fafafa] -top-[19px] left-[60px] rounded-[2px_10px_1px_0]">
          {/* Moving Fazer Lines */}
          <span className="fazer-line top-0 animate-[fazer1_.2s_linear_infinite]" />
          <span className="fazer-line top-[3px] animate-[fazer2_.4s_linear_infinite]" />
          <span className="fazer-line top-[1px] animate-[fazer3_.4s_linear_infinite] [animation-delay:-1s]" />
          <span className="fazer-line top-[4px] animate-[fazer4_1s_linear_infinite] [animation-delay:-1s]" />
        </span>

        {/* Base Shape */}
        <div className="relative">
          <span className="base-span absolute w-0 h-0 border-t-[6px] border-t-transparent border-r-[100px] border-r-[#fafafa] border-b-[6px] border-b-transparent" />
          <div className="face-element absolute h-[12px] w-[20px] bg-[#fafafa] rounded-t-[20px] -rotate-[40deg] -right-[125px] -top-[15px]" />
        </div>
      </div>

      {/* Long Background Fazers */}
      <div className="absolute w-full h-full pointer-events-none">
        <span className="absolute h-[2px] w-[20%] bg-[#fafafa] top-[20%] animate-[lf_.6s_linear_infinite] [animation-delay:-5s]" />
        <span className="absolute h-[2px] w-[20%] bg-[#fafafa] top-[40%] animate-[lf2_.8s_linear_infinite] [animation-delay:-1s]" />
        <span className="absolute h-[2px] w-[20%] bg-[#fafafa] top-[60%] animate-[lf3_.6s_linear_infinite]" />
        <span className="absolute h-[2px] w-[20%] bg-[#fafafa] top-[80%] animate-[lf4_.5s_linear_infinite] [animation-delay:-3s]" />
      </div>

      {/* Text Label */}
      <h1 className="absolute top-[58%] left-1/2 -translate-x-1/2 -ml-[20px] text-[#fafafa] text-[12px] font-semibold uppercase tracking-wider">
        กำลังเรียกพนักงาน
      </h1>
    </div>
  );
};

export default DeliveryLoader;
import React from 'react';

const CoffeeLoader = ({ scale = 0.5 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div 
        className="cup relative w-[220px] h-[180px] border-[8px] border-gray-100 rounded-[10px_10px_60px_75px]"
        style={{
          boxShadow: '0 0 0 12px #e5e7eb', // Gray-200
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          backgroundColor: '#fff'
        }}
      >
        {/* Liquid Animation */}
        <div className="absolute inset-0 overflow-hidden rounded-[2px_2px_50px_65px]">
            <div className="absolute bottom-0 left-0 w-full h-full bg-amber-900 opacity-80 animate-pulse"></div>
        </div>

        {/* Steam */}
        <span 
          className="steam" 
          style={{ 
            top: '-70px', left: '65px', height: '30px', background: 'rgba(209, 213, 219, 0.5)', animationDelay: '.2s' 
          }}
        ></span>
        <span 
          className="steam" 
          style={{ 
            top: '-120px', left: '95px', height: '50px', background: 'rgba(209, 213, 219, 0.7)', animationDelay: '.6s' 
          }}
        ></span>
        <span 
          className="steam" 
          style={{ 
            top: '-90px', left: '125px', height: '40px', background: 'rgba(209, 213, 219, 0.6)', animationDelay: '1s' 
          }}
        ></span>
        
        {/* Handle */}
        <div 
          className="absolute w-[65px] h-[120px] border-[12px] border-gray-200 rounded-[20px_10px_50px_20px]"
          style={{
            top: '10px',
            right: '-74px',
          }}
        ></div>
        
      </div>
    </div>
  );
};

export default CoffeeLoader;
import React from 'react';

const CoffeeLoader = ({ scale = 0.5 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div 
        className="cup relative w-[220px] h-[180px] border-[8px] border-[#ffefdb] rounded-[10px_10px_60px_75px]"
        style={{
          boxShadow: '0 0 0 12px #352a22',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          // No background color - lets CSS image show through
        }}
      >
        {/* Steam - Relying on index.css .cup .steam:nth-child(...) */}
        <span className="steam"></span>
        <span className="steam"></span>
        <span className="steam"></span>
        
        {/* Handle */}
        <div 
          className="absolute w-[65px] h-[120px] border-[12px] border-[#352a22] rounded-[20px_10px_50px_20px]"
          style={{
            top: '10px',
            right: '-74px',
            // No background color
          }}
        ></div>
        
      </div>
    </div>
  );
};

export default CoffeeLoader;
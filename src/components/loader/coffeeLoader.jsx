import React from 'react';

const CoffeeLoader = ({ scale = 0.5 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div 
        className="cup relative w-[220px] h-[180px] border-[8px] border-gray-800 rounded-[10px_10px_60px_75px]"
        style={{
          boxShadow: 'none', 
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          backgroundColor: '#fff'
        }}
      >
        {/* Liquid Animation */}
        <div className="absolute inset-0 overflow-hidden rounded-[2px_2px_50px_65px]">
            {/* Brown coffee water - Height reduced to 85% to show white cup rim */}
            <div className="absolute bottom-0 left-0 w-full h-[85%] bg-[#4b3621] opacity-90 animate-pulse"></div>
        </div>

        {/* Steam - Changed to Gray to avoid 'light brown shade' issues */}
        <span 
          className="steam" 
          style={{ 
            top: '-70px', left: '65px', height: '30px', background: 'rgba(107, 114, 128, 0.2)', animationDelay: '.2s' 
          }}
        ></span>
        <span 
          className="steam" 
          style={{ 
            top: '-120px', left: '95px', height: '50px', background: 'rgba(107, 114, 128, 0.4)', animationDelay: '.6s' 
          }}
        ></span>
        <span 
          className="steam" 
          style={{ 
            top: '-90px', left: '125px', height: '40px', background: 'rgba(107, 114, 128, 0.3)', animationDelay: '1s' 
          }}
        ></span>
        
        {/* Handle - Added white background */}
        <div 
          className="absolute w-[65px] h-[120px] border-[12px] border-gray-800 rounded-[20px_10px_50px_20px]"
          style={{
            top: '10px',
            right: '-74px',
            backgroundColor: '#fff', 
            zIndex: -1 // Put handle behind cup if needed, or keep on top. Usually handles are attached.
            // If zIndex is -1, it might be hidden by container if container has bg. 
            // The cup is the container. The handle is a child.
            // Let's keep zIndex default but ensure it looks right.
            // Actually, handles usually look better if they are 'behind' the main cup curve visually, 
            // but here it's an attached loop. 
            // Let's just set bg white.
          }}
        ></div>
        
      </div>
    </div>
  );
};

export default CoffeeLoader;
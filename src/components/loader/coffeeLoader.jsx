// คุณต้องเพิ่มโค้ด CSS ส่วนนี้ (หรือไฟล์ CSS ทั้งหมดในส่วนที่ 2)
// ลงในไฟล์ CSS ทั่วไปของโปรเจกต์ของคุณ (เช่น globals.css) 
// เพื่อให้แอนิเมชัน filling และ steaming ทำงาน



const CoffeeLoader = ({ scale = 0.5 }) => {
  return (
    // Body replacement: full screen, flex center, background color
    <div className="flex items-center justify-center p-4">
      
      {/* .cup Container: ใช้คลาส Tailwind และ Custom Class (.cup) สำหรับแอนิเมชัน */}
      <div 
        className="cup relative w-[220px] h-[180px] border-[8px] border-[#ffefdb] rounded-[10px_10px_60px_75px]"
        style={{
          boxShadow: '0 0 0 12px #352a22', // ใช้ inline style สำหรับ box-shadow ที่ซับซ้อน
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
          // background: 'url(./coffee.png) repeat-x 0 130px', // Background ถูกจัดการโดยคลาส .cup ใน external CSS
        }}
      >
        
        {/* .steam: ใช้คลาส Tailwind สำหรับโครงสร้าง และ Custom Class (.steam) สำหรับแอนิเมชันและตำแหน่ง */}
        <span 
          className="steam" 
          style={{ 
            top: '-70px', left: '65px', height: '30px', background: 'rgba(142, 90, 52, 0.14)', animationDelay: '.2s' 
          }}
        ></span>
        <span 
          className="steam" 
          style={{ 
            top: '-120px', left: '95px', height: '50px', background: 'rgba(142, 90, 52, 0.33)', animationDelay: '.6s' 
          }}
        ></span>
        <span 
          className="steam" 
          style={{ 
            top: '-90px', left: '125px', height: '40px', background: 'rgba(142, 90, 52, 0.2)', animationDelay: '1s' 
          }}
        ></span>
        
        {/* .cup-handle: ใช้คลาส Tailwind และ Inline Style สำหรับรูปทรง */}
        <div 
          className="absolute w-[65px] h-[120px] border-[12px] border-[#352a22] rounded-[20px_10px_50px_20px]"
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
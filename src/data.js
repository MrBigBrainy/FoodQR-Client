// ข้อมูลนี้คือ Array ของ Object ที่ Menu Store (Backend) ควรจะส่งกลับมาให้ Frontend

const MOCK_MENU_DATA = [
  {
    id: "m1",
    name: "ผัดไทยกุ้งสด",
    description: "ผัดไทยสูตรต้นตำรับ เส้นเหนียวนุ่ม พร้อมกุ้งสดตัวโต.",
    price: 95.0,
    category: "Noodle",
    ImageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/mockup_img_1", // Mock URL
  },
  {
    id: "m2",
    name: "ข้าวผัดกะเพราหมูสับ",
    description: "รสชาติเผ็ดร้อนถึงใจ พร้อมไข่ดาวเยิ้มๆ.",
    price: 80.0,
    category: "Rice",
    ImageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/mockup_img_2", // Mock URL
  },
  {
    id: "m3",
    name: "แกงเขียวหวานไก่",
    description: "กะทิหอมมัน เข้มข้นถึงเครื่องแกง เสิร์ฟพร้อมขนมจีน.",
    price: 120.0,
    category: "Curry",
    ImageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/mockup_img_3", // Mock URL
  },
  {
    id: "m4",
    name: "ชาเย็น",
    description: "ชาไทยเข้มข้น หวานมัน หอมกลิ่นชาแท้.",
    price: 45.0,
    category: "Drinks",
    ImageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/mockup_img_4", // Mock URL
  },
  {
    id: "m5",
    name: "มะม่วงข้าวเหนียวมูล",
    description: "มะม่วงน้ำดอกไม้หวานฉ่ำ พร้อมข้าวเหนียวมูลกะทิ.",
    price: 150.0,
    category: "Dessert",
    ImageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/mockup_img_5", // Mock URL
  },
];

export default MOCK_MENU_DATA;

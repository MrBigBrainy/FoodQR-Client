// MenuBill.jsx
import { useRef, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";

const MenuBill = () => {
  const targetRef = useRef(null);

  const tableName = "A3";
  const qrMenuUrl = `https://barbgon.app/menu/${tableName}`;

  useEffect(() => {
    if (!targetRef.current) return;

    const generatePdf = async () => {
      // รอให้ DOM/QR render เสร็จก่อนนิดนึง
      await new Promise((r) => setTimeout(r, 500));

      const canvas = await html2canvas(targetRef.current, {
        scale: 2, // ให้คมขึ้น
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // PDF ขนาด 60x120 mm (สลิปตั้ง)
      const pdf = new jsPDF("p", "mm", [120, 60]);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // fit กว้าง แล้วคำนวณสูงตามสัดส่วน
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // วางกลางหน้าแนวตั้ง (ถ้าอยากชิดบนก็ใช้ y = 0)
      const x = 0;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

      // เปิดในแท็บใหม่ (เหมือน method: "open")
      pdf.output("dataurlnewwindow");
      // หรือถ้าอยากให้ดาวน์โหลดใช้:
      // pdf.save(`menu-${tableName}.pdf`);
    };

    generatePdf();
  }, [tableName]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      {/* ส่วนที่ html2canvas จะ capture */}
      <div
        ref={targetRef}
        className="
          bg-white text-black border border-black rounded
          px-4 py-3 w-[260px]
          text-sm
        "
        style={{
          fontFamily:
            '"Sarabun", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Header */}
        <header className="pb-4 border-b border-black text-center">
          <div className="text-base font-semibold">Bar B Gon</div>
          <div className="text-xs">Japanese Restaurant &amp; Bar</div>
        </header>

        {/* Row: โต๊ะ */}
        <div className="flex items-center justify-between pt-3 text-sm">
          <span>โต๊ะ / Table</span>
          <span className="text-xl font-bold">{tableName}</span>
        </div>

        {/* QR Section */}
        <section className="flex flex-col items-center mt-4 mb-3">
          <div className="text-xs font-medium mb-2 text-center leading-snug">
            สแกนเพื่อเปิดเมนู
            <br />
            Scan to view menu
          </div>
          <QRCodeCanvas value={qrMenuUrl} size={140} />
        </section>

        {/* Footer */}
        <footer className="border-t border-dashed border-black pt-2 mt-2 text-[10px] text-center">
          © Bar B Gon — Thank you
        </footer>
      </div>
    </div>
  );
};

export default MenuBill;

// MenuBill.jsx
import { useRef, useEffect } from "react";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { QRCodeCanvas } from "qrcode.react";
import "./menubill.css";

const MenuBill = () => {
  const targetRef = useRef(null);

  const tableName = "A3";
  const qrMenuUrl = `https://barbgon.app/menu/${tableName}`;

  const pdfConfig = {
    filename: `menu-${tableName}.pdf`,
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: [60,120],
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
  };

  useEffect(() => {
    if (targetRef.current) {
        // Small timeout to ensure rendering is complete before capture
        setTimeout(() => {
            generatePDF(targetRef, pdfConfig);
        }, 500);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      {/* อันนี้คือส่วนที่ react-to-pdf จะ capture */}
      <div ref={targetRef} className="menubill-root">
        <header>
          <div className="menubill-heading">
            <div className="menubill-title">Bar B Gon</div>
            <div className="menubill-subtitle">
              Japanese Restaurant &amp; Bar
            </div>
          </div>
        </header>

        <div className="menubill-row">
          <span>โต๊ะ / Table</span>
          <span style={{ fontSize: "20px", fontWeight: 700 }}>{tableName}</span>
        </div>

        <section className="menubill-qr-section">
          <div className="menubill-qr-label">
            สแกนเพื่อเปิดเมนู / Scan to view menu
          </div>
          <QRCodeCanvas value={qrMenuUrl} size={140} />
        </section>

        <footer className="menubill-footer">© Bar B Gon — Thank you</footer>
      </div>
    </div>
  );
};

export default MenuBill;

// MenuBill.jsx
import React, { useRef, useEffect } from "react";
import generatePDF, { Margin } from "react-to-pdf";
import "./MenuBill.css";

const MenuBill = () => {
  const targetRef = useRef(null);

  // -------- STATIC DATA --------
  const storeName = "Bar B Gon";
  const address = "12/45 ถนนบางนา-ตราด บางนา กรุงเทพฯ 10260";
  const tableNo = "A12";
  const dateTime = "01/12/2025 18:40";
  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://your-domain.com/order?table=A12";
  // ------------------------------

  const options = {
    filename: `table-${tableNo}-qr-slip.pdf`,
    method: "save", // ถ้าอยากให้เปิดแทนดาวน์โหลด ใช้ "open"
    page: {
      margin: Margin.NONE,
      format: [60, 140], // mm, แนวสลิปเล็กๆ
      orientation: "portrait",
    },
  };

  useEffect(() => {
    if (!targetRef.current) return;

    const id = setTimeout(() => {
      generatePDF(targetRef, options);
    }, 300); // หน่วงนิดนึงให้ DOM render เสร็จก่อน

    return () => clearTimeout(id);
  }, []);

  // inline style ล้วน ปลอดภัยจาก oklch (ตัวนี้เองไม่สร้าง oklch แล้ว)
  const slipStyle = {
    width: "230px", // ประมาณ 58mm
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily: "monospace",
    fontSize: "11px",
    padding: "12px",
    border: "1px solid #cccccc",
  };

  const center = { textAlign: "center" };

  const dashed = {
    borderBottom: "1px dashed #999999",
    paddingBottom: "8px",
    marginBottom: "8px",
  };

  const smallText = { fontSize: "10px" };

  const qrContainer = {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
  };

  const tableNumberText = {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "4px",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* ตัวนี้คือ element ที่จะถูกแปลงเป็น PDF */}
      <div ref={targetRef} style={slipStyle}>
        {/* HEADER */}
        <div style={{ ...center, ...dashed }}>
          <div style={{ fontSize: "13px", fontWeight: "bold" }}>
            {storeName}
          </div>
          <div
            style={{
              ...smallText,
              marginTop: "4px",
              lineHeight: "14px",
            }}
          >
            {address}
          </div>
          <div style={{ ...smallText, marginTop: "6px" }}>{dateTime}</div>
        </div>

        {/* QR SECTION */}
        <div style={{ ...center, ...dashed, paddingTop: "8px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
            สแกน QR เพื่อสั่งอาหาร
          </div>

          <div style={qrContainer}>
            <img
              src={qrUrl}
              alt="QR Code"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "contain",
                border: "1px solid #999999",
                padding: "4px",
              }}
            />
          </div>

          <div style={{ marginTop: "8px" }}>
            <div style={{ ...smallText, color: "#555555" }}>โต๊ะ</div>
            <div style={tableNumberText}>{tableNo}</div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            ...center,
            fontSize: "10px",
            marginTop: "10px",
            color: "#555555",
          }}
        >
          ใช้สำหรับสแกนเพื่อสั่งอาหารและชำระเงิน
        </div>
      </div>
    </div>
  );
};

export default MenuBill;

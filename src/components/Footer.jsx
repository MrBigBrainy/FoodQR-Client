import React from "react";
import { Link } from "react-router";
function Footer() {
  return (
    <div className="flex justify-around">
      <div>
        <Link to="/">เมนู</Link>
      </div>
      <div>
        <Link to="/cart">ตะกร้า</Link>
      </div>
      <div>
        <Link to="/summary">ชำระเงิน</Link>
      </div>
    </div>
  );
}

export default Footer;

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";

// 1) Register Google Font (TTF from GitHub)
Font.register({
  family: "SarabunThai",
  fonts: [
    {
      src: "https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-Regular.ttf",
    },
    {
      src: "https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const MenuBill = () => {
  const storeName = "บาร์ บี ก้อน (Bar B Gon)";
  const address = "12/45 ถนนบางนา-ตราด บางนา กรุงเทพฯ 10260";
  const tableNo = "A12";
  const dateTime = "01/12/2025 18:40";

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://your-domain.com/order?table=A12";

  const styles = StyleSheet.create({
    page: {
      width: "58mm",
      padding: 12,
      fontFamily: "SarabunThai",
      fontSize: 11,
    },
    header: {
      textAlign: "center",
      borderBottom: "1pt dashed #666",
      paddingBottom: 6,
      marginBottom: 6,
    },
    qrBlock: {
      textAlign: "center",
      borderBottom: "1pt dashed #666",
      paddingBottom: 8,
      marginBottom: 8,
    },
    qrImage: {
      width: 120,
      height: 120,
      border: "1pt solid #999",
      margin: "6px auto 0 auto",
    },
    small: {
      fontSize: 10,
      color: "#555",
      marginTop: 6,
    },
    tableLarge: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 2,
    },
    footer: {
      textAlign: "center",
      marginTop: 12,
      fontSize: 10,
      color: "#666",
    },
  });

  const doc = (
    <Document>
      <Page size="A7" style={styles.page}>
        <View style={styles.header}>
          <Text>{storeName}</Text>
          <Text style={{ fontSize: 10, marginTop: 4 }}>{address}</Text>
          <Text style={{ fontSize: 10, marginTop: 4 }}>{dateTime}</Text>
        </View>

        <View style={styles.qrBlock}>
          <Text>สแกน QR เพื่อสั่งอาหาร</Text>
          <Image src={qrUrl} style={styles.qrImage} />
          <Text style={styles.small}>โต๊ะ</Text>
          <Text style={styles.tableLarge}>{tableNo}</Text>
        </View>

        <View style={styles.footer}>
          <Text>สำหรับสแกนเพื่อสั่งอาหารและชำระเงิน</Text>
        </View>
      </Page>
    </Document>
  );

  return <PDFViewer width="100%" height="600px">{doc}</PDFViewer>;
};

export default MenuBill;

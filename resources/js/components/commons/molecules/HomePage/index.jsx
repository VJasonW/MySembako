import React from "react";


console.log('HomePage component loaded');

const products = [
  {
    name: "Roma Sili Pulan Siga",
    price: "Rp 88.900",
    store: "Toko SumberM",
    img: "/images/produk1.png",
  },
  {
    name: "Kobo Boncabe c... ",
    price: "Rp 13.000",
    store: "Toko SumberM",
    img: "/images/produk2.png",
  },
  {
    name: "Bango Kecap mani...",
    price: "Rp 22.200",
    store: "Toko T11",
    img: "/images/produk3.png",
  },
  {
    name: "Sanio Minyak Gor...",
    price: "Rp 22.800",
    store: "Toko T11",
    img: "/images/produk4.png",
  },
  {
    name: "Bimoli Minyak Que...",
    price: "Rp 19.900",
    store: "Toko T11",
    img: "/images/produk5.png",
  },
  {
    name: "Torabika Kaku Rasa...",
    price: "Rp 13.400",
    store: "Toko SumberM",
    img: "/images/produk6.png",
  },
  {
    name: "Deterjen Daia 1900G",
    price: "Rp 33.300",
    store: "Toko Maju M",
    img: "/images/produk7.png",
  },
  {
    name: "Sabun Mandi Kahfi",
    price: "Rp 20.000",
    store: "Toko Maju M",
    img: "/images/produk8.png",
  },
  {
    name: "Sabun Mandi Biore",
    price: "Rp 31.200",
    store: "Toko Maju M",
    img: "/images/produk9.png",
  },
  {
    name: "Sikat Gigi Colgate",
    price: "Rp 13.800",
    store: "Toko T12",
    img: "/images/produk10.png",
  },
  {
    name: "Pasta Gigi Pepsode...",
    price: "Rp 12.900",
    store: "Toko T12",
    img: "/images/produk11.png",
  },
  {
    name: "Gillette Blue Plus",
    price: "Rp 13.400",
    store: "Toko MAKOTA OFFICIAL",
    img: "/images/produk12.png",
  },
];

function HomePage() {
  console.log('HomePage rendering...');
  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        border: "6px solid #333",
        borderRadius: 10,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "24px 32px 16px 32px",
          background: "#fff",
          borderBottom: "1px solid #f3f3f3",
          gap: 24,
        }}
      >
        <img
          src="/logo.svg"
          alt="MySembako Logo"
          style={{ height: 32, marginRight: 10 }}
        />
        <span
          style={{
            color: "#FC6900",
            fontSize: 22,
            fontWeight: 700,
            marginRight: 40,
          }}
        >
          MySembako
        </span>
        <div style={{ flex: 1 }}>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="/icon/bell.svg"
              alt="Notifications"
              style={{ width: 22, height: 22 }}
            />
          </button>
          <button
            style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <img
              src="/icon/user.svg"
              alt="User"
              style={{ width: 22, height: 22 }}
            />
          </button>
        </div>
      </div>
      {/* Konten lain bisa ditambahkan di bawah sini */}
    </div>
  );
}

export default HomePage;

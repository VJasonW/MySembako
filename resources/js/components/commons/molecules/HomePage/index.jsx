import React, { useMemo } from "react";
import Searchbar from "../SearchBar/Searchbar";

const products = [
  {
    name: "Beras Si Pulen 5kg",
    price: "Rp 88.900",
    store: "Toko Baru",
    img: "https://placehold.co/140x140?text=Beras",
  },
  {
    name: "Kobe BonCabe Original",
    price: "Rp 13.000",
    store: "Toko Sunimem",
    img: "https://placehold.co/140x140?text=BonCabe",
  },
  {
    name: "Bango Kecap Manis",
    price: "Rp 22.200",
    store: "Toko T11",
    img: "https://placehold.co/140x140?text=Bango",
  },
  {
    name: "Sania Minyak Goreng",
    price: "Rp 22.800",
    store: "Toko T11",
    img: "https://placehold.co/140x140?text=Sania",
  },
  {
    name: "Bimoli Minyak Goreng",
    price: "Rp 19.900",
    store: "Toko Tri",
    img: "https://placehold.co/140x140?text=Bimoli",
  },
  {
    name: "Totole Kaldu Rasa Jamur",
    price: "Rp 13.400",
    store: "Toko Madura Timur",
    img: "https://placehold.co/140x140?text=Totole",
  },
  {
    name: "Deterjen Daia 900g",
    price: "Rp 33.300",
    store: "Toko Baru",
    img: "https://placehold.co/140x140?text=Daia",
  },
  {
    name: "Sabun Mandi Kahf",
    price: "Rp 20.000",
    store: "Toko Sunimem",
    img: "https://placehold.co/140x140?text=Kahf",
  },
  {
    name: "Sabun Mandi Biore",
    price: "Rp 31.200",
    store: "Toko Baru",
    img: "https://placehold.co/140x140?text=Biore",
  },
  {
    name: "Sikat Gigi Colgate",
    price: "Rp 13.800",
    store: "Toko Tri",
    img: "https://placehold.co/140x140?text=Colgate",
  },
  {
    name: "Pasta Gigi Pepsodent",
    price: "Rp 12.900",
    store: "Toko Tri",
    img: "https://placehold.co/140x140?text=Pepsodent",
  },
  {
    name: "Gillette Blue Plus",
    price: "Rp 13.400",
    store: "Makota Official",
    img: "https://placehold.co/140x140?text=Gillette",
  },
];

const navItems = [
  { label: "Home", icon: "🏠", active: true },
  { label: "Cart", icon: "🛒" },
  { label: "Orders", icon: "🧾" },
  { label: "Profile", icon: "👤" },
];

const cardColors = ["#FFF7ED", "#FEF3F2", "#F5F3FF", "#FDF2F8", "#ECFDF3"];

const ProductCard = ({ product, index }) => {
  const background = useMemo(
    () => cardColors[index % cardColors.length],
    [index]
  );

  return (
    <div
      style={{
        background,
        borderRadius: 20,
        padding: "18px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: "0 12px 28px rgba(255, 119, 72, 0.12)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 32px rgba(255, 119, 72, 0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(255, 119, 72, 0.12)";
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: "100%",
            maxWidth: 110,
            height: "auto",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.currentTarget.src = "/icon/Logo_Mysembako.svg";
            e.currentTarget.style.width = "48px";
            e.currentTarget.style.filter = "hue-rotate(20deg)";
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.4,
            color: "#27272a",
            fontWeight: 700,
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            fontSize: 13,
            color: "#ef6b49",
            fontWeight: 700,
          }}
        >
          {product.price}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          {product.store}
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFF1E6 0%, #FFFFFF 55%)",
        fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
        display: "flex",
        justifyContent: "center",
        padding: "36px 16px 90px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          background: "#ffffff",
          borderRadius: 32,
          boxShadow: "0 24px 48px rgba(15, 23, 42, 0.08)",
          border: "1px solid #f1f5f9",
          padding: "24px 32px 32px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <Searchbar placeholder="Cari" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            marginTop: 12,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 20,
            }}
          >
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -44,
            transform: "translateX(-50%)",
            background: "#ffe7dc",
            borderRadius: 40,
            padding: "12px 28px",
            boxShadow: "0 18px 36px rgba(239, 107, 73, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              style={{
                background: item.active ? "#ef6b49" : "transparent",
                border: "none",
                borderRadius: 28,
                color: item.active ? "#fff" : "#ef6b49",
                fontWeight: 600,
                padding: item.active ? "10px 18px" : "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = "rgba(239, 107, 73, 0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

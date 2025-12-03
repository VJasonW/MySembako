import React, { useState } from "react";

// Dummy data persis di gambar
const initialCart = [
  {
    id: 1,
    name: "Kobe BonCabe Original Botol 45gr",
    price: 13000,
    desc: "Level 15",
    img: "/images/produk2.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Sikat gigi colgate",
    price: 27600,
    desc: "",
    img: "/images/produk10.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Pepsodent pasta gigi",
    price: 12900,
    desc: "",
    img: "/images/produk11.png",
    quantity: 1,
  },
];

function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [checked, setChecked] = useState(cart.map(() => true));

  // Handler select all
  const handleCheckAll = (val) => {
    setChecked(new Array(cart.length).fill(val));
  };

  // Handler per checkbox item
  const handleCheck = (index) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  // Handler quantity (+ / -)
  const handleQty = (idx, amt) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === idx
          ? { ...item, quantity: Math.max(1, item.quantity + amt) }
          : item
      )
    );
  };

  // Handler remove
  const handleRemove = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
    setChecked((prev) => prev.filter((_, i) => i !== idx));
  };

  // Total untuk item yang tercentang saja
  const total = cart.reduce(
    (acc, item, i) => acc + (checked[i] ? item.price * item.quantity : 0),
    0
  );

  // Handler checkout
  const handleCheckout = () => {
    if (!checked.some(Boolean)) {
      alert("Tidak ada item yang dipilih.");
      return;
    }
    alert("Checkout berhasil! (simulasi)");
    setCart((prev) => prev.filter((_, i) => !checked[i]));
    setChecked((prev) => prev.filter((c) => !c));
  };

  // Custom Checkbox (Centang Putih)
  const CustomCheckbox = ({
    checked,
    onChange,
    className = "",
    ...props
  }) => (
    <label
      className={`relative flex items-center justify-center w-[18px] h-[18px] rounded border border-[#dbbdae] transition ${
        checked ? "bg-[#fc8726] border-[#fc8726]" : "bg-white"
      } ${className}`}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        e.preventDefault();
        if (onChange) {
          onChange(e);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          if (onChange) {
            onChange(e);
          }
        }
      }}
      style={{ cursor: "pointer" }}
      {...props}
    >
      {checked && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          className="block"
          aria-hidden="true"
        >
          <polyline
            points="3,7 6,10 10,3"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </label>
  );

  // Custom Select All Checkbox (Centang Putih)
  const SelectAllCheckbox = ({ checked, onChange }) => (
    <label
      className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded border border-[#dbbdae] ${
        checked ? "bg-[#fc8726] border-[#fc8726]" : "bg-white"
      }`}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      style={{ verticalAlign: "middle", marginRight: 6, cursor: "pointer" }}
    >
      {checked && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          className="block"
          aria-hidden="true"
        >
          <polyline
            points="3,7 6,10 10,3"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </label>
  );

  return (
    <div className="min-h-screen bg-[#fff5f0] flex justify-center items-start pb-8 md:pb-0">
      {/* Container for left and right */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mt-10 md:mt-16">
        {/* List Kiri */}
        <div className="flex-1 flex flex-col items-stretch px-0 md:px-10 py-5 max-w-[670px] mx-auto md:mx-0">
          <div className="bg-[#ffe5d2] rounded-xl shadow-md p-4 md:p-6 mb-3 w-full">
            {/* Pilih Semua */}
            <div className="flex items-center mb-3">
              <SelectAllCheckbox
                checked={checked.every(Boolean) && checked.length > 0}
                onChange={handleCheckAll}
              />
              <span className="ml-2 font-semibold text-[#8b572a] text-base">
                Pilih Semua
                <span className="ml-2 text-[#fc8726] font-bold">
                  ({checked.filter(Boolean).length})
                </span>
              </span>
            </div>
            {/* Daftar Keranjang */}
            <div className="flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  Keranjang belanja kosong.
                </div>
              ) : (
                cart.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white rounded-lg shadow-sm border border-[#f9e6d8] px-3 py-4"
                  >
                    {/* Checkbox (custom centang putih dan kotak orange) */}
                    <span className="relative flex-shrink-0 mt-1">
                      <CustomCheckbox
                        checked={checked[i] || false}
                        onChange={() => handleCheck(i)}
                      />
                    </span>
                    {/* Gambar */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-[56px] h-[56px] object-contain rounded-lg bg-white ring-1 ring-[#f9e6d8] flex-shrink-0 ml-4"
                    />
                    {/* Info Produk */}
                    <div className="min-w-0 flex-1 ml-4">
                      <div className="font-semibold text-[#c96e33] text-base mb-0.5 truncate">
                        {item.name}
                      </div>
                      {item.desc && (
                        <div className="text-xs text-[#ba9d8a]">{item.desc}</div>
                      )}
                    </div>
                    {/* Kanan: Harga & Qty */}
                    <div className="flex flex-col items-end min-w-[148px] ml-4">
                      <span className="font-bold text-[#e16b27] text-base mb-2 whitespace-nowrap">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                      <div className="flex items-center bg-[#ffe5d2] rounded px-2 py-1 space-x-2">
                        <button
                          className="text-[#fc8726] flex items-center justify-center w-6 h-6 font-bold text-lg rounded disabled:opacity-50"
                          aria-label="Kurangi jumlah"
                          onClick={() => handleQty(i, -1)}
                          disabled={item.quantity <= 1}
                          style={{
                            border: "none",
                            background: "none",
                            outline: "none",
                          }}
                          tabIndex={0}
                        >
                          –
                        </button>
                        <span className="text-[#e16b27] text-base font-semibold w-4 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          className="text-[#fc8726] flex items-center justify-center w-6 h-6 font-bold text-lg rounded"
                          aria-label="Tambah jumlah"
                          onClick={() => handleQty(i, 1)}
                          style={{
                            border: "none",
                            background: "none",
                            outline: "none",
                          }}
                          tabIndex={0}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Ringkasan Belanja */}
        <div className="w-full md:w-[320px] flex-shrink-0 px-0 md:px-0 mt-0 md:mt-5">
          <div className="bg-[#ffe5d2] rounded-xl shadow-md p-6 mx-auto max-w-xs sticky top-7 md:top-7">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-[#8b572a] text-base">
                Ringkasan Belanja
              </span>
              <span className="font-semibold text-[#ce8143] text-base">
                Total
              </span>
            </div>
            <div className="flex justify-between items-baseline mb-5">
              <span className="text-[#C96E33] font-bold text-lg">Total:</span>
              <span className="font-bold text-[#e16b27] text-lg">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
            <button
              className={`w-full mb-3 py-2.5 rounded-lg font-semibold text-base shadow transition
                ${
                  checked.some(Boolean)
                    ? "bg-[#fc8726] hover:bg-[#fff2ea] text-white"
                    : "bg-[#e7aa74] text-white cursor-not-allowed"
                }`
              }
              onClick={handleCheckout}
              disabled={!checked.some(Boolean)}
            >
              Beli
              {checked.filter(Boolean).length > 0
                ? ` (${checked.filter(Boolean).length})`
                : ""}
            </button>
            <div className="flex items-center justify-center gap-1 bg-[#fff2ea] text-[#fc8726] text-xs font-semibold rounded px-2 py-1 border border-[#f9e6d8]">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 20 20"
                className="inline"
                style={{ marginRight: 2 }}
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="#fc8726"
                  strokeWidth="1.4"
                  fill="none"
                ></circle>
                <rect
                  x="9"
                  y="5"
                  width="2"
                  height="6"
                  rx="1"
                  fill="#fc8726"
                />
                <rect
                  x="9"
                  y="12.2"
                  width="2"
                  height="2"
                  rx="1"
                  fill="#fc8726"
                />
              </svg>
              Lagi belum ada prom* nth.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
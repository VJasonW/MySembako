import React, { useState } from "react";

// const PRIMARY_COLOR = "#BF4413";
// const SECONDARY_COLOR = "#FFCCB8";
// const BACKGROUND_COLOR = "#FFE6DD";

function HomePage() {
  // Update: menambahkan deskripsi produk dan stok pada list
  const productsList = [
    {
      name: "Beras SI Pulen 5kg",
      price: "Rp 88.900",
      store: "Toko Baru",
      img: "/images/produk1.png",
      desc: "Beras kualitas premium, pulen dan harum. Berat 5kg.",
      stock: 12,
    },
    {
      name: "Kobe Cabe Bubuk Boncabe lv 15",
      price: "Rp 13.000",
      store: "Toko Suniman",
      img: "/images/produk2.png",
      desc: "Cabe bubuk dengan level kepedasan 15, cocok sebagai taburan.",
      stock: 8,
    },
    {
      name: "Bango Kecap Manis",
      price: "Rp 22.200",
      store: "Toko T11",
      img: "/images/produk3.png",
      desc: "Kecap manis legendaris, rasa gurih dan pas untuk masakan.",
      stock: 20,
    },
    {
      name: "Sania Minyak Goreng",
      price: "Rp 22.800",
      store: "Toko T11",
      img: "/images/produk4.png",
      desc: "Minyak goreng sehat dan jernih.",
      stock: 15,
    },
    {
      name: "Bimoli Minyak Goreng",
      price: "Rp 19.900",
      store: "Toko T11",
      img: "/images/produk5.png",
      desc: "Minyak goreng berkualitas, isi 1 liter.",
      stock: 14,
    },
    {
      name: "Totole Kaldu Rasa",
      price: "Rp 13.400",
      store: "Toko Madu Timur",
      img: "/images/produk6.png",
      desc: "Kaldu jamur berkualitas, bikin masakan makin lezat.",
      stock: 7,
    },
    {
      name: "Deterjen Daia 900G",
      price: "Rp 33.300",
      store: "Toko Baru",
      img: "/images/produk7.png",
      desc: "Deterjen wangi dengan daya bersih maksimal.",
      stock: 19,
    },
    {
      name: "Sabun Mandi Kahfi",
      price: "Rp 20.000",
      store: "Toko Suniman",
      img: "/images/produk8.png",
      desc: "Sabun herbal dari Kahfi, membersihkan dan menjaga kelembapan.",
      stock: 17,
    },
    {
      name: "Sabun Mandi Biore",
      price: "Rp 31.200",
      store: "Toko T11",
      img: "/images/produk9.png",
      desc: "Sabun cair Biore, harum dan menyegarkan.",
      stock: 22,
    },
    {
      name: "Sikat Gigi Colgate",
      price: "Rp 13.800",
      store: "Toko T11",
      img: "/images/produk10.png",
      desc: "Sikat gigi Colgate kualitas terbaik.",
      stock: 11,
    },
    {
      name: "Pasta Gigi Pepsodent",
      price: "Rp 12.900",
      store: "Toko T11",
      img: "/images/produk11.png",
      desc: "Pasta gigi Pepsodent, perlindungan gigi dan mulut.",
      stock: 16,
    },
    {
      name: "Gillette Blue 1Pcs",
      price: "Rp 13.400",
      store: "Toko Madu Timur",
      img: "/images/produk12.png",
      desc: "Pisau cukur Gillette Blue sekali pakai.",
      stock: 25,
    },
    {
      name: "Buah Durian Musang king 5 Kardus",
      price: "Rp 13.400",
      store: "Toko Madu Timur",
      img: "/images/produk13.png",
      desc: "Durian Musang King, ukuran 5 kardus.",
      stock: 4,
    },
    {
      name: "Teh Botol Sosro 450ml",
      price: "Rp 5.500",
      store: "Toko Suniman",
      img: "/images/produk14.png",
      desc: "Minuman teh botol Sosro, segar diminum dingin.",
      stock: 30,
    },
    {
      name: "Indomie Goreng Spesial",
      price: "Rp 3.500",
      store: "Toko Baru",
      img: "/images/produk15.png",
      desc: "Indomie goreng rasa spesial, favorit semua orang.",
      stock: 50,
    }
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Helper functions for price parsing/formatting
  const parsePrice = (priceStr) => {
    return Number(priceStr.replace(/Rp\s?|\./g, "").trim());
  };

  const formatRupiah = (number) => {
    return (
      "Rp " +
      number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset saat buka modal baru
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  // Ubah color palette untuk seluruh function di sini: 
  // (Catatan: color palette lebih berpengaruh ke style, namun instruksi tetap diikuti sesuai dengan konteks function)
  // Selain logic addToCart, biasanya kita juga mengaplikasikan palet warna pada komponen UI/modal/modal button.

  const addToCart = (product) => {
    // Hitung total harga sesuai jumlah yang dibeli
    const singlePrice = parsePrice(product.price);
    const totalPrice = singlePrice * quantity;
    const formattedPrice = formatRupiah(totalPrice);

    setCart((prev) => [
      ...prev,
      {
        ...product,
        quantity,
        price: formattedPrice, // set harga menjadi sesuai jumlah beli
      },
    ]);
    closeModal();
    // Untuk real case sebaiknya cek apakah stok masih ada
    // dan munculkan notifikasi sukses/gagal
  };

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value, 10) || 1;
    if (val < 1) val = 1;
    if (val > selectedProduct.stock) val = selectedProduct.stock;
    setQuantity(val);
  };

  const incQty = () => {
    if (quantity < selectedProduct.stock) setQuantity(quantity + 1);
  };

  const decQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Hitung dynamic price untuk modal jika open
  let dynamicTotalPrice = selectedProduct
    ? formatRupiah(parsePrice(selectedProduct.price) * quantity)
    : "";

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {productsList.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 transition hover:shadow-md cursor-pointer"
              onClick={() => openModal(product)}
            >
              <div className="flex justify-center items-start mb-3 min-h-[110px]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[90px] object-contain"
                />
              </div>
              <div className="flex-grow">
                <div className="line-clamp-2 font-semibold text-gray-900 text-base leading-snug mb-1 truncate">
                  {product.name}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">{product.price}</div>
              </div>
              <div className="text-sm text-gray-400 leading-tight truncate">{product.store}</div>
            </div>
          ))}
        </div>
      </div>
      
      {showModal && selectedProduct && (
        // Ganti modal jadi floating tanpa overlay background
        <div className="fixed left-0 top-0 w-full h-full z-40 pointer-events-none">
          <div
            className="absolute pointer-events-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 max-w-xs w-full relative"
            style={{
              boxShadow:
                "0 4px 24px 0 rgba(55, 51, 48, 0.13), 0 2px 8px 0 rgba(180,131,91,0.12)",
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
              aria-label="Tutup"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="h-24 object-contain mb-4"
              />
              <h2 className="text-lg font-bold mb-2 text-center">{selectedProduct.name}</h2>
              <div className="text-gray-700 text-sm mb-2 text-center">{selectedProduct.desc}</div>
              {/* Ganti: tampilkan total harga sesuai quantity */}
              <div className="text-gray-900 font-semibold text-base mb-2">{dynamicTotalPrice}</div>
              <div className="text-gray-500 text-sm mb-2">
                Sisa Stock: <span className="font-semibold">{selectedProduct.stock}</span>
              </div>
              {/* Selector jumlah produk */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  onClick={decQty}
                  disabled={quantity <= 1}
                  tabIndex="0"
                >-</button>
                <input
                  type="number"
                  className="w-14 text-center border border-gray-300 rounded"
                  value={quantity}
                  min={1}
                  max={selectedProduct.stock}
                  onChange={handleQuantityChange}
                />
                <button
                  type="button"
                  className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  onClick={incQty}
                  disabled={quantity >= selectedProduct.stock}
                  tabIndex="0"
                >+</button>
              </div>
              <button
                className="px-4 py-2 bg-[#BF4413] text-white rounded-lg hover:bg-[#a5380f] transition"
                onClick={() => addToCart(selectedProduct)}
                disabled={selectedProduct.stock < 1 || quantity < 1}
              >
                {selectedProduct.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

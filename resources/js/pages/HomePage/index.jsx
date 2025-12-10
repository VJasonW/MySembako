import React, { useState, useEffect } from "react";
import TopNavbar from "../../components/commons/molecules/TopNavbar";
import BottomNavbar from "../../components/commons/molecules/BottomNavbar";

// const PRIMARY_COLOR = "#BF4413";
// const SECONDARY_COLOR = "#FFCCB8";
// const BACKGROUND_COLOR = "#FFE6DD";

function HomePage() {
  // State produk list diambil dari database (API)
  const [productsList, setProductsList] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Simpan semua produk untuk filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch produk dari "database" saat komponen dimount
  useEffect(() => {
    // Contoh fetch ke API database produk
    // Ganti URL sesuai endpoint yang digunakan
    const fetchProducts = async () => {
      try {
        // Misal API produk di /api/products (Anda sesuaikan sendiri)
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Gagal memuat produk dari database");
        }
        const data = await response.json();
        setAllProducts(data); // Simpan semua produk
        setProductsList(data); // Set initial products
      } catch (error) {
        console.error("Error fetch produk:", error);
        // Fallback jika fetch gagal (bisa kasih pesan atau data dummy)
        setAllProducts([]);
        setProductsList([]);
      }
    };
    fetchProducts();
  }, []);

  // Filter produk berdasarkan search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      // Jika search kosong, tampilkan semua produk
      setProductsList(allProducts);
      return;
    }

    // Filter produk berdasarkan nama, deskripsi, atau store
    const query = searchQuery.toLowerCase().trim();
    const filtered = allProducts.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(query);
      const descMatch = (product.description || product.desc || "")
        .toLowerCase()
        .includes(query);
      const storeMatch = (product.store || "").toLowerCase().includes(query);
      
      return nameMatch || descMatch || storeMatch;
    });

    setProductsList(filtered);
  }, [searchQuery, allProducts]);

  // Helper functions for price parsing/formatting
  const parsePrice = (priceStr) => {
    return Number(
      // Mendukung string harga "Rp 99.999" atau hanya int: 99999
      typeof priceStr === "number"
        ? priceStr
        : priceStr.replace(/Rp\s?|\./g, "").trim()
    );
  };

  // Karena harga bisa dari DB berupa number, support format rupiah
  const formatRupiah = (number) => {
    if (typeof number !== "number") number = Number(number) || 0;
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

  const addToCart = async (product) => {
    try {
      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
          'Accept': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          product_id: product.id,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Gagal menambahkan produk ke keranjang');
        return;
      }

      // Success - close modal and show notification
      alert('Produk berhasil ditambahkan ke keranjang!');
      closeModal();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Terjadi kesalahan saat menambahkan produk ke keranjang');
    }
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

  let dynamicTotalPrice = selectedProduct
    ? formatRupiah(parsePrice(selectedProduct.price) * quantity)
    : "";

  return (
    <div className="bg-white min-h-screen">
      {/* Top Navbar */}
      <div className="">
        <TopNavbar 
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Produk grid */}
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-7">
          {productsList.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-10">
              {searchQuery.trim() 
                ? `Tidak ada produk ditemukan untuk "${searchQuery}"` 
                : "Tidak ada produk ditemukan."}
            </div>
          )}
          {productsList.map((product, idx) => (
            <div
              key={product.id || idx}
              className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm px-3.5 py-4 md:px-4 md:py-5 mb-3 transition hover:shadow-md cursor-pointer"
              onClick={() => openModal(product)}
            >
              <div className="flex justify-center items-start mb-3 min-h-[85px] md:min-h-[110px]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[70px] md:h-[90px] object-contain"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="line-clamp-2 font-semibold text-gray-900 text-xs md:text-base leading-snug mb-1 md:mb-1.5 truncate">
                  {product.name}
                </div>
                <div className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2">
                  {typeof product.price === "number"
                    ? formatRupiah(product.price)
                    : product.price}
                </div>
              </div>
              <div className="text-xs md:text-sm text-gray-400 leading-tight truncate">{product.store}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {showModal && selectedProduct && (
        // Ganti modal jadi floating tanpa overlay background
        <div className="fixed left-0 top-0 w-full h-full z-40 pointer-events-none">
          <div
            className="absolute pointer-events-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 md:p-7 max-w-xs w-full relative"
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
            <div className="flex flex-col items-center px-2">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="h-20 md:h-24 object-contain mb-3 md:mb-4"
              />
              <h2 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 text-center">{selectedProduct.name}</h2>
              <div className="text-gray-700 text-xs md:text-sm mb-1.5 md:mb-2 text-center">
                {selectedProduct.description || selectedProduct.desc || ''}
              </div>
              <div className="text-gray-900 font-semibold text-xs md:text-base mb-1.5 md:mb-2">
                {dynamicTotalPrice}
              </div>
              <div className="text-gray-500 text-xs md:text-sm mb-1.5 md:mb-2">
                Sisa Stock: <span className="font-semibold">{selectedProduct.stock}</span>
              </div>
              {/* Selector jumlah produk */}
              <div className="mb-3 md:mb-5 flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-base md:text-lg font-bold"
                  onClick={decQty}
                  disabled={quantity <= 1}
                  tabIndex="0"
                >-</button>
                <input
                  type="number"
                  className="w-12 md:w-14 text-center border border-gray-300 rounded py-0.5"
                  value={quantity}
                  min={1}
                  max={selectedProduct.stock}
                  onChange={handleQuantityChange}
                />
                <button
                  type="button"
                  className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-base md:text-lg font-bold"
                  onClick={incQty}
                  disabled={quantity >= selectedProduct.stock}
                  tabIndex="0"
                >+</button>
              </div>
              <button
                className="px-6 md:px-8 py-2 md:py-2.5 bg-[#BF4413] text-white rounded-lg hover:bg-[#a5380f] transition font-semibold text-sm md:text-base w-full"
                onClick={() => addToCart(selectedProduct)}
                disabled={selectedProduct.stock < 1 || quantity < 1}
              >
                {selectedProduct.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNavbar />
    </div>
  );
}

export default HomePage;

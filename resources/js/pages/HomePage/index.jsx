import React, { useState, useEffect, useMemo } from "react";
import TopNavbar from "../../components/commons/molecules/TopNavbar";
import BottomNavbar from "../../components/commons/molecules/BottomNavbar";
import { ProductCard } from "../../components/ui/ProductCard";
import { ProductGridSkeleton } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/EmptyState";
import { Modal } from "../../components/ui/Modal";
import { QuantityStepper } from "../../components/ui/QuantityStepper";
import { PriceTag } from "../../components/ui/PriceTag";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { useCart } from "../../context/CartContext";
import { parsePrice, formatRupiah } from "../../utils/format";
import { apiFetch } from "../../lib/api";

const DEFAULT_CATEGORIES = [
  "Beras",
  "Minyak Goreng",
  "Gula Pasir",
  "Telur",
  "Bumbu Dapur",
  "Mie & Pasta",
  "Kopi & Teh",
  "Susu & Olahan",
  "Air Minum / Galon",
  "Gas LPG",
  "Snack & Cemilan",
];

function HomePage() {
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryOptions, setCategoryOptions] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Check URL search params for initial query (e.g. from TopNavbar search redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch("/api/products");
      setAllProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetch produk:", err);
      setError(err.message || "Gagal memuat katalog sembako");
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiFetch("/api/categories");
        const names = Array.from(
          new Set([
            ...DEFAULT_CATEGORIES,
            ...(data || []).map((cat) => cat.name).filter(Boolean),
          ])
        );
        setCategoryOptions(names);
      } catch {
        setCategoryOptions(DEFAULT_CATEGORIES);
      }
    };
    fetchCategories();
  }, []);

  // Filter & sort produk secara reaktif (useMemo)
  const productsList = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const categoryFilter = selectedCategory.toLowerCase().trim();
    const customCatSearch = categoryQuery.toLowerCase().trim();

    let list = allProducts;
    if (query || categoryFilter || customCatSearch) {
      list = allProducts.filter((product) => {
        const nameMatch = (product.name || "").toLowerCase().includes(query);
        const descMatch = (product.description || product.desc || "")
          .toLowerCase()
          .includes(query);
        const storeMatch = (product.store || "").toLowerCase().includes(query);
        const categoryText = (product.category || "").toLowerCase();

        const selectedMatch = categoryFilter
          ? categoryText.includes(categoryFilter)
          : true;
        const customCategoryMatch = customCatSearch
          ? categoryText.includes(customCatSearch)
          : true;

        const baseMatch = query ? nameMatch || descMatch || storeMatch : true;
        return baseMatch && selectedMatch && customCategoryMatch;
      });
    }

    if (sortBy === "price_asc") {
      list = [...list].sort(
        (a, b) => parsePrice(a.price || a.harga) - parsePrice(b.price || b.harga)
      );
    } else if (sortBy === "price_desc") {
      list = [...list].sort(
        (a, b) => parsePrice(b.price || b.harga) - parsePrice(a.price || a.harga)
      );
    } else if (sortBy === "name_asc") {
      list = [...list].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sortBy === "name_desc") {
      list = [...list].sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    } else if (sortBy === "latest") {
      list = [...list].sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return list;
  }, [searchQuery, allProducts, selectedCategory, categoryQuery, sortBy]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleModalAddToCart = async () => {
    if (!selectedProduct) return;
    setAddingToCart(true);
    const success = await addToCart(selectedProduct, quantity);
    setAddingToCart(false);
    if (success) {
      closeProductModal();
    }
  };

  const handleResetFilter = () => {
    setSelectedCategory("");
    setCategoryQuery("");
    setSearchQuery("");
    setSortBy("default");
    if (window.history.pushState) {
      window.history.pushState({}, "", "/home");
    }
  };

  const dynamicTotalPrice = selectedProduct
    ? parsePrice(selectedProduct.price || selectedProduct.harga) * quantity
    : 0;

  return (
    <div className="bg-[#FAFAF8] min-h-screen text-stone-900 pb-28 flex flex-col font-sans">
      {/* Top Navbar */}
      <TopNavbar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedCategory={selectedCategory}
        categoryQuery={categoryQuery}
        categoryOptions={categoryOptions}
        onCategorySelect={(val) =>
          setSelectedCategory((prev) => (prev === val ? "" : val))
        }
        onCategoryQueryChange={(val) => setCategoryQuery(val)}
        sortBy={sortBy}
        onSortChange={(val) => setSortBy(val)}
        onResetFilter={handleResetFilter}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-5 w-full flex-1">
        {/* Banner Promo Hero */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-600 via-pink-500 to-rose-400 text-white shadow-lg shadow-pink-600/10 mb-8 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider mb-3 text-pink-100">
              Kebutuhan Harian Terjamin
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Belanja Sembako Tanpa Ribet
            </h1>
            <p className="text-pink-100 text-xs sm:text-sm mt-2 leading-relaxed">
              Beras pulen, minyak kemasan, gula, dan telur segar siap diantar
              langsung dari warung sembako di kotamu.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-pink-600 flex items-center justify-center font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Stok Terkini</div>
                <div className="text-pink-200">Selalu Diperbarui</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Horizontal Filter Bar */}
        <section className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
              <span>Kategori Sembako</span>
              {selectedCategory && (
                <Badge variant="brand" size="sm">
                  {selectedCategory}
                </Badge>
              )}
            </h2>

            {(selectedCategory || categoryQuery || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilter}
                className="text-xs font-bold text-pink-600 hover:text-pink-700 transition"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Scrollable Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 focus-ring ${
                selectedCategory === ""
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-stone-300"
              }`}
            >
              Semua
            </button>
            {categoryOptions.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setSelectedCategory((prev) => (prev === cat ? "" : cat))
                  }
                  className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 focus-ring ${
                    isActive
                      ? "bg-pink-600 text-white shadow-xs shadow-pink-600/30"
                      : "bg-white text-stone-700 border border-stone-200 hover:border-pink-300 hover:bg-pink-50/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Product Grid Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-xs sm:text-sm font-bold text-stone-800">
            Daftar Produk {!loading && `(${productsList.length})`}
          </div>
        </div>

        {/* Content Area: Loading / Error / Empty / Grid */}
        {loading ? (
          <ProductGridSkeleton count={10} />
        ) : error ? (
          <EmptyState
            title="Gagal Memuat Produk"
            description={error}
            actionLabel="Coba Lagi"
            onAction={fetchProducts}
          />
        ) : productsList.length === 0 ? (
          <EmptyState
            title="Produk Tidak Ditemukan"
            description={
              searchQuery.trim()
                ? `Tidak ada sembako yang cocok dengan kata kunci "${searchQuery}". Coba kata kunci lain.`
                : "Belum ada produk aktif yang tersedia di kategori ini."
            }
            actionLabel={
              searchQuery.trim() || selectedCategory ? "Reset Pencarian" : null
            }
            onAction={handleResetFilter}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {productsList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={openProductModal}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Quick-Add Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={closeProductModal}
        maxWidth="sm"
      >
        {selectedProduct && (
          <div className="flex flex-col items-center text-center">
            {/* Image Preview */}
            <div className="w-32 h-32 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center p-3 mb-4 overflow-hidden">
              <img
                src={
                  selectedProduct.img ||
                  selectedProduct.image ||
                  "/icon/Logo_Mysembako.svg"
                }
                alt={selectedProduct.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/icon/Logo_Mysembako.svg";
                }}
              />
            </div>

            <Badge variant="brand" size="sm" className="mb-1.5">
              {selectedProduct.category || "Sembako"}
            </Badge>

            <h3 className="text-base sm:text-lg font-extrabold text-stone-900 mb-1 leading-snug">
              {selectedProduct.name}
            </h3>

            <p className="text-xs text-stone-500 mb-4 line-clamp-2 max-w-xs leading-relaxed">
              {selectedProduct.description ||
                "Bahan pokok berkualitas untuk kebutuhan dapur Anda."}
            </p>

            {/* Price & Stock Card */}
            <div className="w-full bg-pink-50/70 border border-pink-100/80 rounded-2xl p-3.5 mb-4 flex items-center justify-between text-left">
              <div>
                <span className="text-[11px] text-stone-500 font-medium block">
                  Total Harga
                </span>
                <PriceTag price={dynamicTotalPrice} size="md" />
              </div>
              <div className="text-right">
                <span className="text-[11px] text-stone-500 font-medium block">
                  Sisa Stok
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">
                  {selectedProduct.stock > 0
                    ? `${selectedProduct.stock} unit`
                    : "Habis"}
                </span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mb-5 flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold text-stone-600">
                Pilih Jumlah:
              </span>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={Number(selectedProduct.stock) || 1}
                disabled={selectedProduct.stock <= 0}
              />
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              fullWidth
              size="lg"
              loading={addingToCart}
              disabled={selectedProduct.stock <= 0}
              onClick={handleModalAddToCart}
            >
              {selectedProduct.stock <= 0
                ? "Stok Habis"
                : "Tambah ke Keranjang"}
            </Button>
          </div>
        )}
      </Modal>

      {/* Bottom Nav */}
      <BottomNavbar />
    </div>
  );
}

export default HomePage;

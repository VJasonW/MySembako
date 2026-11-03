import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useCart } from "../../../../context/CartContext";
import { useToast } from "../../../../context/ToastContext";
import { cityFromCoords } from "../../../../utils/location";
import { Modal } from "../../../ui/Modal";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";

const TopNavbar = ({
  searchQuery = "",
  onSearchChange,
  selectedCategory = "",
  categoryQuery = "",
  categoryOptions = [],
  onCategorySelect = () => {},
  onCategoryQueryChange = () => {},
  onResetFilter = () => {},
  sortBy = "default",
  onSortChange = () => {},
  variant = "auto",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const { cartCount } = useCart();
  const { showToast } = useToast();

  const [showProfile, setShowProfile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingLocation, setSavingLocation] = useState(false);

  // Sync user data to form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const isCheckout = location.pathname.startsWith("/checkout");
  const isHome = location.pathname === "/home";
  const displayVariant = variant === "auto" ? (isCheckout ? "minimal" : "full") : variant;

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!isHome) {
      navigate(`/home?q=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  const handleSearchInputChange = (e) => {
    const val = e.target.value;
    setLocalSearch(val);
    if (typeof onSearchChange === "function") {
      onSearchChange(e);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      await updateProfile(formData);
      showToast({
        message: "Profil Anda berhasil diperbarui!",
        type: "success",
      });
      setShowProfile(false);
    } catch (error) {
      showToast({
        message: error.message || "Gagal menyimpan perubahan profil",
        type: "error",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleActivateLocation = () => {
    if (!navigator.geolocation) {
      showToast({
        message: "Perangkat ini tidak mendukung deteksi lokasi (Geolocation).",
        type: "warning",
      });
      return;
    }

    setSavingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const city = cityFromCoords(latitude, longitude);

          if (!city) {
            showToast({
              message: "Lokasi belum terjangkau. Wilayah aktif: Jakarta, Semarang, Surabaya, Jogja.",
              type: "warning",
            });
            return;
          }

          await updateProfile({ location: city });
          showToast({
            message: `Lokasi berhasil diperbarui: Kota ${city}!`,
            type: "success",
          });
        } catch (err) {
          showToast({
            message: err.message || "Gagal memperbarui lokasi",
            type: "error",
          });
        } finally {
          setSavingLocation(false);
        }
      },
      (err) => {
        let msg = "Izin lokasi tidak diberikan.";
        if (err.code === 2) msg = "Lokasi tidak dapat ditentukan.";
        if (err.code === 3) msg = "Waktu permintaan lokasi habis.";
        showToast({
          message: msg,
          type: "warning",
        });
        setSavingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 py-2.5 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto flex w-full items-center justify-between gap-3">
          {/* Logo Brand (Navigates to /home) */}
          <div
            className="flex items-center gap-2 flex-shrink-0 cursor-pointer group focus-ring rounded-xl p-1"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogoClick();
            }}
          >
            <img
              src="/icon/Logo_Mysembako.svg"
              alt="MySembako"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Minimal Variant for Checkout / Distraction-free */}
          {displayVariant === "minimal" ? (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200/80">
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Transaksi Aman &amp; Terpercaya</span>
            </div>
          ) : (
            /* Search Bar */
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-lg mx-2 sm:mx-4"
            >
              <div className="flex items-center bg-stone-100/90 hover:bg-stone-100 border border-stone-200/90 focus-within:border-pink-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-pink-500/10 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 gap-2.5 transition-all">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-stone-400 shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  className="bg-transparent border-none outline-none flex-1 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:ring-0 p-0"
                  type="text"
                  value={localSearch}
                  placeholder="Cari beras, minyak goreng, telur, bumbu..."
                  onChange={handleSearchInputChange}
                  autoComplete="off"
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearch("");
                      if (typeof onSearchChange === "function") {
                        onSearchChange({ target: { value: "" } });
                      }
                    }}
                    className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                  >
                    &times;
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {displayVariant !== "minimal" && (
              <>
                {/* Desktop Cart Button */}
                <button
                  type="button"
                  onClick={() => navigate("/cart")}
                  aria-label="Keranjang Belanja"
                  className="hidden md:flex relative w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-full bg-stone-100 hover:bg-pink-50 text-stone-700 hover:text-pink-600 border border-stone-200/80 transition-all active:scale-95 focus-ring"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-xs ring-2 ring-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </button>

                {/* Filter Button */}
                <button
                  className={`w-9 h-9 sm:w-10 sm:h-10 transition-all duration-200 flex items-center justify-center rounded-full active:scale-95 focus-ring ${
                    selectedCategory
                      ? "bg-pink-600 text-white shadow-sm ring-2 ring-pink-300"
                      : "bg-stone-100 hover:bg-pink-50 text-stone-700 hover:text-pink-600 border border-stone-200/80"
                  }`}
                  onClick={() => setShowFilter(true)}
                  aria-label="Filter Produk"
                  type="button"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </button>
              </>
            )}

            {/* User Profile / Auth Button */}
            {isAuthenticated ? (
              <button
                className="w-9 h-9 sm:w-10 sm:h-10 transition-all duration-200 flex items-center justify-center rounded-full bg-stone-100 hover:bg-pink-50 text-stone-700 hover:text-pink-600 border border-stone-200/80 active:scale-95 focus-ring"
                onClick={() => setShowProfile(true)}
                aria-label="Profil Akun"
                type="button"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            ) : (
              <a
                href="/login"
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition"
              >
                Masuk
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <Modal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        title="Profil & Pengaturan Akun"
        description="Kelola informasi pribadi dan alamat pengiriman Anda"
        maxWidth="md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          {/* User Badge Banner */}
          <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-pink-600 text-white flex items-center justify-center font-extrabold text-lg shadow-xs shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-extrabold text-stone-900 truncate">
                {user?.name || "Pelanggan MySembako"}
              </h4>
              <p className="text-xs text-stone-500 truncate">
                {user?.email || "-"}
              </p>
            </div>
          </div>

          <Input
            label="Nama Lengkap"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            placeholder="Nama lengkap Anda"
          />

          <Input
            label="Alamat Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            placeholder="nama@email.com"
          />

          <Input
            label="No. WhatsApp / Telepon"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="08123456789"
          />

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide">
              Kota Pengiriman (GPS)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={user?.location || "Belum ada lokasi"}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm text-stone-700 bg-stone-100 border border-stone-200 outline-none"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleActivateLocation}
                loading={savingLocation}
                className="shrink-0"
              >
                Perbarui GPS
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={savingProfile}
            >
              Simpan Perubahan
            </Button>

            <Button
              type="button"
              variant="danger"
              fullWidth
              onClick={logout}
            >
              Keluar dari Akun
            </Button>
          </div>
        </form>
      </Modal>

      {/* Filter Modal */}
      <Modal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        title="Filter & Urutkan Produk"
        description="Sesuaikan katalog sembako sesuai preferensi belanja Anda"
        maxWidth="md"
      >
        <div className="space-y-5">
          {/* Urutkan Berdasarkan */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
              Urutkan Harga &amp; Nama
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "default", label: "Rekomendasi" },
                { id: "price_asc", label: "Harga Terendah" },
                { id: "price_desc", label: "Harga Tertinggi" },
                { id: "name_asc", label: "Nama (A ke Z)" },
                { id: "name_desc", label: "Nama (Z ke A)" },
                { id: "latest", label: "Produk Terbaru" },
              ].map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSortChange(opt.id)}
                    className={`px-3 py-2 rounded-xl text-xs text-left transition-all active:scale-95 border ${
                      isSelected
                        ? "bg-pink-600 text-white border-pink-600 font-bold shadow-2xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300 font-medium"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Kategori */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                Kategori Populer
              </label>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => onCategorySelect("")}
                  className="text-xs font-bold text-pink-600 hover:underline"
                >
                  Hapus Pilihan
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categoryOptions.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onCategorySelect(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all active:scale-95 border ${
                      isActive
                        ? "bg-pink-600 text-white border-pink-600 font-bold shadow-2xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:border-pink-300 font-medium"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex gap-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowFilter(false)}
            >
              Terapkan Filter
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                onResetFilter();
                setShowFilter(false);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TopNavbar;

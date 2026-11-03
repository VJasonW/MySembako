import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../../components/commons/molecules/TopNavbar";
import BottomNavbar from "../../components/commons/molecules/BottomNavbar";
import { ProductCard } from "../../components/ui/ProductCard";
import { ProductGridSkeleton } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/EmptyState";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { requestUserLocation, cityFromCoords } from "../../utils/location";
import { apiFetch } from "../../lib/api";

const LocationPage = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [address, setAddress] = useState("");
  const [savingLocation, setSavingLocation] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const userCity = user?.location || "";

  // Reverse geocoding via OpenStreetMap
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data?.display_name || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const data = await apiFetch("/api/products");
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!userCity) return products;
    const cityLower = userCity.toLowerCase();
    const matchCity = (p) => {
      const candidates = [
        p.city,
        p.location,
        p.store_city,
        p.storeCity,
        p.store_location,
        p.storeLocation,
        p.store,
      ]
        .filter(Boolean)
        .map((s) => String(s).toLowerCase());
      return candidates.some((c) => c.includes(cityLower));
    };
    const result = products.filter((p) => matchCity(p));
    return result.length ? result : products;
  }, [products, userCity]);

  const handleTurnOnLocation = async () => {
    if (!navigator.geolocation) {
      showToast({
        message: "Perangkat Anda tidak mendukung fitur Geolocation.",
        type: "warning",
      });
      return;
    }

    try {
      setSavingLocation(true);
      const location = await requestUserLocation();
      setLocationData(location);

      const city = cityFromCoords(location.latitude, location.longitude);
      if (city) {
        await updateProfile({ location: city });
      }

      const addr = await getAddressFromCoordinates(
        location.latitude,
        location.longitude
      );
      if (addr) {
        setAddress(addr);
      }

      showToast({
        message: city
          ? `Lokasi Anda terdeteksi di Kota ${city}!`
          : "Koordinat GPS berhasil diperoleh!",
        type: "success",
      });

      setShowLocationPopup(true);
    } catch (error) {
      showToast({
        message: error.message || "Gagal mengakses izin lokasi.",
        type: "error",
      });
    } finally {
      setSavingLocation(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 flex flex-col font-sans pb-32 sm:pb-28">
      {/* Top Navbar */}
      <TopNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-10">
        {/* If no city is stored yet */}
        {!userCity ? (
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-stone-200/80 shadow-xs p-6 md:p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shadow-2xs">
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight mb-2">
              Aktifkan Lokasi Pengiriman
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mb-6">
              MySembako merekomendasikan toko sembako dan warung beras terdekat
              dari alamat Anda agar ongkir lebih hemat dan cepat sampai.
            </p>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleTurnOnLocation}
              loading={savingLocation}
            >
              Aktifkan Lokasi GPS
            </Button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="mt-4 text-xs font-bold text-stone-500 hover:text-stone-800 transition"
            >
              Nanti Saja, Masuk ke Katalog
            </button>
          </div>
        ) : (
          /* When city is active */
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <Badge variant="brand" size="md" dot>
                    Wilayah: {userCity}
                  </Badge>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  Toko &amp; Warung Sembako Terdekat
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
                  {address
                    ? address
                    : `Menampilkan stok bahan pokok yang siap dikirim langsung untuk area ${userCity}.`}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTurnOnLocation}
                  loading={savingLocation}
                >
                  Perbarui Lokasi GPS
                </Button>

                {locationData && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowLocationPopup(true)}
                  >
                    Detail GPS
                  </Button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {loadingProducts ? (
              <ProductGridSkeleton count={10} />
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                title="Belum Ada Produk di Wilayah Ini"
                description={`Belum ada mitra toko yang terdaftar di area ${userCity}. Coba perbarui lokasi atau lihat katalog nasional.`}
                actionLabel="Lihat Semua Produk"
                onAction={() => navigate("/home")}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => navigate("/home")}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* GPS Coordinate Modal (P0-6 fix) */}
      <Modal
        isOpen={showLocationPopup}
        onClose={() => setShowLocationPopup(false)}
        title="Detail Koordinat Lokasi"
        description="Informasi koordinat satelit yang digunakan sistem MySembako"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 text-xs space-y-2.5">
            <div>
              <span className="font-bold text-stone-500 block">Kota:</span>
              <p className="font-extrabold text-stone-900 text-sm">
                {userCity || "-"}
              </p>
            </div>

            {address && (
              <div>
                <span className="font-bold text-stone-500 block">
                  Alamat Geocoding:
                </span>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {address}
                </p>
              </div>
            )}

            {locationData && (
              <div>
                <span className="font-bold text-stone-500 block">
                  Koordinat Lintang &amp; Bujur:
                </span>
                <p className="font-mono text-stone-800">
                  {locationData.latitude.toFixed(6)},{" "}
                  {locationData.longitude.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowLocationPopup(false)}
          >
            Tutup
          </Button>
        </div>
      </Modal>

      <BottomNavbar />
    </div>
  );
};

export default LocationPage;

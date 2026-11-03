import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavbar from "../../components/commons/molecules/TopNavbar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PriceTag } from "../../components/ui/PriceTag";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Skeleton";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { apiFetch } from "../../lib/api";

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { fetchCart } = useCart();
  const { showToast } = useToast();

  // Retrieve selected items safely from state OR sessionStorage fallback (P0-8)
  const [selectedItems, setSelectedItems] = useState(() => {
    if (location.state?.items && location.state.items.length > 0) {
      return location.state.items;
    }
    try {
      const stored = sessionStorage.getItem("checkout_items");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading stored checkout items", e);
    }
    return [];
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  // New address state
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    phone: "",
    is_default: false,
  });

  // Guard: if no selected items, return to cart
  useEffect(() => {
    if (selectedItems.length === 0) {
      showToast({
        message: "Tidak ada produk yang dipilih untuk checkout.",
        type: "warning",
      });
      navigate("/cart", { replace: true });
    }
  }, [selectedItems, navigate, showToast]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/api/addresses");
        setAddresses(Array.isArray(data) ? data : []);

        const defaultAddr = data?.find((a) => a.is_default);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr.id);
        } else if (data?.length > 0) {
          setSelectedAddress(data[0].id);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setSavingAddress(true);
      const created = await apiFetch("/api/addresses", {
        method: "POST",
        body: newAddress,
      });

      showToast({
        message: "Alamat pengiriman baru berhasil disimpan!",
        type: "success",
      });

      // Refresh addresses
      const updatedList = await apiFetch("/api/addresses");
      setAddresses(updatedList);
      setSelectedAddress(created.id || updatedList[0]?.id);
      setShowAddressModal(false);
      setNewAddress({
        label: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
        phone: "",
        is_default: false,
      });
    } catch (error) {
      showToast({
        message: error.message || "Gagal menambahkan alamat",
        type: "error",
      });
    } finally {
      setSavingAddress(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedAddress) {
      showToast({
        message: "Pilih atau tambahkan alamat pengiriman terlebih dahulu",
        type: "warning",
      });
      return;
    }

    try {
      setSubmitting(true);
      const orderData = {
        items: selectedItems.map((item) => ({
          product_id: item.product_id || item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        address_id: selectedAddress,
        payment_method: paymentMethod,
        total_price: subtotal,
      };

      const result = await apiFetch("/api/checkout", {
        method: "POST",
        body: orderData,
      });

      // Clear persisted checkout items
      sessionStorage.removeItem("checkout_items");
      await fetchCart();

      showToast({
        message: "Pesanan berhasil dibuat!",
        type: "success",
      });

      navigate("/receipt", {
        state: { orderId: result.order_id, status: "pending" },
      });
    } catch (error) {
      showToast({
        message: error.message || "Gagal memproses pesanan",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans">
        <TopNavbar variant="minimal" />
        <main className="max-w-4xl mx-auto w-full p-6 space-y-4">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-44 w-full rounded-3xl" />
          <Skeleton className="h-44 w-full rounded-3xl" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 flex flex-col font-sans pb-32 lg:pb-16">
      {/* Top Navbar minimal */}
      <TopNavbar variant="minimal" />

      <main className="flex-1 max-w-5xl mx-auto w-full mt-5 md:mt-8 px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            Checkout Pembayaran
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Konfirmasi alamat dan selesaikan pemesanan sembako
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Left Column: Delivery Address & Payment Method */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-stone-200/80 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-pink-100 text-pink-600 font-extrabold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base sm:text-lg font-extrabold text-stone-900">
                    Alamat Pengiriman
                  </h2>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddressModal(true)}
                  className="text-pink-600 hover:text-pink-700"
                >
                  + Tambah Alamat
                </Button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8 px-4 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <p className="text-xs sm:text-sm text-stone-600 mb-3">
                    Belum ada alamat pengiriman tersimpan
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowAddressModal(true)}
                  >
                    Tambah Alamat Sekarang
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => {
                    const isSelected = selectedAddress === address.id;
                    return (
                      <label
                        key={address.id}
                        className={`flex items-start p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-pink-500 bg-pink-50/20 shadow-2xs"
                            : "border-stone-200/80 bg-white hover:border-stone-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="checkout_address"
                          checked={isSelected}
                          onChange={() => setSelectedAddress(address.id)}
                          className="mt-1 mr-3 accent-pink-600 w-4 h-4 cursor-pointer"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-extrabold text-stone-900 text-xs sm:text-sm">
                              {address.label || "Alamat Rumah"}
                            </span>
                            {address.is_default && (
                              <Badge variant="brand" size="sm">
                                Utama
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                            {address.address}, {address.city},{" "}
                            {address.province} {address.postal_code}
                          </p>
                          {address.phone && (
                            <p className="text-xs text-stone-500 font-medium mt-1">
                              Penerima: {user?.name || "Pelanggan"} ({address.phone})
                            </p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-3xl p-5 md:p-6 border border-stone-200/80 shadow-2xs">
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-stone-100">
                <span className="w-7 h-7 rounded-xl bg-pink-100 text-pink-600 font-extrabold text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-stone-900">
                  Metode Pembayaran
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label
                  className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === "cash"
                      ? "border-pink-500 bg-pink-50/20 shadow-2xs"
                      : "border-stone-200/80 bg-white hover:border-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="checkout_payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 mr-3 accent-pink-600 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm">
                      Bayar di Tempat (COD)
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      Bayar tunai langsung saat sembako tiba di rumah Anda
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    paymentMethod === "transfer"
                      ? "border-pink-500 bg-pink-50/20 shadow-2xs"
                      : "border-stone-200/80 bg-white hover:border-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="checkout_payment"
                    value="transfer"
                    checked={paymentMethod === "transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 mr-3 accent-pink-600 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm">
                      Transfer Bank / QRIS
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      BCA, Mandiri, BRI, BNI &amp; pembayaran instan QRIS
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (Desktop Sticky) */}
          <aside className="lg:col-span-1 sticky top-20">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs">
              <h3 className="font-extrabold text-stone-900 text-base mb-4 pb-3 border-b border-stone-100">
                Ringkasan Pesanan
              </h3>

              {/* Items List */}
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto pr-1">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 pb-2.5 border-b border-stone-100"
                  >
                    <img
                      src={item.img || "/icon/Logo_Mysembako.svg"}
                      alt=""
                      className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 p-1 object-contain shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = "/icon/Logo_Mysembako.svg";
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-stone-900 text-xs truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {item.quantity} &times; Rp{" "}
                        {Number(item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <span className="font-extrabold text-stone-900 text-xs">
                      Rp{" "}
                      {(
                        Number(item.price) * Number(item.quantity)
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6 text-xs sm:text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal Produk</span>
                  <span className="font-bold text-stone-900">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Ongkos Kirim</span>
                  <span className="font-bold text-emerald-600">
                    Gratis (Warung Terdekat)
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                  <span className="font-extrabold text-stone-900 text-sm">
                    Total Pembayaran
                  </span>
                  <PriceTag price={subtotal} size="lg" />
                </div>
              </div>

              {/* Desktop Submit Button */}
              <Button
                variant="primary"
                fullWidth
                size="lg"
                loading={submitting}
                disabled={!selectedAddress}
                onClick={handleCreateOrder}
              >
                Konfirmasi &amp; Buat Pesanan
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Sticky Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 p-4 shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-stone-500 font-medium block">
            Total Pembayaran
          </span>
          <PriceTag price={subtotal} size="md" />
        </div>

        <Button
          variant="primary"
          size="md"
          loading={submitting}
          disabled={!selectedAddress}
          onClick={handleCreateOrder}
          className="px-6"
        >
          Pesan Sekarang
        </Button>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title="Tambah Alamat Pengiriman"
        description="Pastikan alamat lengkap agar sembako diantar tepat waktu"
        maxWidth="md"
      >
        <form onSubmit={handleAddAddress} className="space-y-3.5">
          <Input
            label="Label Alamat (Opsional)"
            placeholder="Contoh: Rumah, Kos, Warung"
            value={newAddress.label}
            onChange={(e) =>
              setNewAddress((p) => ({ ...p, label: e.target.value }))
            }
          />

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide">
              Alamat Lengkap <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, patokan"
              value={newAddress.address}
              onChange={(e) =>
                setNewAddress((p) => ({ ...p, address: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl text-sm text-stone-900 bg-stone-50 border border-stone-200 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 transition resize-none focus-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Kota / Kabupaten"
              required
              placeholder="Semarang"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress((p) => ({ ...p, city: e.target.value }))
              }
            />

            <Input
              label="Provinsi"
              required
              placeholder="Jawa Tengah"
              value={newAddress.province}
              onChange={(e) =>
                setNewAddress((p) => ({ ...p, province: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Kode Pos"
              required
              type="text"
              inputMode="numeric"
              placeholder="50123"
              value={newAddress.postal_code}
              onChange={(e) =>
                setNewAddress((p) => ({ ...p, postal_code: e.target.value }))
              }
            />

            <Input
              label="Nomor WhatsApp"
              type="tel"
              placeholder="08123456789"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>

          <div className="pt-3 border-t border-stone-100 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => setShowAddressModal(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={savingAddress}
            >
              Simpan Alamat
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CheckoutPage;

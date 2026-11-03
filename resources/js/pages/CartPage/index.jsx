import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../components/commons/molecules/BottomNavbar";
import TopNavbar from "../../components/commons/molecules/TopNavbar";
import { Checkbox } from "../../components/ui/Checkbox";
import { QuantityStepper } from "../../components/ui/QuantityStepper";
import { PriceTag } from "../../components/ui/PriceTag";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Skeleton } from "../../components/ui/Skeleton";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, loading: cartLoading, updateQuantity, removeFromCart, fetchCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { showToast } = useToast();

  const [checkedIds, setCheckedIds] = useState(new Set());
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Initialize all items as checked when cartItems are loaded
  useEffect(() => {
    if (cartItems.length > 0) {
      setCheckedIds(new Set(cartItems.map((item) => item.id)));
    } else {
      setCheckedIds(new Set());
    }
  }, [cartItems]);

  // If user is not authenticated, redirect to login
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [authLoading, isAuthenticated]);

  const allChecked =
    cartItems.length > 0 && checkedIds.size === cartItems.length;

  const handleToggleAll = (val) => {
    if (val) {
      setCheckedIds(new Set(cartItems.map((item) => item.id)));
    } else {
      setCheckedIds(new Set());
    }
  };

  const handleToggleItem = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleQuantityChange = async (item, newQty) => {
    if (newQty > item.stock) {
      showToast({
        message: `Stok maksimal tersedia hanya ${item.stock} unit.`,
        type: "warning",
      });
      return;
    }
    await updateQuantity(item.id, newQty);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    await removeFromCart(itemToDelete.id);
    setDeleting(false);
    setItemToDelete(null);
  };

  // Selected items & total calculation
  const selectedItems = cartItems.filter((item) => checkedIds.has(item.id));
  const subtotal = selectedItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      showToast({
        message: "Pilih minimal satu produk sembako untuk checkout",
        type: "warning",
      });
      return;
    }

    // Persist selected items to sessionStorage to prevent refresh data loss (P0-8)
    try {
      sessionStorage.setItem("checkout_items", JSON.stringify(selectedItems));
    } catch (e) {
      console.error("Failed to persist checkout items", e);
    }

    navigate("/checkout", { state: { items: selectedItems } });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 flex flex-col font-sans pb-32 sm:pb-28">
      <TopNavbar />

      <main className="flex-1 max-w-6xl mx-auto w-full mt-5 md:mt-8 px-4 md:px-6">
        {/* Header Title */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
              Keranjang Belanja
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Periksa dan pilih sembako sebelum melanjutkan ke pembayaran
            </p>
          </div>
          {cartItems.length > 0 && (
            <span className="text-xs font-bold text-stone-700 bg-stone-100 border border-stone-200/80 px-3 py-1.5 rounded-full">
              {cartItems.length} produk
            </span>
          )}
        </div>

        {cartLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        ) : cartItems.length === 0 ? (
          <EmptyState
            title="Keranjang Masih Kosong"
            description="Yuk isi keranjangmu dengan bahan pokok, minyak, beras, dan telur segar dari toko terdekat!"
            actionLabel="Mulai Belanja"
            onAction={() => navigate("/home")}
            className="my-8"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select All Bar */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center justify-between">
                <Checkbox
                  id="select-all-cart"
                  checked={allChecked}
                  onChange={handleToggleAll}
                  label={`Pilih Semua (${checkedIds.size}/${cartItems.length})`}
                />

                {checkedIds.size > 0 && (
                  <span className="text-xs font-bold text-pink-600">
                    {checkedIds.size} dipilih
                  </span>
                )}
              </div>

              {/* Items Container */}
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const isChecked = checkedIds.has(item.id);
                  const isOutOfStock = Number(item.stock) <= 0;

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                        isChecked
                          ? "border-pink-300 ring-1 ring-pink-500/10"
                          : "border-stone-200/80"
                      }`}
                    >
                      {/* Checkbox + Image + Details */}
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <div className="mt-1 sm:mt-0 shrink-0">
                          <Checkbox
                            id={`check-item-${item.id}`}
                            checked={isChecked}
                            onChange={() => handleToggleItem(item.id)}
                            disabled={isOutOfStock}
                          />
                        </div>

                        {/* Product Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-stone-50 border border-stone-100 p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={item.img || "/icon/Logo_Mysembako.svg"}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/icon/Logo_Mysembako.svg";
                            }}
                          />
                        </div>

                        {/* Title & Price */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                            {item.name}
                          </h4>
                          {item.store && (
                            <p className="text-[11px] text-stone-400 font-medium truncate mt-0.5">
                              Toko: {item.store}
                            </p>
                          )}
                          <div className="mt-1">
                            <PriceTag price={item.price} size="sm" />
                          </div>
                        </div>
                      </div>

                      {/* Stepper & Delete Button */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pl-8 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(newQty) =>
                            handleQuantityChange(item, newQty)
                          }
                          min={1}
                          max={Number(item.stock) || 1}
                          disabled={isOutOfStock}
                          size="sm"
                        />

                        <button
                          type="button"
                          onClick={() => setItemToDelete(item)}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition focus-ring"
                          aria-label={`Hapus ${item.name}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Desktop Order Summary */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-24">
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
                <h3 className="font-extrabold text-stone-900 text-base mb-4 pb-3 border-b border-stone-100">
                  Ringkasan Belanja
                </h3>

                <div className="space-y-3 mb-6 text-xs sm:text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Total Produk Dipilih</span>
                    <span className="font-bold text-stone-900">
                      {selectedItems.length} produk
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Estimasi Ongkir</span>
                    <span className="font-bold text-emerald-600">
                      Gratis (Toko Terdekat)
                    </span>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                    <span className="font-bold text-stone-900 text-sm">
                      Total Belanja
                    </span>
                    <PriceTag price={subtotal} size="lg" />
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={selectedItems.length === 0}
                  onClick={handleCheckout}
                >
                  Lanjut ke Checkout ({selectedItems.length})
                </Button>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <svg
                    className="w-4 h-4 text-emerald-600 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>
                    Jaminan sembako asli dan terverifikasi dari warung mitra.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Mobile Sticky Checkout Bar (Fixed at bottom for easy thumb reach) */}
      {cartItems.length > 0 && (
        <div className="lg:hidden fixed bottom-18 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/90 p-3.5 px-4 shadow-lg flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-stone-500 font-medium block">
              Total ({selectedItems.length} produk)
            </span>
            <PriceTag price={subtotal} size="md" />
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
            className="px-6"
          >
            Checkout ({selectedItems.length})
          </Button>
        </div>
      )}

      {/* Delete Item Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Produk?"
        message={`Apakah Anda yakin ingin menghapus "${itemToDelete?.name}" dari keranjang belanja?`}
        confirmText="Hapus"
        isDanger
        loading={deleting}
      />

      <BottomNavbar />
    </div>
  );
}

export default CartPage;
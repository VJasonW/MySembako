import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavbar from "../../components/commons/molecules/BottomNavbar";
import TopNavbar from "../../components/commons/molecules/TopNavbar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { PriceTag } from "../../components/ui/PriceTag";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { useToast } from "../../context/ToastContext";
import { formatDate } from "../../utils/format";
import { apiFetch } from "../../lib/api";

const statusList = [
  { label: "Semua", value: "all" },
  { label: "Menunggu", value: "pending" },
  { label: "Dibayar", value: "paid" },
  { label: "Dikirim", value: "shipped" },
  { label: "Selesai", value: "done" },
  { label: "Dibatalkan", value: "cancel" },
];

const statusMeta = {
  pending: { label: "Menunggu Pembayaran", variant: "warning" },
  paid: { label: "Telah Dibayar", variant: "info" },
  shipped: { label: "Dalam Pengiriman", variant: "brand" },
  done: { label: "Selesai", variant: "success" },
  cancel: { label: "Dibatalkan", variant: "danger" },
};

function ReceiptPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // YYYY-MM-DD
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [actionDialog, setActionDialog] = useState({
    isOpen: false,
    orderId: null,
    type: null, // "cancel" | "complete"
    loading: false,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/orders");
      setReceipts(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error.status === 401) {
        window.location.href = "/login";
        return;
      }
      showToast({
        message: error.message || "Gagal memuat riwayat pesanan",
        type: "error",
      });
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Highlight order if directed from checkout
  useEffect(() => {
    if (location.state?.orderId) {
      setTimeout(() => {
        const orderEl = document.getElementById(`order-${location.state.orderId}`);
        if (orderEl) {
          orderEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [location.state, receipts]);

  // Robust date and query filter (P0-5 fix)
  const filteredReceipts = receipts.filter((r) => {
    const query = search.toLowerCase().trim();
    const matchSearch =
      !query ||
      String(r.id).includes(query) ||
      r.items?.some((item) =>
        (item.product_name || "").toLowerCase().includes(query)
      );

    // Reliable YYYY-MM-DD matching
    const orderDateYmd = r.date || (r.created_at_iso ? r.created_at_iso.substring(0, 10) : "");
    const matchDate = !dateFilter || orderDateYmd === dateFilter;

    const matchStatus =
      selectedStatus === "all" || r.status === selectedStatus;

    return matchSearch && matchDate && matchStatus;
  });

  const handleConfirmAction = async () => {
    const { orderId, type } = actionDialog;
    if (!orderId || !type) return;

    try {
      setActionDialog((prev) => ({ ...prev, loading: true }));
      const endpoint =
        type === "cancel"
          ? `/api/orders/${orderId}/cancel`
          : `/api/orders/${orderId}/complete`;

      await apiFetch(endpoint, { method: "PATCH" });

      showToast({
        message:
          type === "cancel"
            ? "Pesanan berhasil dibatalkan"
            : "Pesanan telah ditandai selesai. Terima kasih!",
        type: "success",
      });

      await fetchOrders();
      setActionDialog({ isOpen: false, orderId: null, type: null, loading: false });
    } catch (err) {
      showToast({
        message: err.message || "Gagal memproses aksi pesanan",
        type: "error",
      });
      setActionDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 flex flex-col font-sans pb-32 sm:pb-28">
      <TopNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full mt-5 md:mt-8 px-4 md:px-6">
        {/* Title */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            Riwayat Pesanan
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Lacak status pengiriman dan transaksi kebutuhan dapur Anda
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 flex items-center bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 focus-within:bg-white focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10 transition">
              <svg
                className="w-4 h-4 text-stone-400 mr-2 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Cari nomor pesanan atau nama produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 p-0"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Date Input with clear button (P0-5) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-700 outline-none focus:border-pink-500 focus:bg-white transition"
              />
              {dateFilter && (
                <button
                  type="button"
                  onClick={() => setDateFilter("")}
                  className="p-2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                  title="Hapus filter tanggal"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {statusList.map((tab) => {
              const isActive = selectedStatus === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 shrink-0 focus-ring ${
                    isActive
                      ? "bg-pink-600 text-white shadow-2xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content List */}
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-40 w-full rounded-3xl" />
          </div>
        ) : filteredReceipts.length === 0 ? (
          <EmptyState
            title="Tidak Ada Pesanan Ditemukan"
            description="Tidak ada transaksi yang cocok dengan filter atau kata kunci pencarian Anda."
            actionLabel={
              search || dateFilter || selectedStatus !== "all"
                ? "Reset Filter"
                : "Mulai Belanja"
            }
            onAction={() => {
              if (search || dateFilter || selectedStatus !== "all") {
                setSearch("");
                setDateFilter("");
                setSelectedStatus("all");
              } else {
                navigate("/home");
              }
            }}
          />
        ) : (
          <div className="space-y-4">
            {filteredReceipts.map((receipt) => {
              const meta = statusMeta[receipt.status] || {
                label: receipt.status,
                variant: "neutral",
              };
              const isHighlighted = location.state?.orderId === receipt.id;

              return (
                <div
                  key={receipt.id}
                  id={`order-${receipt.id}`}
                  className={`bg-white rounded-3xl p-5 md:p-6 border transition-all duration-200 shadow-2xs ${
                    isHighlighted
                      ? "border-pink-500 ring-2 ring-pink-500/20"
                      : "border-stone-200/80 hover:border-stone-300"
                  }`}
                >
                  {/* Order Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-3.5 border-b border-stone-100 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-stone-900 text-sm sm:text-base">
                          Pesanan #{receipt.id}
                        </span>
                        <span className="text-stone-300">&bull;</span>
                        <span className="text-xs text-stone-500">
                          {formatDate(receipt.created_at_iso || receipt.created_at)}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        Metode:{" "}
                        <strong className="text-stone-600">
                          {receipt.payment_method?.toUpperCase() || "COD"}
                        </strong>
                      </p>
                    </div>

                    <Badge variant={meta.variant} size="md" dot>
                      {meta.label}
                    </Badge>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 mb-4">
                    {receipt.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1 pr-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300 shrink-0" />
                          <span className="text-stone-800 font-medium truncate">
                            {item.product_name}
                          </span>
                          <span className="text-xs text-stone-400 font-bold shrink-0">
                            &times; {item.quantity}
                          </span>
                        </div>
                        <span className="font-bold text-stone-900 shrink-0">
                          Rp{" "}
                          {(
                            Number(item.price) * Number(item.quantity)
                          ).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Actions */}
                  <div className="pt-3.5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-stone-500">
                        Total Pesanan:
                      </span>
                      <PriceTag price={receipt.total_price} size="md" />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {receipt.status === "pending" && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            setActionDialog({
                              isOpen: true,
                              orderId: receipt.id,
                              type: "cancel",
                              loading: false,
                            })
                          }
                        >
                          Batalkan Pesanan
                        </Button>
                      )}

                      {receipt.status === "shipped" && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            setActionDialog({
                              isOpen: true,
                              orderId: receipt.id,
                              type: "complete",
                              loading: false,
                            })
                          }
                        >
                          Tandai Diterima
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Confirmation Dialog for Cancel/Complete */}
      <ConfirmDialog
        isOpen={actionDialog.isOpen}
        onClose={() =>
          setActionDialog({ isOpen: false, orderId: null, type: null, loading: false })
        }
        onConfirm={handleConfirmAction}
        title={
          actionDialog.type === "cancel"
            ? "Batalkan Pesanan?"
            : "Selesaikan Pesanan?"
        }
        message={
          actionDialog.type === "cancel"
            ? `Apakah Anda yakin ingin membatalkan Pesanan #${actionDialog.orderId}? Stok akan dikembalikan ke warung.`
            : `Tandai Pesanan #${actionDialog.orderId} sebagai selesai? Pastikan Anda sudah menerima sembako dalam kondisi baik.`
        }
        confirmText={
          actionDialog.type === "cancel" ? "Ya, Batalkan" : "Ya, Selesai"
        }
        isDanger={actionDialog.type === "cancel"}
        loading={actionDialog.loading}
      />

      <BottomNavbar />
    </div>
  );
}

export default ReceiptPage;

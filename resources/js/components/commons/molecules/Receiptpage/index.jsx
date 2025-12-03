import React, { useState } from "react";

const dummyReceipts = [
  {
    id: "ORD123481",
    status: "Berhasil",
    date: "04 Agustus 2023",
    invoice: "43434344344",
    product: {
      name: "Kobe BonCabe Original Botol 45gr",
      desc: "Level 15",
      img: "/images/produk2.png",
      quantity: 1,
    },
    total: 13000,
    statusColor: "text-green-600",
    statusBg: "bg-[#e6f6e7]",
    canBuyAgain: true,
    canCancel: false,
  },
  {
    id: "ORD123482",
    status: "Berlangsung",
    date: "04 Agustus 2023",
    invoice: "5656523345",
    product: {
      name: "Sikat Gigi Colgate",
      desc: "3 in 1",
      img: "/images/produk10.png",
      quantity: 1,
    },
    total: 27600,
    statusColor: "text-[#29C471]",
    statusBg: "bg-[#e7f6ed]",
    canBuyAgain: false,
    canCancel: true,
  },
];

const statusList = [
  { label: "Semua", value: "all" },
  { label: "Berlangsung", value: "Berlangsung" },
  { label: "Berhasil", value: "Berhasil" },
  { label: "Tidak Berhasil", value: "Tidak Berhasil" },
];

function ReceiptPage() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filteredReceipts = dummyReceipts.filter((r) => {
    const matchSearch =
      search === "" ||
      r.product.name.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchDate = !date || r.date === date;
    const matchStatus =
      selectedStatus === "all" || r.status === selectedStatus;
    return matchSearch && matchDate && matchStatus;
  });

  // Convert the current date string to yyyy-mm-dd if there is value for the date input
  const getDateInputValue = () => {
    if (!date) return "";
    // expect format: "04 Agustus 2023", want: 2023-08-04
    const month = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    };
    const [d, m, y] = date.split(" ");
    return `${y}-${month[m]}-${d.padStart(2, "0")}`;
  };

  // When picking a date, convert it into the displayed format style
  const handleDateChange = (e) => {
    const val = e.target.value; // yyyy-mm-dd
    if (!val) {
      setDate("");
      return;
    }
    const [y, m, d] = val.split("-");
    const monthName = [
      "", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
      "Agustus", "September", "Oktober", "November", "Desember"
    ][+m];
    setDate(`${d.padStart(2, "0")} ${monthName} ${y}`);
    setShowDatePicker(false);
  };

  return (
    <div className="min-h-screen bg-[#fff5f0] p-3 sm:p-6">
      <div className="bg-[#ffe5d2] rounded-xl shadow-md px-5 py-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center flex-1 w-full sm:w-auto">
          <div className="bg-white px-3 py-2 rounded-md flex items-center w-full">
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="mr-2 text-[#dbbdae]">
              <circle cx="9" cy="9" r="7" stroke="#dbbdae" strokeWidth="1.4" fill="none"/>
              <path d="M14.2 14.2l3.6 3.6" stroke="#dbbdae" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              className="bg-transparent outline-none border-none w-full text-sm"
              placeholder="Cari transaksi mu di sini"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center relative">
          <button
            type="button"
            className="bg-white px-3 py-2 rounded-md flex items-center text-sm font-semibold outline-none border-none"
            onClick={() => setShowDatePicker((v) => !v)}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 20 20" className="mr-2 text-[#dbbdae]">
              <rect x="3" y="4" width="14" height="12" rx="3" fill="none" stroke="#dbbdae" strokeWidth="1.4"/>
              <rect x="8" y="2" width="4" height="4" rx="1" fill="none" stroke="#dbbdae" strokeWidth="1.1"/>
            </svg>
            {date ? date : "Pilih tanggal transaksi"}
            {date && (
              <span
                className="ml-2 text-[#fc8726] font-bold cursor-pointer"
                role="button"
                title="Hapus tanggal"
                onClick={(e) => { e.stopPropagation(); setDate(""); }}
              >
                ×
              </span>
            )}
          </button>
          {showDatePicker && (
            <input
              type="date"
              value={getDateInputValue()}
              onChange={handleDateChange}
              className="absolute top-12 left-0 bg-white rounded-md shadow p-2 border text-[#8b572a]"
              style={{ zIndex: 30 }}
            />
          )}
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <div className="flex space-x-2 overflow-x-auto py-1">
            {statusList.map((s) => (
              <button
                key={s.value}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedStatus === s.value
                    ? "bg-[#fc8726] text-white"
                    : "bg-white text-[#8b572a]"
                } border border-[#dbbdae]`}
                onClick={() => setSelectedStatus(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow px-0 pb-4">
        <div className="flex flex-col gap-2 pt-4 pl-6 pr-6">
        {/* Tempat untuk list/daftar receipt, tambahkan kode render di luar selection ini */}
        {/* Sementara, render info jika tidak ada hasil */}
        {filteredReceipts.length === 0 && (
          <div className="text-center text-gray-400 py-10">Transaksi tidak ditemukan.</div>
        )}
        {/* Lanjut render di luar */}
        </div>
      </div>
    </div>
  );
}

export default ReceiptPage;

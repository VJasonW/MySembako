import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1917] flex flex-col selection:bg-pink-100 selection:text-pink-900">
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/icon/Logo_Mysembako.svg"
            alt="MySembako"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <a
            href="/buka-toko"
            className="hidden sm:inline-block px-4 py-2 rounded-xl text-stone-600 hover:text-pink-600 hover:bg-pink-50/80 transition-all duration-200"
          >
            Buka Toko Gratis
          </a>
          <a
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all duration-200"
          >
            Masuk
          </a>
        </div>
      </header>

      {/* Hero Section: Asymmetric Split */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-4 pb-16 md:pt-10 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Value Prop */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/70 border border-pink-200/80 text-pink-800 text-xs font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Layanan Belanja Sembako Terpercaya
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1] mb-6">
            Sembako Segar dari Warung Sekitar.
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-xl">
            Pesan beras, telur, minyak goreng, dan bumbu dapur langsung dari toko terdekat. Cepat, hemat, dan terpercaya.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
            <Link
              to="/home"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-base font-bold shadow-lg shadow-pink-600/20 hover:shadow-pink-600/30 active:scale-[0.98] transition-all duration-200 text-center"
            >
              Mulai Belanja
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <a
              href="/buka-toko"
              className="inline-flex items-center justify-center px-6 py-4 rounded-xl border border-stone-300 hover:border-pink-400 bg-white hover:bg-pink-50/50 text-stone-800 font-semibold text-base active:scale-[0.98] transition-all duration-200 text-center"
            >
              Daftarkan Tokomu
            </a>
          </div>

          <div className="pt-6 border-t border-stone-200/80 w-full flex items-center gap-6 text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Harga Sembako Transparan</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Langsung dari Toko Terdekat</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Asset */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xl shadow-stone-900/10 group">
            <img
              src="/img/sembako_hero_banner.jpg"
              alt="Bahan pangan dan sembako segar berkualitas di MySembako"
              className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Floating Quality Badge */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md border border-stone-200/70 p-4 rounded-2xl shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-stone-500 font-medium">Kualitas Terjamin</p>
                <p className="text-sm font-bold text-stone-900">Beras, Minyak, Telur &amp; Bumbu Segar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Features */}
      <section className="w-full bg-stone-100/70 border-y border-stone-200/70 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-3">
              Keunggulan Layanan
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Belanja Kebutuhan Dapur Jadi Praktis
            </h2>
            <p className="text-base text-stone-600 mt-3">
              Didesain khusus untuk memudahkan pembeli menemukan stok bahan pokok terdekat tanpa repot keluar rumah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Tile 1: Major Feature */}
            <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-3">
                  Pencarian Toko Berdasarkan Lokasi
                </h3>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                  Cari toko sembako dalam jangkauan terdekat dari lokasimu di Semarang, Jakarta, dan kota lainnya. Belanja lebih cepat dengan ongkos kirim yang lebih hemat.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Dukungan GPS &amp; Kota Terintegrasi</span>
                <span className="text-pink-600 font-semibold">Tersedia Sekarang</span>
              </div>
            </div>

            {/* Bento Tile 2: Categories */}
            <div className="md:col-span-5 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  Katalog Sembako Lengkap
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Beras kualitas premium, minyak kemasan, telur ras, gula pasir, hingga tepung dan bumbu dapur lengkap dengan stok yang selalu terupdate.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {["Beras", "Minyak", "Telur", "Gula", "Bumbu"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Tile 3: Partner Store Callout */}
            <div className="md:col-span-12 bg-gradient-to-r from-pink-600 to-pink-700 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-pink-600/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-wider font-bold text-pink-200">
                  Untuk Pemilik Usaha
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mt-1 mb-2">
                  Punya Toko Sembako? Buka Toko Online Gratis
                </h3>
                <p className="text-pink-100 text-sm md:text-base leading-relaxed">
                  Jangkau ribuan tetangga dan pelanggan sekitar tanpa biaya pendaftaran. Mulai kelola inventaris dan terima pesanan dengan mudah.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="/buka-toko"
                  className="px-6 py-3.5 rounded-xl bg-white text-pink-700 font-bold hover:bg-pink-50 active:scale-95 transition-all text-sm"
                >
                  Daftar Sekarang
                </a>
                <a
                  href="https://wa.me/6285229947441?text=Halo%20Admin%20MySembako,%20saya%20ingin%20mendaftarkan%20toko%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-pink-800/60 hover:bg-pink-800 text-white border border-pink-400/40 font-semibold active:scale-95 transition-all text-sm inline-flex items-center gap-2"
                >
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 border-t border-stone-200/80 mt-auto">
        <div className="flex items-center gap-2">
          <img src="/icon/Logo_Mysembako.svg" alt="MySembako" className="h-6 w-auto opacity-75" />
          <span>&copy; {new Date().getFullYear()} MySembako. Platform Belanja Sembako Terpercaya.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/home" className="hover:text-stone-900 transition-colors">Katalog Produk</Link>
          <a href="/buka-toko" className="hover:text-stone-900 transition-colors">Buka Toko</a>
          <a href="/login" className="hover:text-stone-900 transition-colors">Masuk Akun</a>
        </div>
      </footer>
    </div>
  );
};

export default Intro;

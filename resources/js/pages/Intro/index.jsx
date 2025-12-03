import React, { useEffect } from 'react';

const Intro = () => {
  useEffect(() => {
    // Inject Google Fonts - Poppins
    const id = "google-font-poppins";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden align-middle font-poppins">
      {/* Background Image - Full Screen */}
      

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-white/80 rounded-b-lg backdrop-blur-sm shadow font-poppins ">
        {/* Logo */}
        <img 
          src="/icon/Logo_Mysembako.svg" 
          alt="Mysembako Logo" 
          className="h-10 w-auto"
        />

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a 
            href="/"
            className="text-[#FE5A19] text-sm font-medium hover:text-white hover:border-[#FE5A19] transition-colors border-b-1 border-white font-poppins"
          >
            Home
          </a>
          <a 
            href="/login" 
            className="bg-[#FE5A19] text-white text-sm font-medium px-4 py-2 rounded hover:bg-orange-700 transition-colors font-poppins"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Main Content */}
      
      <div
        className="relative z-0 flex items-center justify-center min-h-[calc(100vh-80px)] px-8 font-poppins rounded-xl"
        style={{
          backgroundImage: "url('/img/bumper.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/55 rounded-xl z-10" aria-hidden="true"></div>
        {/* Overlay hanya di belakang content */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center text-center font-poppins relative z-20">
          <div className="relative z-20 p-8 md:p-12 w-full flex flex-col items-center">
            <div className="text-white uppercase text-sm tracking-wider mb-4 font-poppins">
              Hallo!
            </div>
            <div className="mb-4">
              <span className="text-[#FE5A19] text-5xl md:text-6xl font-bold font-poppins">
                MySembako
              </span>
            </div>
            <div className="text-white text-xl md:text-2xl font-normal mb-8 font-poppins">
              Hadir untuk mempermudah anda mencari bahan sembako terdekat, termudah, dan termurah.
            </div>
            {/* Buttons */}
            <div className="flex gap-4 justify-center font-poppins">
              <a 
                href="/login"
                className="bg-[#FE5A19] text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 hover:text-white transition-colors font-poppins inline-block"
              >
                  Cari Sembako
              </a>
            </div>
          </div>
        </div>
      </div>
    {/* Section: Layanan Unggulan */}
    <section className="w-full max-w-4xl mx-auto mt-12 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Temukan Toko */}
        <div className="bg-[#232426] rounded-lg p-6 flex flex-col items-start transition hover:shadow-lg hover:bg-orange-400/80 group">
          <div className="text-white font-semibold text-lg mb-2 group-hover:text-white">Temukan Toko Sembako</div>
          <div className="text-gray-200 text-sm mb-4 group-hover:text-white">
            Cari toko sembako terdekat dengan cepat. Dapatkan kemudahan akses informasi toko terbaik di sekitar Anda.
          </div>
          <a href="#temukan-toko" className="text-orange-400 font-semibold text-xs group-hover:text-white transition-colors">
            CARI TOKO &rarr;
          </a>
        </div>
        {/* Bandingkan Harga */}
        <div className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-lg p-6 flex flex-col items-start shadow-lg">
          <div className="text-white font-semibold text-lg mb-2">Bandingkan Harga Sembako</div>
          <div className="text-white text-sm mb-4">
            Temukan harga terbaik dari berbagai toko, dan hemat belanja kebutuhan pokok harian Anda.
          </div>
          <a href="#bandingkan-harga" className="text-white font-semibold text-xs underline underline-offset-4 hover:text-orange-50">
            BANDINGKAN &rarr;
          </a>
        </div>
        {/* Pesan Online */}
        <div className="bg-[#232426] rounded-lg p-6 flex flex-col items-start transition hover:shadow-lg hover:bg-orange-400/80 group">
          <div className="text-white font-semibold text-lg mb-2 group-hover:text-white">Pesan Sembako Online</div>
          <div className="text-gray-200 text-sm mb-4 group-hover:text-white">
            Pesan bahan pokok langsung dari aplikasi dan nikmati layanan antar ke rumah.
          </div>
          <a href="#pesan-online" className="text-orange-400 font-semibold text-xs group-hover:text-white transition-colors">
            PESAN SEKARANG &rarr;
          </a>
        </div>
      </div>
    </section>

    {/* Section: Statistik Perusahaan */}
    <section className="w-full max-w-4xl mx-auto mt-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pengalaman */}
        <div className="flex flex-col items-center justify-center md:items-start  px-5 py-3 bg-transparent border-2 border-grey rounded-lg">
          <span className="text-5xl md:text-6xl font-bold text-[#FE5A19] leading-snug">5+</span>
          <span className="uppercase text-grey font-semibold tracking-wide text-lg mt-1 mb-1">Tahun Beroperasi</span>
          <span className="text-gray-400 text-sm text-center md:text-left">Membantu ribuan keluarga mendapatkan sembako dengan mudah & terpercaya</span>
        </div>
        {/* Statistik Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#232426] rounded-lg p-5 flex flex-col items-center">
            <span className="text-2xl text-orange-400 font-extrabold">200+</span>
            <span className="text-gray-200 font-medium text-xs mt-2 text-center">Toko Sembako</span>
          </div>
          <div className="bg-[#232426] rounded-lg p-5 flex flex-col items-center">
            <span className="text-2xl text-orange-400 font-extrabold">15.000+</span>
            <span className="text-gray-200 font-medium text-xs mt-2 text-center">Pesanan Diproses</span>
          </div>
          <div className="bg-[#232426] rounded-lg p-5 flex flex-col items-center">
            <span className="text-2xl text-orange-400 font-extrabold">10.000+</span>
            <span className="text-gray-200 font-medium text-xs mt-2 text-center">Pengguna Aktif</span>
          </div>
          <div 
            className="bg-[#232426] rounded-lg p-5 flex flex-col items-center"
          >
            <span className="text-2xl text-orange-400 font-extrabold">4.9/5</span>
            <span className="text-gray-200 font-medium text-xs mt-2 text-center">Rating Pelanggan</span>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Intro;
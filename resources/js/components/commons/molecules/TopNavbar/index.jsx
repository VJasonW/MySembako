import React, { useCallback, useEffect, useState } from "react";

/**
 * TopNavbar component (diperbaiki):
 * Navbar sticky dengan logo, search bar, tombol filter & user, serta modal profil & modal filter terpisah.
 * 
 * Props:
 * - userName
 * - onShowProfile
 * - onShowFilter
 * - searchQuery
 * - onSearchChange
 */
const TopNavbar = ({
  userName: userNameProp = "Pengguna",
  onShowProfile = () => {},
  onShowFilter = () => {},
  searchQuery = "",
  onSearchChange = () => {},
}) => {
  // Pressed states
  const [filterPressed, setFilterPressed] = useState(false);
  const [userPressed, setUserPressed] = useState(false);

  // Modal states
  const [showProfile, setShowProfile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Local userName
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || userNameProp);

  // Responsive button size
  const [buttonSize, setButtonSize] = useState(
    typeof window !== "undefined" && window.innerWidth <= 480 ? 30 : 36
  );
  useEffect(() => {
    const onResize = () =>
      setButtonSize(window.innerWidth <= 480 ? 30 : 36);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sinkronisasi userName jika props berubah dan localStorage kosong
  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      setUserName(userNameProp);
    }
  }, [userNameProp]);

  // Tampilkan profil modal
  const handleUserButtonClick = useCallback(() => {
    setShowProfile(true);
    onShowProfile();
  }, [onShowProfile]);

  // Tampilkan filter modal
  const handleFilterButtonClick = useCallback(() => {
    setShowFilter(true);
    onShowFilter();
  }, [onShowFilter]);

  // Simpan userName ke localStorage
  const handleSimpan = () => {
    localStorage.setItem("userName", userName);
    if (localStorage.getItem("loggedInUsername")) {
      localStorage.setItem("loggedInUsername", userName);
    }
    setShowProfile(false);
  };

  // Reset userName
  const handleReset = () => {
    localStorage.removeItem("userName");
    setUserName("Pengguna");
    setShowProfile(false);
  };

  // Modal close
  const handleCloseProfile = useCallback(() => {
    setShowProfile(false);
  }, []);

  // Modal filter close
  const handleCloseFilter = useCallback(() => {
    setShowFilter(false);
  }, []);

  return (
    <header
      className="
        sticky top-0 w-full flex items-center
        bg-white border-b border-[#f3f3f3]
        px-4 py-2 z-[1000]
        md:px-4 md:py-[10px]
      "
      style={{
        WebkitBackdropFilter: "none",
        backdropFilter: "none",
      }}
    >
      {/* Navbar main wrapper: flex, items-center, justify-between for proper alignment */}
      <div className="flex w-full items-center justify-between">
        {/* Logo Area: Stick left */}
        <div className="flex items-center flex-shrink-0">
          <img
            src="/icon/Logo_Mysembako.svg"
            alt="MySembako Logo"
            className="
              h-9 w-[180px] md:w-[180px] md:h-9 object-contain
              sm:h-8 sm:w-[136px]
            "
          />
        </div>

        {/* Search Bar: Center, grow to fill max allowed */}
        <div className="flex-1 flex justify-center px-4">
          <div
            className="
              flex items-center bg-white
              border border-[#FC6900]
              rounded-full gap-2
              min-w-[90px] max-w-[480px] py-2 px-4 w-full
              md:max-w-[480px] md:min-w-[72px] md:py-1 md:px-2
              sm:max-w-[120px] sm:text-xs
            "
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                fill="#FC6900"
              />
            </svg>
            <input
              className="
                bg-transparent border-none outline-none flex-1 text-[14px] text-[#333]
                placeholder:text-[#999] placeholder:opacity-100
                focus:ring-0
              "
              type="text"
              defaultValue={searchQuery}
              placeholder="Cari"
              onInput={onSearchChange}
            />
          </div>
        </div>

        {/* Action Buttons: Stick right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Filter Button */}
          <button
            className="
              transition-all duration-200
              flex items-center justify-center
              rounded-full border-none active:scale-95
            "
            style={{
              background: filterPressed ? "#FFD4A3" : "#FFE5D0",
              width: buttonSize,
              height: buttonSize,
            }}
            onMouseDown={() => setFilterPressed(true)}
            onMouseUp={() => setFilterPressed(false)}
            onMouseLeave={() => setFilterPressed(false)}
            onClick={handleFilterButtonClick}
            aria-label="Filter"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="8" cy="6" r="2" fill="#E65100" />
              <path d="M4 12H20" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="16" cy="12" r="2" fill="#E65100" />
              <path d="M4 18H20" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="8" cy="18" r="2" fill="#E65100" />
            </svg>
          </button>
          {/* User Button */}
          <button
            className={`
              transition-all duration-200 
              flex items-center justify-center
              rounded-full
              border-none
              active:scale-95
            `}
            style={{
              background: userPressed ? "#FFD4A3" : "#FFE5D0",
              width: buttonSize,
              height: buttonSize,
            }}
            onMouseDown={() => setUserPressed(true)}
            onMouseUp={() => setUserPressed(false)}
            onMouseLeave={() => setUserPressed(false)}
            onClick={handleUserButtonClick}
            aria-label="Profil Pengguna"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="#E65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="#E65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Modal/Overlay */}
      {showProfile && (
        <div
          className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-5"
          onClick={handleCloseProfile}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-[400px] w-full shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[#E65100] m-0 text-xl font-bold">Profil Saya</h2>
              <button
                onClick={handleCloseProfile}
                className="bg-transparent border-none text-2xl cursor-pointer text-[#999] p-0 w-[30px] h-[30px] flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-[100px] h-[100px] rounded-full bg-[#FFE5D0] flex items-center justify-center mx-auto mb-4">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="#E65100"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="#E65100"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="text-[#333] m-0 mb-2 text-lg font-semibold">{userName}</h3>
              <p className="text-[#999] m-0 text-sm">Anggota MySembako</p>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[#333] text-sm font-medium">
                Nama
              </label>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full p-3 border border-[#ddd] rounded-lg text-sm outline-none"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSimpan}
                className="w-full p-3 bg-[#E65100] text-white border-none rounded-lg text-base font-bold cursor-pointer"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={handleReset}
                className="w-full p-3 bg-transparent text-[#E65100] border border-[#E65100] rounded-lg text-base font-bold cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal/Overlay */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-5"
          onClick={handleCloseFilter}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-[400px] w-full shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[#E65100] m-0 text-xl font-bold">Filter & Sort</h2>
              <button
                onClick={handleCloseFilter}
                className="bg-transparent border-none text-2xl cursor-pointer text-[#999] p-0 w-[30px] h-[30px] flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            <div className="mb-5">
              <label className="block mb-2 text-[#333] text-sm font-medium">
                Urutkan Berdasarkan
              </label>
              <select
                className="w-full p-3 border border-[#ddd] rounded-lg text-sm outline-none"
              >
                <option>Harga Terendah</option>
                <option>Harga Tertinggi</option>
                <option>Nama A-Z</option>
                <option>Nama Z-A</option>
                <option>Terbaru</option>
              </select>
            </div>
            
            <div className="mb-5">
              <label className="block mb-2 text-[#333] text-sm font-medium">
                Filter Toko
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  <span>Semua Toko</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  <span>Toko SumberM</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  <span>Toko T11</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  <span>Toko Maju M</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCloseFilter}
                className="flex-1 p-3 bg-[#E65100] text-white border-none rounded-lg text-base font-bold cursor-pointer"
              >
                Terapkan
              </button>
              <button
                onClick={handleCloseFilter}
                className="flex-1 p-3 bg-transparent text-[#E65100] border border-[#E65100] rounded-lg text-base font-bold cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavbar;

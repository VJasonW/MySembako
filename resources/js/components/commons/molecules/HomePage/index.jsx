import React from "react";


console.log('HomePage component loaded');

const products = [
  {
    name: "Roma Sili Pulan Siga",
    price: "Rp 88.900",
    store: "Toko SumberM",
    img: "/images/produk1.png",
  },
  {
    name: "Kobo Boncabe c... ",
    price: "Rp 13.000",
    store: "Toko SumberM",
    img: "/images/produk2.png",
  },
  {
    name: "Bango Kecap mani...",
    price: "Rp 22.200",
    store: "Toko T11",
    img: "/images/produk3.png",
  },
  {
    name: "Sanio Minyak Gor...",
    price: "Rp 22.800",
    store: "Toko T11",
    img: "/images/produk4.png",
  },
  {
    name: "Bimoli Minyak Que...",
    price: "Rp 19.900",
    store: "Toko T11",
    img: "/images/produk5.png",
  },
  {
    name: "Torabika Kaku Rasa...",
    price: "Rp 13.400",
    store: "Toko SumberM",
    img: "/images/produk6.png",
  },
  {
    name: "Deterjen Daia 1900G",
    price: "Rp 33.300",
    store: "Toko Maju M",
    img: "/images/produk7.png",
  },
  {
    name: "Sabun Mandi Kahfi",
    price: "Rp 20.000",
    store: "Toko Maju M",
    img: "/images/produk8.png",
  },
  {
    name: "Sabun Mandi Biore",
    price: "Rp 31.200",
    store: "Toko Maju M",
    img: "/images/produk9.png",
  },
  {
    name: "Sikat Gigi Colgate",
    price: "Rp 13.800",
    store: "Toko T12",
    img: "/images/produk10.png",
  },
  {
    name: "Pasta Gigi Pepsode...",
    price: "Rp 12.900",
    store: "Toko T12",
    img: "/images/produk11.png",
  },
  {
    name: "Gillette Blue Plus",
    price: "Rp 13.400",
    store: "Toko MAKOTA OFFICIAL",
    img: "/images/produk12.png",
  },
];

function HomePage() {
  console.log('HomePage rendering...');
  const [activeTab, setActiveTab] = React.useState('home');
  const [filterPressed, setFilterPressed] = React.useState(false);
  const [userPressed, setUserPressed] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showProfile, setShowProfile] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [userName, setUserName] = React.useState(() => {
    // Get username from localStorage (set saat login)
    // Prioritas: loggedInUsername > username > userName > default
    // Saat login, simpan username dengan: localStorage.setItem('loggedInUsername', 'toto')
    const loggedInUser = localStorage.getItem('loggedInUsername') || 
                         localStorage.getItem('username') || 
                         localStorage.getItem('userName');
    
    if (loggedInUser) {
      // Jika ada username dari login, simpan juga ke userName untuk konsistensi
      if (!localStorage.getItem('userName')) {
        localStorage.setItem('userName', loggedInUser);
      }
      return loggedInUser;
    }
    
    return 'Pengguna';
  });
  
  // Update username saat component mount jika ada perubahan di localStorage
  React.useEffect(() => {
    const handleStorageChange = () => {
      const loggedInUser = localStorage.getItem('loggedInUsername') || 
                           localStorage.getItem('username');
      if (loggedInUser && loggedInUser !== userName) {
        setUserName(loggedInUser);
        localStorage.setItem('userName', loggedInUser);
      }
    };
    
    // Check on mount
    handleStorageChange();
    
    // Listen for storage events (if username is set from another tab/window)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userName]);
  
  // Filter products based on search query
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    const query = searchQuery.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.store.toLowerCase().includes(query) ||
      product.price.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  return (
    <>
      <style>
        {`
          .search-input::placeholder {
            color: #999;
            opacity: 1;
          }
          
          .bottom-nav {
            transition: all 0.3s ease;
          }
          
          .nav-button {
            transition: all 0.3s ease;
          }
          
          .nav-icon {
            transition: all 0.3s ease;
          }
          
          @media (max-width: 768px) {
            .bottom-nav {
              width: 60% !important;
              left: 20% !important;
              gap: 30px !important;
              padding: 14px 0 10px 0 !important;
            }
            .nav-icon {
              width: 24px !important;
              height: 24px !important;
            }
            .nav-button {
              padding: 3px 6px !important;
            }
          }
          
          @media (max-width: 480px) {
            .bottom-nav {
              width: 80% !important;
              left: 10% !important;
              gap: 20px !important;
              padding: 12px 0 8px 0 !important;
            }
            .nav-icon {
              width: 22px !important;
              height: 22px !important;
            }
            .nav-button {
              padding: 2px 4px !important;
            }
          }
          
          @media (max-width: 360px) {
            .bottom-nav {
              width: 90% !important;
              left: 5% !important;
              gap: 15px !important;
              padding: 10px 0 8px 0 !important;
            }
            .nav-icon {
              width: 20px !important;
              height: 20px !important;
            }
            .nav-button {
              padding: 2px 3px !important;
            }
          }
        `}
      </style>
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        border: "6px solid #333",
        borderRadius: 10,
        boxSizing: "border-box",
        overflow: "hidden",
          display: "flex",
          flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px 20px",
          background: "#fff",
          borderBottom: "1px solid #f3f3f3",
          gap: 12,
        }}
      >
        {/* Logo and Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img
            src="/icon/Logo_Mysembako.svg"
          alt="MySembako Logo"
            style={{ height: 28, width: 28 }}
        />
        <span
          style={{
            color: "#FC6900",
              fontSize: 20,
            fontWeight: 700,
          }}
        >
          MySembako
        </span>
        
        {/* Spacer */}
        <div style={{ flex: 1 }}></div>
        
        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            border: "1px solid #FC6900",
            borderRadius: 20,
            padding: "8px 16px",
            gap: 8,
            width: "480px",
            maxWidth: "80%",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="#FC6900"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              flex: 1,
              fontSize: 14,
              color: "#333",
            }}
          />
        </div>
        
        {/* Right Icons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onMouseDown={() => setFilterPressed(true)}
            onMouseUp={() => setFilterPressed(false)}
            onMouseLeave={() => setFilterPressed(false)}
            onClick={() => {
              setShowFilter(true);
            }}
            style={{
              background: filterPressed ? "#FFD4A3" : "#FFE5D0",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transform: filterPressed ? "scale(0.95)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="8" cy="6" r="2" fill="#E65100"/>
              <path d="M4 12H20" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="16" cy="12" r="2" fill="#E65100"/>
              <path d="M4 18H20" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="8" cy="18" r="2" fill="#E65100"/>
            </svg>
          </button>
          <button
            onMouseDown={() => setUserPressed(true)}
            onMouseUp={() => setUserPressed(false)}
            onMouseLeave={() => setUserPressed(false)}
            onClick={() => {
              setShowProfile(true);
            }}
            style={{
              background: userPressed ? "#FFD4A3" : "#FFE5D0",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transform: userPressed ? "scale(0.95)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
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
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowProfile(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ color: "#E65100", margin: 0 }}>Profil Saya</h2>
              <button
                onClick={() => setShowProfile(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999",
                  padding: "0",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "#FFE5D0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
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
              <h3 style={{ color: "#333", margin: "0 0 8px 0", fontSize: "20px" }}>{userName}</h3>
              <p style={{ color: "#999", margin: 0, fontSize: "14px" }}>Anggota MySembako</p>
            </div>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#333", fontSize: "14px", fontWeight: "500" }}>
                Nama
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  // Simpan ke localStorage dengan key yang sesuai
                  localStorage.setItem('userName', e.target.value);
                  // Jika ada loggedInUsername, update juga
                  if (localStorage.getItem('loggedInUsername')) {
                    localStorage.setItem('loggedInUsername', e.target.value);
                  }
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
                placeholder="Masukkan nama Anda"
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={() => {
                  localStorage.setItem('userName', userName);
                  setShowProfile(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#E65100",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('userName');
                  setUserName('Pengguna');
                  setShowProfile(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "transparent",
                  color: "#E65100",
                  border: "1px solid #E65100",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
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
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowFilter(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ color: "#E65100", margin: 0 }}>Filter & Sort</h2>
              <button
                onClick={() => setShowFilter(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999",
                  padding: "0",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#333", fontSize: "14px", fontWeight: "500" }}>
                Urutkan Berdasarkan
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                }}
              >
                <option>Harga Terendah</option>
                <option>Harga Tertinggi</option>
                <option>Nama A-Z</option>
                <option>Nama Z-A</option>
                <option>Terbaru</option>
              </select>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", color: "#333", fontSize: "14px", fontWeight: "500" }}>
                Filter Toko
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <span>Semua Toko</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <span>Toko SumberM</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <span>Toko T11</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <span>Toko Maju M</span>
                </label>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowFilter(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#E65100",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Terapkan
              </button>
              <button
                onClick={() => setShowFilter(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "transparent",
                  color: "#E65100",
                  border: "1px solid #E65100",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
        {activeTab === 'home' && (
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#E65100", marginBottom: "20px" }}>
              {searchQuery ? `Hasil Pencarian "${searchQuery}"` : "Produk Terbaru"}
            </h2>
            {filteredProducts.length === 0 && searchQuery ? (
              <div style={{ 
                textAlign: "center", 
                padding: "40px 20px",
                color: "#999"
              }}>
                <p style={{ fontSize: "16px", marginBottom: "8px" }}>Tidak ada produk ditemukan</p>
                <p style={{ fontSize: "14px" }}>Coba cari dengan kata kunci lain</p>
              </div>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", 
                gap: "16px" 
              }}>
                {filteredProducts.map((product, index) => (
                <div key={index} style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <img 
                    src={product.img} 
                    alt={product.name}
                    style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <p style={{ fontSize: "12px", margin: "8px 0", color: "#333" }}>{product.name}</p>
                  <p style={{ fontSize: "14px", fontWeight: "bold", color: "#E65100", margin: "4px 0" }}>
                    {product.price}
                  </p>
                  <p style={{ fontSize: "10px", color: "#999" }}>{product.store}</p>
                </div>
              ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'belanja' && (
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#E65100", marginBottom: "20px" }}>Keranjang Belanja</h2>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "16px" 
            }}>
              <div style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <input type="checkbox" />
                <img 
                  src="/images/produk2.png" 
                  alt="Product"
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "14px", margin: "0 0 4px 0", color: "#333" }}>
                    Kobe BonCabe Original
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: "bold", color: "#E65100", margin: "4px 0" }}>
                    Rp 13.000
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button style={{ 
                    width: "24px", 
                    height: "24px", 
                    border: "1px solid #E65100", 
                    borderRadius: "4px",
                    background: "transparent",
                    cursor: "pointer"
                  }}>-</button>
                  <span style={{ fontSize: "14px" }}>1</span>
                  <button style={{ 
                    width: "24px", 
                    height: "24px", 
                    border: "1px solid #E65100", 
                    borderRadius: "4px",
                    background: "transparent",
                    cursor: "pointer"
                  }}>+</button>
                </div>
              </div>
            </div>
            <div style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "16px",
              marginTop: "20px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Total</span>
                <span style={{ fontSize: "18px", fontWeight: "bold", color: "#E65100" }}>Rp 13.000</span>
              </div>
              <button style={{
                width: "100%",
                padding: "12px",
                background: "#E65100",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                Beli (1)
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'pesanan' && (
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#E65100", marginBottom: "20px" }}>Pesanan Saya</h2>
            <div style={{ marginBottom: "16px" }}>
              <input 
                type="text" 
                placeholder="Cari transaksi mu di sini"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "16px" 
            }}>
              <div style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#999" }}>Status: Menunggu</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img 
                    src="/images/produk2.png" 
                    alt="Product"
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", margin: "0 0 4px 0", color: "#333" }}>
                      Kobe BonCabe Original
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "bold", color: "#E65100", margin: "4px 0" }}>
                      Total Belanja Rp 13.000
                    </p>
                  </div>
                </div>
                <button style={{
                  marginTop: "12px",
                  padding: "8px 16px",
                  background: "#E65100",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer"
                }}>
                  Beli lagi
                </button>
              </div>
              
              <div style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#999" }}>Status: Selesai</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img 
                    src="/images/produk10.png" 
                    alt="Product"
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", margin: "0 0 4px 0", color: "#333" }}>
                      Sikat Gigi Colgate
                    </p>
                    <p style={{ fontSize: "16px", fontWeight: "bold", color: "#E65100", margin: "4px 0" }}>
                      Total Belanja Rp 27.800
                    </p>
                  </div>
                </div>
                <button style={{
                  marginTop: "12px",
                  padding: "8px 16px",
                  background: "#E65100",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer"
                }}>
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'lokasi' && (
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#E65100", marginBottom: "20px" }}>Lokasi Saya</h2>
            <div style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 16px" }}>
                <path
                  d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                  stroke="#E65100"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="#E65100"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <p style={{ fontSize: "16px", color: "#333", marginBottom: "12px" }}>
                Alamat Pengiriman
              </p>
              <p style={{ fontSize: "14px", color: "#999", marginBottom: "20px" }}>
                Pilih lokasi pengiriman Anda
              </p>
              <button style={{
                padding: "12px 24px",
                background: "#E65100",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                Pilih Lokasi
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div
        className="bottom-nav"
        style={{
          position: "fixed",
          bottom: 20,
          left: "30%",
          width: "40%",
          zIndex: 999,
          background: "#FFE5D0",
          borderRadius: "50px 50px",
          padding: "16px 0 12px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Home Button */}
        <button
          className="nav-button"
          onClick={() => setActiveTab('home')}
          style={{
            background: activeTab === 'home' ? "rgba(230, 81, 0, 0.15)" : "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 12,
          }}
        >
          {activeTab === 'home' ? (
            <svg className="nav-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ width: "26px", height: "26px" }}>
              {/* Simple pixelated house icon - filled solid orange, same size as outline */}
              {/* Roof (triangle) - adjusted to match outline size */}
              <path
                d="M12 3L5 10L19 10L12 3Z"
                fill="#E65100"
              />
              {/* House body (rectangle) - adjusted to match outline size */}
              <rect
                x="6"
                y="10"
                width="12"
                height="10"
                fill="#E65100"
              />
              {/* Door (rectangle opening in center) */}
              <rect
                x="10"
                y="15"
                width="4"
                height="5"
                fill="#FFF5EB"
              />
            </svg>
          ) : (
            <svg className="nav-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ width: "26px", height: "26px" }}>
              <path
                d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                stroke="#E65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </button>
        
        {/* Shopping Cart Button */}
        <button
          className="nav-button"
          onClick={() => setActiveTab('belanja')}
          style={{
            background: activeTab === 'belanja' ? "rgba(230, 81, 0, 0.15)" : "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 12,
          }}
        >
          <svg className="nav-icon" width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.82843 19.5 10.5 20.1716 10.5 21C10.5 21.8284 9.82843 22.5 9 22.5C8.17157 22.5 7.5 21.8284 7.5 21C7.5 20.1716 8.17157 19.5 9 19.5Z"
              stroke="#E65100"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={activeTab === 'belanja' ? "#E65100" : "none"}
            />
          </svg>
        </button>
        
        {/* Orders Button */}
        <button
          className="nav-button"
          onClick={() => setActiveTab('pesanan')}
          style={{
            background: activeTab === 'pesanan' ? "rgba(230, 81, 0, 0.15)" : "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 12,
          }}
        >
          <svg className="nav-icon" width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 12H15M9 16H15"
              stroke="#E65100"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={activeTab === 'pesanan' ? "#E65100" : "none"}
            />
          </svg>
        </button>
        
        {/* Location Button */}
        <button
          className="nav-button"
          onClick={() => setActiveTab('lokasi')}
          style={{
            background: activeTab === 'lokasi' ? "rgba(230, 81, 0, 0.15)" : "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 12,
          }}
        >
          {activeTab === 'lokasi' ? (
            <svg className="nav-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ width: "26px", height: "26px" }}>
              {/* Solid orange location pin (teardrop shape) with white dot in center - same size as outline */}
              <path
                d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                fill="#E65100"
              />
              <circle
                cx="12"
                cy="10"
                r="3"
                fill="#FFF5EB"
              />
            </svg>
          ) : (
            <svg className="nav-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ width: "26px", height: "26px" }}>
              <path
                d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                stroke="#E65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="#E65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
    </>
  );
}

export default HomePage;

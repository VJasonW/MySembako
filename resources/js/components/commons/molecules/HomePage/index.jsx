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
        
        
        
        
        
        
      </div>
    </>
  );
}

export default HomePage;
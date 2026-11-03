import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../../context/CartContext";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  // Hide bottom navbar on checkout page to reduce clutter & distraction
  if (location.pathname.startsWith("/checkout")) {
    return null;
  }

  const getActiveTab = () => {
    if (location.pathname.startsWith("/cart")) return "cart";
    if (location.pathname.startsWith("/receipt") || location.pathname.startsWith("/orders")) return "receipt";
    if (location.pathname.startsWith("/location")) return "location";
    return "home";
  };

  const activeTab = getActiveTab();

  const navItems = [
    {
      id: "home",
      label: "Beranda",
      path: "/home",
      iconOn: "/icon/Homeon.svg",
      iconOff: "/icon/Homeoff.svg",
    },
    {
      id: "cart",
      label: "Keranjang",
      path: "/cart",
      iconOn: "/icon/Carton.svg",
      iconOff: "/icon/Cartoff.svg",
      badge: cartCount > 0 ? (cartCount > 99 ? "99+" : cartCount) : null,
    },
    {
      id: "receipt",
      label: "Pesanan",
      path: "/receipt",
      iconOn: "/icon/Receipton.svg",
      iconOff: "/icon/Receiptoff.svg",
    },
    {
      id: "location",
      label: "Lokasi",
      path: "/location",
      iconOn: "/icon/Locon.svg",
      iconOff: "/icon/Locoff.svg",
    },
  ];

  return (
    <nav
      aria-label="Navigasi Utama"
      className="fixed left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 z-40 w-auto max-w-[94vw] bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-full p-1.5 flex items-center gap-1 shadow-xl shadow-stone-900/10 transition-all duration-300"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(item.path)}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full transition-all duration-200 active:scale-95 focus-ring ${
              isActive
                ? "bg-pink-50 text-pink-600 font-bold"
                : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
            }`}
          >
            <div className="relative">
              <img
                src={isActive ? item.iconOn : item.iconOff}
                alt=""
                className="w-5 h-5 object-contain"
              />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-pink-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-xs ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </div>

            {isActive && (
              <span className="text-xs font-bold leading-none pr-0.5">
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavbar;

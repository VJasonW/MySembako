import React, { useState } from "react";

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div
      className="bottom-nav fixed left-1/2 -translate-x-1/2 bottom-4 w-[420px] max-w-[94vw] z-[999] bg-orange-100 rounded-full pt-[14px] pb-[14px] flex justify-center items-center gap-9 shadow-[0_-2px_10px_0_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Home Button */}
      <button
        className={`nav-button flex items-center justify-center cursor-pointer px-3 py-2 rounded-xl transition-all duration-300 ${activeTab === 'home' ? "bg-orange-100/60" : "bg-transparent"}`}
        onClick={() => setActiveTab('home')}
      >
        {activeTab === 'home' ? (
          <svg className="nav-icon w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L5 10L19 10L12 3Z" fill="#E65100" />
            <rect x="6" y="10" width="12" height="10" fill="#E65100" />
            <rect x="10" y="15" width="4" height="5" fill="#FFF5EB" />
          </svg>
        ) : (
          <svg className="nav-icon w-6 h-6" viewBox="0 0 24 24" fill="none">
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
        className={`nav-button flex items-center justify-center cursor-pointer px-3 py-2 rounded-xl transition-all duration-300 ${activeTab === 'belanja' ? "bg-orange-100/60" : "bg-transparent"}`}
        onClick={() => setActiveTab('belanja')}
      >
        <svg className="nav-icon w-6 h-6" viewBox="0 0 24 24" fill="none">
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
        className={`nav-button flex items-center justify-center cursor-pointer px-3 py-2 rounded-xl transition-all duration-300 ${activeTab === 'pesanan' ? "bg-orange-100/60" : "bg-transparent"}`}
        onClick={() => setActiveTab('pesanan')}
      >
        <svg className="nav-icon w-6 h-6" viewBox="0 0 24 24" fill="none">
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
        className={`nav-button flex items-center justify-center cursor-pointer px-3 py-2 rounded-xl transition-all duration-300 ${activeTab === 'lokasi' ? "bg-orange-100/60" : "bg-transparent"}`}
        onClick={() => setActiveTab('lokasi')}
      >
        {activeTab === 'lokasi' ? (
          <svg className="nav-icon w-6 h-6" viewBox="0 0 24 24" fill="none">
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
          <svg className="nav-icon w-6 h-6" viewBox="0 0 24 24" fill="none">
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
  );
};

export default BottomNavbar;

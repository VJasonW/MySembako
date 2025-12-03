import React from 'react';

const brandStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 32,
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 6,
  },
  text: {
    fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
    fontSize: 16,
    fontWeight: 700,
    color: '#ef6b49',
    letterSpacing: 0.1,
  },
};

const Searchbar = ({ placeholder = 'Cari', value = '', onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 0 16px 24px',
        background: 'transparent',
        gap: 24,
      }}
    >
      {/* Logo & Brand */}
      <div style={brandStyles.container}>
        <img
          src="/icon/Logo_Mysembako.svg"
          alt="Logo MySembako"
          style={brandStyles.logo}
        />
        <span style={brandStyles.text}>MySembako</span>
      </div>

      {/* Search Input Group */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          maxWidth: 520,
          background: '#fff',
          border: '1.5px solid #ef6b49',
          borderRadius: 22,
          padding: '0 16px',
          height: 40,
          marginRight: 18,
          boxSizing: 'border-box',
          boxShadow: '0 6px 22px rgba(239, 107, 73, 0.18)',
        }}
      >
        <img
          src="/icon/Search.svg"
          alt="Cari"
          style={{ width: 18, height: 18, marginRight: 8, opacity: 0.85 }}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
            fontSize: 14,
            color: '#ef6b49',
            flex: 1,
            padding: 0,
          }}
        />
      </div>

      {/* Right Icons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          type="button"
          style={{
            background: '#ffe3da',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffd4c1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffe3da';
          }}
        >
          <img src="/icon/Seting.svg" alt="Setting" style={{ width: 20, height: 20 }} />
        </button>

        <button
          type="button"
          style={{
            background: '#ffe3da',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffd4c1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffe3da';
          }}
        >
          <img src="/icon/User.svg" alt="User" style={{ width: 20, height: 20 }} />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;

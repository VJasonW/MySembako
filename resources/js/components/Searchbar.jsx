import React from 'react';

const Searchbar = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 0 16px 24px',
            background: 'transparent'
        }}>
            {/* Logo & Brand */}
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '32px' }}>
                <img 
                    src="/icon/Logo_Mysembako.svg"
                    alt="Logo MySembako"
                    style={{ width: 28, height: 28, marginRight: 6 }}
                />
                <span style={{
                    fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#ef6b49',
                    letterSpacing: 0.1,
                }}>MySembako</span>
            </div>
            {/* Search Input Group */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                maxWidth: 480,
                background: '#fff',
                border: '1.5px solid #ef6b49',
                borderRadius: 20,
                padding: '0 12px',
                height: 34,
                marginRight: 18,
                boxSizing: 'border-box',
            }}>
                {/* Search Icon */}
                <img 
                    src="/icon/search.svg"
                    alt="Cari"
                    style={{ width: 18, height: 18, marginRight: 6, opacity: 0.85 }}
                />
                <input 
                    type="text"
                    placeholder="Cari"
                    style={{
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
                        fontSize: 14,
                        color: '#ef6b49',
                        flex: 1,
                        padding: 0
                    }}
                />
            </div>
            {/* Right Icons */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
            }}>
                {/* Setting Icon */}
                <button style={{
                    background: '#ffe3da',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginRight: 4,
                    transition: 'background 0.2s'
                }}>
                    <img 
                        src="/icon/Seting.svg"
                        alt="Setting"
                        style={{ width: 20, height: 20 }}
                    />
                </button>
                {/* User Icon */}
                <button style={{
                    background: '#ffe3da',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}>
                    <img 
                        src="/icon/User.svg"
                        alt="User"
                        style={{ width: 20, height: 20 }}
                    />
                </button>
            </div>
        </div>
    );
};

export default Searchbar;

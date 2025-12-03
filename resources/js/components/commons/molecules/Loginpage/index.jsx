import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/index');
      } else {
        const data = await response.json();
        if (data.errors) {
          setErrors(Object.values(data.errors).flat());
        } else {
          setErrors([data.message || 'Login failed']);
        }
      }
    } catch (error) {
      setErrors(['An error occurred. Please try again.']);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Poppins', Arial, Helvetica, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '22px 0 0 32px'
      }}>
        <img 
          src="/icon/Logo_Mysembako.svg" 
          alt="Logo" 
          style={{ width: 'auto', height: '36px' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px'
        }}>
          <h1 style={{
            marginBottom: '4px',
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700
          }}>
            Welcome to MySembako
          </h1>
          <div style={{
            fontSize: '17px',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#222',
            fontWeight: 400
          }}>
            New here? <a href="/register" style={{ color: '#343bc5', textDecoration: 'underline', fontWeight: 400 }}>Create an account</a>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              background: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb'
            }}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Success Message */}
          {new URLSearchParams(window.location.search).get('success') && (
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              background: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb'
            }}>
              {new URLSearchParams(window.location.search).get('success')}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#343434',
                marginLeft: '8px',
                marginBottom: '3px',
                display: 'block',
                letterSpacing: '0.02em'
              }}>
                Email
              </label>
              <div style={{
                background: '#fff',
                border: '1.5px solid #bababa',
                borderRadius: '20px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px'
              }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    flex: 1,
                    fontSize: '15px',
                    fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
                    color: '#252525',
                    padding: 0
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="password" style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#343434',
                marginLeft: '8px',
                marginBottom: '3px',
                display: 'block',
                letterSpacing: '0.02em'
              }}>
                Password
              </label>
              <div style={{
                background: '#fff',
                border: '1.5px solid #bababa',
                borderRadius: '20px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px 0 16px',
                position: 'relative'
              }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    flex: 1,
                    fontSize: '15px',
                    fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
                    color: '#252525',
                    padding: 0
                  }}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    fontSize: '14px',
                    color: '#999'
                  }}
                >
                  <img
                    src={showPassword ? '/icon/UnhideIcon.svg' : '/icon/HideIcon.svg'}
                    alt={showPassword ? 'Show Password' : 'Hide Password'}
                    style={{ width: '22px', height: '22px', verticalAlign: 'middle' }}
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '20px',
                background: '#ef6b49',
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
                border: 'none',
                marginTop: '10px',
                marginBottom: '16px',
                cursor: 'pointer',
                fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
                letterSpacing: '0.03em'
              }}
              onMouseOver={(e) => { e.target.style.background = '#e55a39'; }}
              onMouseOut={(e) => { e.target.style.background = '#ef6b49'; }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;








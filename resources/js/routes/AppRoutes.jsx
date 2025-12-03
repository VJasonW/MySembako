import React from 'react';
import HomePage from '../components/commons/molecules/HomePage';
import CartPage from '../components/commons/molecules/CartPage';

console.log('AppRoutes loaded');

const AppRoutes = [
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/bill',
    element: <React.Suspense fallback={<div>Loading...</div>}>
      {React.createElement(
        React.lazy(() => import('../components/commons/molecules/Receiptpage'))
      )}
    </React.Suspense>,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '*',
    element: <div style={{ padding: '20px', fontSize: '18px' }}>Route tidak ditemukan. Redirecting to HomePage...</div>,
  },
  // Tambahkan route lain di sini jika ada halaman tambahan, misal Register, Dashboard, dsb.
];

export default AppRoutes;

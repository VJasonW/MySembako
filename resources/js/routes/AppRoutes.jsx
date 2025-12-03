import React from 'react';
import HomePage from '../components/commons/molecules/HomePage';

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
    path: '*',
    element: <div style={{ padding: '20px', fontSize: '18px' }}>Route tidak ditemukan. Redirecting to HomePage...</div>,
  },
  // Tambahkan route lain di sini jika ada halaman tambahan, misal Register, Dashboard, dsb.
];

export default AppRoutes;

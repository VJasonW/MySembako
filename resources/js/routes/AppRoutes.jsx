import React from 'react';
import HomePage from '../components/commons/molecules/HomePage';
import Intro from '../pages/Intro';

console.log('AppRoutes loaded');

const AppRoutes = [
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/homepage',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <div style={{ padding: '20px', fontSize: '18px' }}>Route tidak ditemukan. Redirecting to HomePage...</div>,
  },
  // Tambahkan route lain di sini jika ada halaman tambahan, misal Register, Dashboard, dsb.
];

export default AppRoutes;

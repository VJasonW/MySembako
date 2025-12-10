import React from 'react';
import HomePage from '../pages/HomePage';
import Intro from '../pages/Intro';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ReceiptPage from '../pages/ReceiptPage';
import LocationPage from '../pages/LocationPage';


console.log('AppRoutes loaded');

const AppRoutes = [
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/home',
    element: <HomePage/>,
  },
  {
    path: '*',
    element: <div style={{ padding: '20px', fontSize: '18px' }}>Route tidak ditemukan. Redirecting to HomePage...</div>,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/receipt',
    element: <ReceiptPage />,
  },
  {
    path: '/location',
    element: <LocationPage />,
  },
  // Tambahkan route lain di sini jika ada halaman tambahan, misal Register, Dashboard, dsb.
];

export default AppRoutes;

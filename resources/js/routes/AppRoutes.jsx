import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Intro from '../pages/Intro';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ReceiptPage from '../pages/ReceiptPage';
import LocationPage from '../pages/LocationPage';

// Paksa redirect penuh ke halaman login server Laravel
const LoginRedirect = () => {
  useEffect(() => {
    window.location.href = '/login';
  }, []);
  return <div style={{ padding: '20px', fontSize: '18px' }}>Mengarahkan ke halaman login...</div>;
};

const AppRoutes = [
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/homepage',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/login',
    element: <LoginRedirect />,
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
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
];

export default AppRoutes;

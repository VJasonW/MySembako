import React from 'react';
import LoginPage from '../components/commons/molecules/Loginpage';
import HomePage from '../components/commons/molecules/HomePage';

const AppRoutes = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/index',
    element: <HomePage />,
  },
  {
    path: '*',
    element: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p>Route tidak ditemukan</p>
      </div>
    ),
  },
];

export default AppRoutes;

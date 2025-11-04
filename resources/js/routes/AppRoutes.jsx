import React from 'react';
import LoginPage from '../components/commons/molecules/Loginpage';

const AppRoutes = [
  {
    path: '/',
    element: <LoginPage />,
  },
  // Tambahkan route lain di sini jika ada halaman tambahan, misal Register, Dashboard, dsb.
];

export default AppRoutes;

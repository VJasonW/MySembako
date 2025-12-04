import React from 'react';
import HomePage from '../components/commons/molecules/HomePage';
import Intro from '../pages/Intro';
import TopNavbar from '../components/commons/molecules/TopNavbar';  
import BottomNavbar from '../components/commons/molecules/BottomNavbar';  
import Searchbar from '../components/commons/molecules/SearchBar/Searchbar.jsx';

console.log('AppRoutes loaded');

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
    path: '*',
    element: <div style={{ padding: '20px', fontSize: '18px' }}>Route tidak ditemukan. Redirecting to HomePage...</div>,
  },
  {
    path:'/Nav',
    element: <TopNavbar/>,
  },
  {
    path:'/Tombol',
    element:<BottomNavbar/>,
  },
  {
    path:'/top',
    element:<Searchbar/>,
  },
  // Tambahkan route lain di sini jika ada halaman tambahan, misal Register, Dashboard, dsb.
];

export default AppRoutes;

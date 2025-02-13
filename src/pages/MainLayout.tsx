import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Outlet, Routes, Route } from 'react-router-dom';
// import Filters from '../components/Filters';

const MainLayout: React.FC = () => {
  return (
    <div className="MainLayout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

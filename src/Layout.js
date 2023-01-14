import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;

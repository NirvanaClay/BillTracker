import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider, Switch, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './Components/Navbar'
import Register from './Components/Register';
import Login from './Components/Login';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import About from './pages/About';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = ''; 
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link className="navbar-brand" to="/products">Products</Link>
        <Link className="navbar-brand" to="/add">Add</Link>
        <Link className="navbar-brand" to="/about">About</Link>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </nav>

      <Routes className="container mt-4">
        <Route className="container mt-4" path="/products" element={<Products />} />
        <Route className="container mt-4" path="/add" element={<AddProduct />} />
        <Route className="container mt-4" path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

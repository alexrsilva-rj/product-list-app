// src/App.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ProductPage from './components/pages/ProductPage';
import CategoryPage from './components/pages/CategoryPage';

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/products">Produtos</Link></li>
          <li><Link to="/categories">Categorias</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;

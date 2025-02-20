
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import axios from 'axios';

const ProductForm = ({ product, categories, setEditingProduct }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [category, setCategory] = useState(product ? product.category : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      await axios.put(`http://localhost:5000/products/${product.id}`, { name, category, price });
    } else {
      await axios.post('http://localhost:5000/products', { name, category, price });
    }
    dispatch(fetchProducts());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required min="0" />
      <button type="submit">{product ? 'Edit' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;

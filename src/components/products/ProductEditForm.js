// src/components/products/ProductEditForm.js
import React, { useState } from 'react';
import { useDispatch,  } from 'react-redux';
import { updateProduct } from '../features/productSlice';

const ProductEditForm = ({ product, categories, onEditComplete }) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, name, category, price })).then(() => {
      onEditComplete();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do Produto"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        {categories.map(cat => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço"
        required
        min="0"
      />
      <button type="submit">Atualizar Produto</button>
    </form>
  );
};

export default ProductEditForm;

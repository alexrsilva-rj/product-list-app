
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

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
    if (setEditingProduct) {
      setEditingProduct(null);
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-field">
        <label htmlFor="name">Nome do Produto</label>
        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="p-field">
        <label htmlFor="category">Categoria</label>
        <Dropdown id="category" value={category} options={categories.map((cat) => ({ label: cat.name, value: cat.name }))} onChange={(e) => setCategory(e.value)} required />
      </div>
      <div className="p-field">
        <label htmlFor="price">Preço</label>
        <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} required mode="currency" currency="BRL" min={0} />
      </div>
      <Button type="submit" label={product ? 'Edit' : 'Add'} icon="pi pi-check" />
    </form>
  );
  /*

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do Produto" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" required min="0" />
      <button type="submit">{product ? 'Edit' : 'Add'} Product</button>
    </form>
  );
  */
};

export default ProductForm;

import React, { useState } from 'react';
import { useDispatch,  } from 'react-redux';
import { updateProduct } from '../features/productSlice';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

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
      <Button type="submit" label="Update" icon="pi pi-check" />
    </form>
  );
 
};

export default ProductEditForm;

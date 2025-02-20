// src/components/CategoryForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../features/productSlice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [messages, setMessages] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({ name }));
    setName('');
    setMessages([{ severity: 'success', summary: 'Success', detail: 'Categoria adicionada com sucesso' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;
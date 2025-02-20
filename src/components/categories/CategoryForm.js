// src/components/CategoryForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../features/productSlice';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({ name }));
    setName('');
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
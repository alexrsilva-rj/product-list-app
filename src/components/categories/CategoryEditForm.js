// src/components/categories/CategoryEditForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../features/productSlice';

const CategoryEditForm = ({ category }) => {
  const [name, setName] = useState(category.name);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ id: category.id, name }));
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
      <button type="submit">Update Category</button>
    </form>
  );
};

export default CategoryEditForm;

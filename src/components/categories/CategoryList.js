// src/components/CategoryList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../features/productSlice';
import CategoryEditForm from './CategoryEditForm';

const CategoryList = () => {
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          {editingCategoryId === category.id ? (
            <CategoryEditForm category={category} />
          ) : (
            <>
              <span>{category.name}</span>
              <button onClick={() => setEditingCategoryId(category.id)}>Edit</button>
              <button onClick={() => handleDelete(category.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CategoryList;

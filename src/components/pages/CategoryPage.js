// src/pages/CategoryPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../features/productSlice';
import CategoryForm from '../categories/CategoryForm';
import CategoryList from '../categories/CategoryList';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    const hasProducts = products.some(product => product.category === categoryId);
    if (!hasProducts) {
      dispatch(deleteCategory(categoryId));
    } else {
      alert('Não é possível excluir a categoria com produtos associados');
    }
  };

  return (
    <div>
      <h1>Categorias</h1>
      <CategoryForm />
      <CategoryList />
    </div>
  );
};

export default CategoryPage;

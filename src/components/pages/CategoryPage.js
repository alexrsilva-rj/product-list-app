import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories,  fetchProducts } from '../features/productSlice';
import CategoryForm from '../categories/CategoryForm';
import CategoryList from '../categories/CategoryList';

const CategoryPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

 
  return (
    <div>
      <h1>Categorias</h1>
      <CategoryForm />
      <CategoryList />
    </div>
  );
};

export default CategoryPage;

// src/pages/CategoryPage.js
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, fetchProducts } from '../features/productSlice';
import CategoryForm from '../categories/CategoryForm';
import CategoryList from '../categories/CategoryList';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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

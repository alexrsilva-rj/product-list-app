// src/components/CategoryList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../features/productSlice';
import CategoryEditForm from './CategoryEditForm';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CategoryList = () => {
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleDelete = (categoryName) => {
    const hasProducts = products.some(product => product.category === categoryName);
    if (!hasProducts) {
      dispatch(deleteCategory(categoryName));
    } else {
      alert('Não é possível excluir a categoria com produtos associados');
    }
  };
  
  const handleEditComplete = () => {
    setEditingCategoryId(null);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button label="Edit" onClick={() => setEditingCategoryId(rowData.id)} className="p-button-text" />
        <Button label="Delete" onClick={() => handleDelete(rowData.name)} className="p-button-text p-button-danger" />
      </div>
    );
  };

  return (
    <div>
      <DataTable value={categories} paginator rows={10}>
        <Column field="name" header="Nome da Categoria"></Column>
        <Column body={actionBodyTemplate} header="Ações"></Column>
      </DataTable>
      {error && <p>{error}</p>}
      {categories.map(category => (
        <div key={category.id}>
          {editingCategoryId === category.id ? (
            <CategoryEditForm category={category} onEditComplete={handleEditComplete} />
          ) : (
            <>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;

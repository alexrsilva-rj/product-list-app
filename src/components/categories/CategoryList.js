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

  

  return (
    <div>
   <DataTable value={categories} paginator rows={10} sortMode="multiple">
        <Column field="name" header="Nome da Categoria" sortable></Column>
        <Column body={(rowData) => (
                      <div>
                        <Button label="Editar" icon="pi pi-pencil" onClick={() => setEditingCategoryId(rowData.id)} />
                        <Button label="Apagar" icon="pi pi-trash" onClick={() => handleDelete(rowData.name)} className="p-button-danger" />
                      </div>
                    )}

        header="Ações"></Column>
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

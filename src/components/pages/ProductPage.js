import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, deleteProduct , } from '../features/productSlice';
import ProductForm from '../products/ProductForm';
import ProductEditForm from '../products/ProductEditForm';
import React, { useState, useEffect, useRef } from 'react';
import Filter from '../filter/Filter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.products.categories);
  const [editingProductId, setEditingProductId] = useState(null);
  const filter = useSelector((state) => state.products.filter);
  const [isFormVisible, setFormVisible] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)).then(() => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product deleted' });
    });
  };

  const handleEditComplete = () => {
    setEditingProductId(null);
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
  };

  
  const filteredProducts = (( filter === '') || (filter.label==='Todos')) ?  products : products.filter(product =>  product.category === filter) ;
  


  return (
    <div>
      <h1>Produtos</h1>
      <Button label="Adicionar Produto" icon="pi pi-plus" onClick={toggleForm} />
      {isFormVisible && <ProductForm categories={categories} />}
      <Filter />
      <DataTable value={filteredProducts} paginator rows={10} sortMode="multiple">
        <Column field="name" header="Nome" sortable></Column>
        <Column field="category" header="Categoria" sortable></Column>
        <Column field="price" header="Preço" sortable></Column>
        <Column
          body={(rowData) => (
            <div>
              <Button label="Editar" icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />
              <Button label="Apagar" icon="pi pi-trash" onClick={() => handleDelete(rowData.id)} className="p-button-danger" />
            </div>
          )}
          header="Ações"
        ></Column>
      </DataTable>
      {editingProductId && (
        <ProductEditForm
          product={products.find((p) => p.id === editingProductId)}
          categories={categories}
          onEditComplete={handleEditComplete}
        />
      )}
      <Toast ref={toast} />
    </div>
  );
 
};
export default ProductPage;
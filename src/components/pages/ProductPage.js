
// src/components/pages/ProductPage.js

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, deleteProduct , setFilter} from '../features/productSlice';
import ProductForm from '../products/ProductForm';
import ProductEditForm from '../products/ProductEditForm';
import React, { useState, useEffect } from 'react';
import Filter from '../filter/Filter'


const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.products.categories);
  const [editingProductId, setEditingProductId] = useState(null);
  const filter = useSelector((state) => state.products.filter);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditComplete = () => {
    setEditingProductId(null);
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
  };


  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  
  const filteredProducts = filter ? products.filter(product => product.category === filter) : products;

  return (
    <div>
      <h1>Produtos</h1>
      <ProductForm categories={categories} />
      <Filter handleFilterChange={handleFilterChange} />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProductId && (
        <ProductEditForm
          product={products.find(p => p.id === editingProductId)}
          categories={categories}
          onEditComplete={handleEditComplete}
        />
      )}
    </div>
  );
};

export default ProductPage;
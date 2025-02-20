import React from 'react';
import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const filter = useSelector((state) => state.products.filter);
  const filteredProducts = products.filter(product => product.category.includes(filter));
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div>
      {filteredProducts.map(product => (
        <div key={product.id}>
          {editingProduct && editingProduct.id === product.id ? (
            <ProductForm product={editingProduct} categories={categories} setEditingProduct={setEditingProduct} />
          ) : (
            <ProductItem product={product} setEditingProduct={setEditingProduct} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;

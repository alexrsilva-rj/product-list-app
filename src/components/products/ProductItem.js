import React from 'react';

const ProductItem = ({ product, setEditingProduct }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => setEditingProduct(product)}>Edit</button>
    </div>
  );
};

export default ProductItem;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/productSlice';

const Filter = () => {
  const categories = useSelector((state) => state.products.categories);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <select onChange={handleFilterChange}>
      <option value="">All</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>{category.name}</option>
      ))}
    </select>
  );
};

export default Filter;

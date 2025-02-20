import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/productSlice';
import { Dropdown } from 'primereact/dropdown';

const Filter = () => {
  const categories = useSelector((state) => state.products.categories);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.filter);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.value));
  };

  const categoryOptions = [{ label: 'Todos', value: '' }, ...categories.map((category) => ({ label: category.name, value: category.name }))];
  //const categoryOptions = categories.map(category => ({ label: category.name, value: category.name }));

  return (
    <Dropdown value={filter} options={categoryOptions} onChange={handleFilterChange} placeholder="Selecione uma Categoria" />
  );
/*
  return (
    <Dropdown 
      value={null}
      options={categoryOptions}
      onChange={handleFilterChange}
      placeholder="Selecione uma Categoria"
    />
  );

  */
};

export default Filter;

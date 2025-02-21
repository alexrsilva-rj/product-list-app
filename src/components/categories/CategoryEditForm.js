import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../features/productSlice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const CategoryEditForm = ({ category, onEditComplete }) => {
  const [name, setName] = useState(category.name);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ id: category.id, name })).then(() => {
      onEditComplete();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-field">
        <label htmlFor="name">Nome da Categoria</label>
        <InputText 
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
        />
      </div>
      <Button label="Atualizar Categoria" type="submit" className="p-mt-2" />
    </form>
  );
};

export default CategoryEditForm;

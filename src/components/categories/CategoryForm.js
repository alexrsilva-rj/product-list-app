import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../features/productSlice';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [ setMessages] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({ name }));
    setName('');
    setMessages([{ severity: 'success', summary: 'Success', detail: 'Categoria adicionada com sucesso' }]);
  };

  return (
    <form onSubmit={handleSubmit}>

       <InputText 
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da Categoria"
                required
              />
      
      <Button label='Adicionar Categoria'  icon="pi pi-plus"/> 
    </form>
  );
};

export default CategoryForm;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  categories: [],
  status: 'idle',
  error: null,
  filter: ''
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:5000/products');
  return response.data;
});

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://localhost:5000/categories');
  return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
  const response = await axios.post('http://localhost:5000/categories', category);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryName, { getState }) => {
  const state = getState();
  const hasProducts = state.products.products.some(product => product.category === categoryName);

  if (!hasProducts) {
    const categoryId = state.products.categories.find(category => category.name === categoryName).id;
    await axios.delete(`http://localhost:5000/categories/${categoryId}`);
    return categoryName;
  } else {
    throw new Error('Cannot delete category with associated products');
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, name }, { getState, dispatch }) => {
  const state = getState();
  const updatedCategory = { id, name };

  // Atualizar a categoria no db.json
  await axios.put(`http://localhost:5000/categories/${id}`, updatedCategory);

  // Atualizar a categoria nos produtos associados
  const productsToUpdate = state.products.products.filter(product => product.category === state.products.categories.find(cat => cat.id === id).name);
  for (const product of productsToUpdate) {
    await axios.put(`http://localhost:5000/products/${product.id}`, { ...product, category: name });
  }

  // Refetch products after update
  dispatch(fetchProducts());

  return updatedCategory;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
  const response = await axios.put(`http://localhost:5000/products/${updatedProduct.id}`, updatedProduct);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`http://localhost:5000/products/${productId}`);
  return productId;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index >= 0) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  }
});

export const { setFilter } = productSlice.actions;
export default productSlice.reducer;
